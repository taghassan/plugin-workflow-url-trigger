/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Context } from '@nocobase/actions';
import WorkflowPlugin, { Trigger, WorkflowModel } from '@nocobase/plugin-workflow';
export default class UrlTrigger extends Trigger {
    static TYPE: string;
    private regexCache;
    middlewareRegistered: boolean;
    constructor(workflow: WorkflowPlugin);
    on(workflow: WorkflowModel): void;
    off(workflow: WorkflowModel): void;
    /**
     * Return all enabled URL trigger configs for client-side pre-matching.
     */
    getConfigs(): Array<{
        url: string;
        matchMode: string;
        sync: boolean;
    }>;
    /**
     * Extract HTTP response from a sync workflow execution result.
     * Checks if the last job is a url-response node (same pattern as webhook plugin).
     */
    private getSyncResponse;
    private getMatchingWorkflows;
    private buildContext;
    /**
     * Build context with user-defined variable mappings from workflow config.
     */
    private buildContextForWorkflow;
    evaluateUrl(path: string, method: string, ctx: Context): Promise<{
        action: string;
        url?: string;
        status?: number;
        body?: any;
    }>;
    execute(workflow: WorkflowModel, values: any, options: any): Promise<void | import("@nocobase/plugin-workflow").Processor>;
    validateContext(values: any): {
        url: string;
    };
}
