/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var UrlTrigger_exports = {};
__export(UrlTrigger_exports, {
  default: () => UrlTrigger
});
module.exports = __toCommonJS(UrlTrigger_exports);
var import_lodash = require("lodash");
var import_plugin_workflow = require("@nocobase/plugin-workflow");
var import_matchUrl = require("../common/matchUrl");
function getVariable(obj, keys = []) {
  if (typeof obj !== "object" || !Array.isArray(keys) || !keys.length) {
    return obj ?? {};
  }
  const result = keys.reduce((pre, { key }) => {
    return { ...pre, [key]: (0, import_lodash.get)(obj, key) };
  }, {});
  return { ...result, ...obj };
}
class UrlTrigger extends import_plugin_workflow.Trigger {
  static TYPE = "url";
  // Pre-compiled regex cache: workflowId → RegExp
  regexCache = /* @__PURE__ */ new Map();
  // Track whether the Koa middleware was registered in this process
  middlewareRegistered = false;
  constructor(workflow) {
    super(workflow);
    this.middlewareRegistered = true;
    const self = this;
    workflow.app.use(async function urlTriggerMiddleware(ctx, next) {
      var _a, _b;
      try {
        const matched = self.getMatchingWorkflows(ctx.path, ctx.method);
        if (!matched.length) {
          return next();
        }
        const syncWorkflows = [];
        const asyncWorkflows = [];
        for (const wf of matched) {
          if (self.workflow.isWorkflowSync(wf)) {
            syncWorkflows.push(wf);
          } else {
            asyncWorkflows.push(wf);
          }
        }
        for (const wf of syncWorkflows) {
          const context = self.buildContextForWorkflow(ctx, wf);
          const processor = await self.workflow.trigger(wf, context, {
            httpContext: ctx
          });
          if (!processor) {
            ctx.status = 500;
            ctx.body = { error: "Workflow trigger failed" };
            return;
          }
          const response = self.getSyncResponse(processor);
          if (response.passthrough) {
            continue;
          }
          if (response.headers) {
            ctx.set(response.headers);
          }
          if (response.type === "redirect" && response.url) {
            ctx.redirect(response.url);
            return;
          }
          ctx.status = response.status;
          const body = response.body ?? "";
          ctx.body = typeof body === "string" ? Buffer.from(body) : body;
          return;
        }
        await next();
        for (const wf of asyncWorkflows) {
          const context = self.buildContextForWorkflow(ctx, wf);
          self.workflow.trigger(wf, context);
        }
      } catch (err) {
        (_b = (_a = ctx.log) == null ? void 0 : _a.error) == null ? void 0 : _b.call(_a, "[workflow-url-trigger] middleware error:", err);
        return next();
      }
    });
  }
  on(workflow) {
    const { url: pattern, matchMode = "glob" } = workflow.config ?? {};
    if (pattern) {
      const regex = (0, import_matchUrl.compilePattern)(pattern, matchMode);
      if (regex) {
        this.regexCache.set(workflow.id, regex);
      }
    }
  }
  off(workflow) {
    this.regexCache.delete(workflow.id);
  }
  /**
   * Return all enabled URL trigger configs for client-side pre-matching.
   */
  getConfigs() {
    const configs = [];
    for (const wf of this.workflow.enabledCache.values()) {
      if (wf.type !== UrlTrigger.TYPE) {
        continue;
      }
      const { url, matchMode = "glob" } = wf.config ?? {};
      if (url) {
        configs.push({ url, matchMode, sync: this.workflow.isWorkflowSync(wf) });
      }
    }
    return configs;
  }
  /**
   * Extract HTTP response from a sync workflow execution result.
   * Checks if the last job is a url-response node (same pattern as webhook plugin).
   */
  getSyncResponse(processor) {
    if (!processor.lastSavedJob) {
      return { status: 200, passthrough: true };
    }
    const lastJobResult = processor.lastSavedJob.result;
    const node = processor.nodes.find((v) => processor.lastSavedJob.nodeId === v.id);
    if ((node == null ? void 0 : node.type) === "url-response") {
      return {
        type: lastJobResult.type,
        status: lastJobResult.statusCode ?? 200,
        body: lastJobResult.body ?? "",
        url: lastJobResult.url,
        headers: lastJobResult.headers ?? {}
      };
    }
    if (processor.execution.status !== import_plugin_workflow.EXECUTION_STATUS.RESOLVED) {
      return { status: 403, body: { error: "Access denied by workflow" } };
    }
    const output = processor.execution.output ?? lastJobResult;
    if (output) {
      if (typeof output === "string") {
        return { type: "redirect", status: 302, url: output };
      }
      if (typeof output === "object" && output.url) {
        return { type: "redirect", status: 302, url: output.url };
      }
      if (typeof output === "object" && output.status) {
        return { status: output.status, body: output.body ?? "" };
      }
    }
    return { status: 200, passthrough: true };
  }
  getMatchingWorkflows(path, method) {
    const results = [];
    for (const wf of this.workflow.enabledCache.values()) {
      if (wf.type !== UrlTrigger.TYPE) {
        continue;
      }
      const { url: pattern, matchMode = "glob", methods = [] } = wf.config ?? {};
      if (!pattern) {
        continue;
      }
      if (methods.length && !methods.includes(method.toUpperCase())) {
        continue;
      }
      let regex = this.regexCache.get(wf.id);
      if (!regex) {
        regex = (0, import_matchUrl.compilePattern)(pattern, matchMode);
        if (!regex) {
          continue;
        }
        this.regexCache.set(wf.id, regex);
      }
      if (regex.test(path)) {
        results.push(wf);
      }
    }
    return results;
  }
  buildContext(ctx) {
    const { currentUser, currentRole } = ctx.state ?? {};
    let user = null;
    if (currentUser) {
      try {
        user = typeof currentUser.toJSON === "function" ? currentUser.toJSON() : currentUser;
      } catch {
        user = currentUser;
      }
    }
    const { authorization, cookie, ...headers } = ctx.headers ?? {};
    return {
      url: ctx.path,
      query: ctx.query ?? {},
      method: ctx.method,
      headers,
      body: ctx.request.body ?? null,
      user,
      roleName: currentRole ?? null
    };
  }
  /**
   * Build context with user-defined variable mappings from workflow config.
   */
  buildContextForWorkflow(ctx, wf) {
    var _a, _b;
    const base = this.buildContext(ctx);
    const { request } = wf.config ?? {};
    if ((_a = request == null ? void 0 : request.query) == null ? void 0 : _a.length) {
      base.query = getVariable(base.query, request.query);
    }
    if ((_b = request == null ? void 0 : request.body) == null ? void 0 : _b.length) {
      base.body = getVariable(base.body, request.body);
    }
    return base;
  }
  async evaluateUrl(path, method, ctx) {
    const matched = this.getMatchingWorkflows(path, method);
    const syncWorkflows = matched.filter((wf) => this.workflow.isWorkflowSync(wf));
    const asyncWorkflows = matched.filter((wf) => !this.workflow.isWorkflowSync(wf));
    const triggerContext = this.buildContext(ctx);
    triggerContext.url = path;
    for (const wf of syncWorkflows) {
      const processor = await this.workflow.trigger(wf, triggerContext, { httpContext: ctx });
      if (!processor) {
        return { action: "block", status: 500, body: "Workflow trigger failed" };
      }
      const response = this.getSyncResponse(processor);
      if (response.passthrough) {
        continue;
      }
      if (response.type === "redirect" && response.url) {
        return { action: "redirect", url: response.url };
      }
      return { action: "block", status: response.status, body: response.body };
    }
    for (const wf of asyncWorkflows) {
      this.workflow.trigger(wf, triggerContext);
    }
    return { action: "passthrough" };
  }
  async execute(workflow, values, options) {
    return this.workflow.trigger(workflow, values, options);
  }
  validateContext(values) {
    if (!(values == null ? void 0 : values.url)) {
      return { url: "URL is required" };
    }
    return null;
  }
}
