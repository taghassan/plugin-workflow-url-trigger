/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
import { Fieldset } from '@nocobase/client';
import { Trigger, useWorkflowAnyExecuted } from '@nocobase/plugin-workflow/client';
declare function MiddlewareStatusAlert(): React.JSX.Element;
declare function useVariables(config: any, options: any): any[];
export default class extends Trigger {
    title: string;
    description: string;
    fieldset: {
        statusAlert: {
            type: string;
            'x-component': string;
        };
        addVarHook: {
            type: string;
            'x-component': string;
        };
        url: {
            type: string;
            required: boolean;
            title: string;
            description: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                placeholder: string;
            };
            'x-disabled': string;
        };
        matchMode: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                optionType: string;
            };
            enum: {
                label: string;
                value: string;
            }[];
            default: string;
        };
        methods: {
            type: string;
            title: string;
            description: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                options: {
                    label: string;
                    value: string;
                }[];
            };
            default: any[];
        };
        request: {
            type: string;
            'x-decorator': string;
            'x-component': string;
            title: string;
            description: string;
            properties: {
                tabs: {
                    type: string;
                    'x-component': string;
                    properties: {
                        queryTab: {
                            type: string;
                            title: string;
                            'x-component': string;
                            properties: {
                                queryString: {
                                    type: string;
                                    title: string;
                                    'x-decorator': string;
                                    'x-decorator-props': {
                                        layout: string;
                                    };
                                    'x-component': string;
                                };
                                query: {
                                    type: string;
                                    'x-decorator': string;
                                    'x-decorator-props': {
                                        layout: string;
                                    };
                                    'x-component': string;
                                    default: any[];
                                    items: {
                                        type: string;
                                        'x-component': string;
                                        'x-component-props': {
                                            gap: string;
                                        };
                                        properties: {
                                            keyDiv: {
                                                type: string;
                                                'x-component': string;
                                                properties: {
                                                    key: {
                                                        type: string;
                                                        required: boolean;
                                                        'x-decorator': string;
                                                        'x-component': string;
                                                        'x-component-props': {
                                                            placeholder: string;
                                                        };
                                                    };
                                                };
                                            };
                                            aliasDiv: {
                                                type: string;
                                                'x-component': string;
                                                properties: {
                                                    alias: {
                                                        type: string;
                                                        'x-decorator': string;
                                                        'x-component': string;
                                                        'x-component-props': {
                                                            placeholder: string;
                                                        };
                                                    };
                                                };
                                            };
                                            remove: {
                                                type: string;
                                                'x-decorator': string;
                                                'x-component': string;
                                            };
                                        };
                                    };
                                    properties: {
                                        add: {
                                            type: string;
                                            title: string;
                                            'x-component': string;
                                        };
                                    };
                                };
                            };
                        };
                        bodyTab: {
                            type: string;
                            title: string;
                            'x-component': string;
                            properties: {
                                jsonForBody: {
                                    type: string;
                                    title: string;
                                    'x-decorator': string;
                                    'x-decorator-props': {
                                        layout: string;
                                    };
                                    'x-component': string;
                                };
                                body: {
                                    type: string;
                                    'x-decorator': string;
                                    'x-decorator-props': {
                                        layout: string;
                                    };
                                    'x-component': string;
                                    default: any[];
                                    items: {
                                        type: string;
                                        'x-component': string;
                                        'x-component-props': {
                                            gap: string;
                                        };
                                        properties: {
                                            keyDiv: {
                                                type: string;
                                                'x-component': string;
                                                properties: {
                                                    key: {
                                                        type: string;
                                                        required: boolean;
                                                        'x-decorator': string;
                                                        'x-component': string;
                                                        'x-component-props': {
                                                            placeholder: string;
                                                        };
                                                    };
                                                };
                                            };
                                            aliasDiv: {
                                                type: string;
                                                'x-component': string;
                                                properties: {
                                                    alias: {
                                                        type: string;
                                                        'x-decorator': string;
                                                        'x-component': string;
                                                        'x-component-props': {
                                                            placeholder: string;
                                                        };
                                                    };
                                                };
                                            };
                                            remove: {
                                                type: string;
                                                'x-decorator': string;
                                                'x-component': string;
                                            };
                                        };
                                    };
                                    properties: {
                                        add: {
                                            type: string;
                                            title: string;
                                            'x-component': string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
    triggerFieldset: {
        url: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            required: boolean;
        };
    };
    components: {
        Alert: React.ForwardRefExoticComponent<import("antd").AlertProps & React.RefAttributes<import("antd/es/alert/Alert").AlertRef>> & {
            ErrorBoundary: typeof import("antd/es/alert/ErrorBoundary").default;
        };
        Fieldset: typeof Fieldset;
        Flex: React.ForwardRefExoticComponent<import("antd").FlexProps<import("antd/es/_util/type").AnyObject> & React.RefAttributes<HTMLElement>>;
        AddVar: () => any;
        MiddlewareStatusAlert: typeof MiddlewareStatusAlert;
        ParsingQueryTextarea: ({ value, onChange }: {
            value: any;
            onChange: any;
        }) => React.JSX.Element;
        ParsingBodyJson: ({ value, onChange }: {
            value: any;
            onChange: any;
        }) => React.JSX.Element;
        Popconfirm: React.ForwardRefExoticComponent<import("antd").PopconfirmProps & React.RefAttributes<import("antd/es/tooltip").TooltipRef>> & {
            _InternalPanelDoNotUseOrYouWillBeFired: React.FC<import("antd/es/popconfirm/PurePanel").PurePanelProps>;
        };
    };
    scope: {
        useWorkflowAnyExecuted: typeof useWorkflowAnyExecuted;
    };
    useVariables: typeof useVariables;
    validate(config: any): boolean;
}
export {};
