/*--------------------------------------------------------------------------

@sinclair/typebox-codegen

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---------------------------------------------------------------------------*/

import * as Ts from 'typescript'
import { gen } from './codegen/generate'
import { state } from './codegen/states'
export class TypeScriptToTypeBoxError extends Error {
  constructor(public readonly diagnostics: Ts.Diagnostic[]) {
    super('')
  }
}
// --------------------------------------------------------------------------
// TypeScriptToTypeBox
// --------------------------------------------------------------------------

export interface TypeScriptToTypeBoxOptions {
  /**
   * Setting this to true will ensure all types are exports as const values. This setting is
   * used by the TypeScriptToTypeBoxModel to gather TypeBox definitions during runtime eval
   * pass. The default is false
   */
  useExportEverything?: boolean
  /**
   * Specifies if the output code should specify a default `import` statement. For TypeScript
   * generated code this is typically desirable, but for Model generated code, the `Type`
   * build is passed in into scope as a variable. The default is true.
   */
  useTypeBoxImport?: boolean
  /**
   * Specifies if the output types should include an identifier associated with the assigned
   * variable name. This is useful for remapping model types to targets, but optional for
   * for TypeBox which can operate on vanilla JS references. The default is false.
   */
  useIdentifiers?: boolean
}
/** Generates TypeBox types from TypeScript code */
export namespace TypeScriptToTypeBox {
  export function Generate(typescriptCode: string, options?: TypeScriptToTypeBoxOptions) {
    state.useExportsEverything = options?.useExportEverything ?? false
    state.useIdentifiers = options?.useIdentifiers ?? false
    state.useTypeBoxImport = options?.useTypeBoxImport ?? true
    state.typenames.clear()
    state.useImports = false
    state.useOptions = false
    state.useGenerics = false
    state.useCloneType = false
    state.blockLevel = 0
    return gen(typescriptCode, state.transpilerOptions)
  }
}
