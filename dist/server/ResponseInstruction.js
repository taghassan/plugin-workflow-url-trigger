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
var ResponseInstruction_exports = {};
__export(ResponseInstruction_exports, {
  default: () => ResponseInstruction
});
module.exports = __toCommonJS(ResponseInstruction_exports);
var import_plugin_workflow = require("@nocobase/plugin-workflow");
class ResponseInstruction extends import_plugin_workflow.Instruction {
  async run(node, prevJob, processor) {
    let result;
    let status;
    try {
      const type = node.config.type ?? "redirect";
      const headers = processor.getParsedValue(node.config.headers ?? [], node.id);
      const responseResult = {
        type,
        headers: Array.isArray(headers) ? headers.reduce((pre, h) => ({ ...pre, [h.name]: h.value }), {}) : {}
      };
      if (type === "redirect") {
        responseResult.url = processor.getParsedValue(node.config.url, node.id);
        responseResult.statusCode = 302;
      } else if (type === "block") {
        responseResult.statusCode = processor.getParsedValue(node.config.status, node.id) ?? 403;
        responseResult.body = processor.getParsedValue(node.config.body, node.id) ?? "";
      } else if (type === "data") {
        responseResult.statusCode = 200;
        responseResult.body = processor.getParsedValue(node.config.data, node.id);
      }
      result = responseResult;
      status = import_plugin_workflow.JOB_STATUS.RESOLVED;
    } catch (error) {
      result = { error: error.message };
      status = import_plugin_workflow.JOB_STATUS.ERROR;
    }
    await processor.saveJob({
      status,
      result,
      nodeId: node.id,
      nodeKey: node.key,
      upstreamId: (prevJob == null ? void 0 : prevJob.id) ?? null
    });
    return processor.exit(import_plugin_workflow.JOB_STATUS.RESOLVED);
  }
}
