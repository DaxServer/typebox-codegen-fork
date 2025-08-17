import { state } from "./states"

export function ImportStatement(): string {
    if (!(state.useImports && state.useTypeBoxImport)) return ''
    const set = new Set<string>(['Type', 'Static'])
    if (state.useGenerics) {
      set.add('TSchema')
    }
    if (state.useOptions) {
      set.add('SchemaOptions')
    }
    if (state.useCloneType) {
      set.add('CloneType')
    }
    const imports = [...set].join(', ')
    return `import { ${imports} } from '@sinclair/typebox'`
  }
