/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var Plugin_exports = {};
__export(Plugin_exports, {
  default: () => Plugin_default
});
module.exports = __toCommonJS(Plugin_exports);
var import_server = require("@nocobase/server");
var import_plugin_workflow = __toESM(require("@nocobase/plugin-workflow"));
var import_UrlTrigger = __toESM(require("./UrlTrigger"));
var import_ResponseInstruction = __toESM(require("./ResponseInstruction"));
class Plugin_default extends import_server.Plugin {
  async load() {
    const workflowPlugin = this.app.pm.get(import_plugin_workflow.default);
    const urlTrigger = new import_UrlTrigger.default(workflowPlugin);
    workflowPlugin.registerTrigger("url", urlTrigger);
    workflowPlugin.registerInstruction("url-response", import_ResponseInstruction.default);
    this.app.resourceManager.define({
      name: "urlTrigger",
      actions: {
        // Returns all enabled URL trigger patterns for client-side pre-matching.
        // The client caches these and only calls `check` when a pattern matches.
        configs: {
          handler: async (ctx, next) => {
            ctx.body = urlTrigger.getConfigs();
            return next();
          }
        },
        // Executes matching sync workflows for a given path and returns the result.
        // Returns whether the Koa middleware is registered.
        // If false, the app needs a restart for URL triggers to work.
        status: {
          handler: async (ctx, next) => {
            ctx.body = { middlewareRegistered: urlTrigger.middlewareRegistered };
            return next();
          }
        },
        check: {
          handler: async (ctx, next) => {
            var _a;
            const { path } = ((_a = ctx.action.params) == null ? void 0 : _a.values) ?? {};
            if (!path || typeof path !== "string") {
              ctx.body = { action: "passthrough" };
              return next();
            }
            const result = await urlTrigger.evaluateUrl(path, "GET", ctx);
            ctx.body = result;
            return next();
          }
        }
      }
    });
    this.app.acl.allow("urlTrigger", "configs", "public");
    this.app.acl.allow("urlTrigger", "check", "loggedIn");
    this.app.acl.allow("urlTrigger", "status", "loggedIn");
  }
}
