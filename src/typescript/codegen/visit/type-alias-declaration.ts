import { ResolveIdentifier, ResolveOptions } from "../f7"
import { IsRecursiveType, IsExport } from "../f8"
import { InjectOptions } from "../nodes/inject-options"
import { Collect } from "./collect"
import * as Ts from 'typescript'
import { state } from '../states'

export function* TypeAliasDeclaration(node: Ts.TypeAliasDeclaration): IterableIterator<string> {
    state.useImports = true
    const isRecursiveType = IsRecursiveType(node)
    if (isRecursiveType) state.recursiveDeclaration = node
    // Generics case
    if (node.typeParameters) {
      state.useGenerics = true
      const exports = IsExport(node) ? 'export ' : ''
      const options = state.useIdentifiers ? { $id: ResolveIdentifier(node) } : {}
      const constraints = node.typeParameters.map((param) => `${Collect(param)} extends TSchema`).join(', ')
      const parameters = node.typeParameters.map((param) => `${Collect(param)}: ${Collect(param)}`).join(', ')
      const type_0 = Collect(node.type)
      const type_1 = isRecursiveType ? `Type.Recursive(This => ${type_0})` : type_0
      const type_2 = InjectOptions(type_1, options)
      const names = node.typeParameters.map((param) => Collect(param)).join(', ')
      const staticDeclaration = `${exports}type ${node.name.getText()}<${constraints}> = Static<ReturnType<typeof ${node.name.getText()}<${names}>>>`
      const typeDeclaration = `${exports}const ${node.name.getText()} = <${constraints}>(${parameters}) => ${type_2}`
      yield `${staticDeclaration}\n${typeDeclaration}`
    } else {
      const exports = IsExport(node) ? 'export ' : ''
      const options = state.useIdentifiers ? { $id: ResolveIdentifier(node), ...ResolveOptions(node) } : { ...ResolveOptions(node) }
      const type_0 = Collect(node.type)
      const type_1 = isRecursiveType ? `Type.Recursive(This => ${type_0})` : type_0
      const type_2 = InjectOptions(type_1, options)
      const staticDeclaration = `${exports}type ${node.name.getText()} = Static<typeof ${node.name.getText()}>`
      const typeDeclaration = `${exports}const ${node.name.getText()} = ${type_2}`
      yield `${staticDeclaration}\n${typeDeclaration}`
    }
    state.recursiveDeclaration = null
  }
