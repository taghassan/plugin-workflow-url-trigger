/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Processor, Instruction, FlowNodeModel } from '@nocobase/plugin-workflow';
/**
 * HTTP Response instruction for URL trigger workflows.
 * Follows the same pattern as webhook's ResponseInstruction:
 * saves result to job and calls processor.exit().
 * The trigger reads the result from the last job.
 */
export default class ResponseInstruction extends Instruction {
    run(node: FlowNodeModel, prevJob: any, processor: Processor): Promise<any>;
}
