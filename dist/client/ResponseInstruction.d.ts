/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
import { Instruction, WorkflowVariableInput, WorkflowVariableTextArea, WorkflowVariableJSON } from '@nocobase/plugin-workflow/client';
export default class extends Instruction {
    title: string;
    type: string;
    group: string;
    description: string;
    icon: React.JSX.Element;
    end: boolean;
    isAvailable({ engine, workflow }: {
        engine: any;
        workflow: any;
    }): any;
    fieldset: {
        type: {
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
            required: boolean;
            default: string;
        };
        url: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                changeOnSelect: boolean;
                autoSize: {
                    minRows: number;
                    maxRows: number;
                };
            };
            required: boolean;
            'x-reactions': {
                dependencies: string[];
                fulfill: {
                    state: {
                        visible: string;
                    };
                };
            }[];
        };
        status: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                useTypedConstant: (string | {
                    min: number;
                    max: number;
                })[][];
                nullable: boolean;
            };
            default: number;
            'x-reactions': {
                dependencies: string[];
                fulfill: {
                    state: {
                        visible: string;
                    };
                };
            }[];
        };
        body: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                changeOnSelect: boolean;
                autoSize: {
                    minRows: number;
                };
                placeholder: string;
            };
            'x-reactions': {
                dependencies: string[];
                fulfill: {
                    state: {
                        visible: string;
                    };
                };
            }[];
        };
        data: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                changeOnSelect: boolean;
                autoSize: {
                    minRows: number;
                };
                placeholder: string;
            };
            'x-reactions': {
                dependencies: string[];
                fulfill: {
                    state: {
                        visible: string;
                    };
                };
            }[];
        };
        headers: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            default: any[];
            items: {
                type: string;
                'x-component': string;
                properties: {
                    name: {
                        type: string;
                        'x-decorator': string;
                        'x-component': string;
                        'x-component-props': {
                            placeholder: string;
                        };
                        required: boolean;
                    };
                    value: {
                        type: string;
                        'x-decorator': string;
                        'x-component': string;
                        'x-component-props': {
                            placeholder: string;
                        };
                        required: boolean;
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
    components: {
        WorkflowVariableInput: typeof WorkflowVariableInput;
        WorkflowVariableTextArea: typeof WorkflowVariableTextArea;
        WorkflowVariableJSON: typeof WorkflowVariableJSON;
        Space: React.ForwardRefExoticComponent<import("antd").SpaceProps & React.RefAttributes<HTMLDivElement>> & {
            Compact: React.FC<import("antd/es/space/Compact").SpaceCompactProps>;
        };
    };
}
