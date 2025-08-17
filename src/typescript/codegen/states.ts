import * as Ts from 'typescript'

// ------------------------------------------------------------------------------------------------------------
  // Transpile Options
  // ------------------------------------------------------------------------------------------------------------
  const transpilerOptions: Ts.TranspileOptions = {
    compilerOptions: {
      strict: true,
      target: Ts.ScriptTarget.ES2022,
    },
  }
  // ------------------------------------------------------------------------------------------------------------
  // Transpile States
  // ------------------------------------------------------------------------------------------------------------
  let typenames = new Set<string>()
  // (auto) tracked for recursive types and used to associate This type references
  let recursiveDeclaration: Ts.TypeAliasDeclaration | Ts.InterfaceDeclaration | null = null

  export const state = {
    typenames,
    recursiveDeclaration,
    blockLevel: 0,
    useImports: false,
    useOptions: false,
    useGenerics: false,
    useCloneType: false,
    useExportsEverything: false,
    useIdentifiers: false,
    useTypeBoxImport: true,
    transpilerOptions,
  }
