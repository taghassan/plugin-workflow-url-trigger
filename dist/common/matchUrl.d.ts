/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/**
 * Shared URL matching logic — used by both server and client.
 */
export declare function globToRegex(pattern: string): RegExp;
export declare function compilePattern(pattern: string, mode: string): RegExp | null;
export declare function matchUrl(pattern: string, mode: string, url: string): boolean;
