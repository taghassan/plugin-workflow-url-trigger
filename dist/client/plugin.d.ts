/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Plugin } from '@nocobase/client';
export declare class PluginWorkflowUrlTriggerClient extends Plugin {
    private unsubscribe;
    private configs;
    load(): Promise<void>;
    private fetchConfigs;
    private handleNavigation;
}
export default PluginWorkflowUrlTriggerClient;
