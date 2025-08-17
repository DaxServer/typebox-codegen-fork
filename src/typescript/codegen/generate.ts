import * as Ts from 'typescript'
import { TypeScriptToTypeBoxError } from "../typescript-to-typebox"
import { ImportStatement } from "./import-statement"
import { Visit } from "./visit/visit"

/** Generates TypeBox types from TypeScript interface and type definitions */
  export function gen(typescriptCode: string, transpilerOptions: Ts.TranspileOptions) {
    const source = Ts.createSourceFile('types.ts', typescriptCode, Ts.ScriptTarget.ESNext, true)
    const declarations = [...Visit(source)].join('\n\n')
    const imports = ImportStatement()
    const typescript = [imports, '', '', declarations].join('\n')
    const assertion = Ts.transpileModule(typescript, transpilerOptions)
    if (assertion.diagnostics && assertion.diagnostics.length > 0) {
      throw new TypeScriptToTypeBoxError(assertion.diagnostics)
    }
    return typescript
  }
