import { ResolveIdentifier, ResolveOptions } from "../f7"
import { IsRecursiveType, IsExport } from "../f8"
import { InjectOptions } from "../nodes/inject-options"
import { Collect } from "./collect"
import { PropertiesFromTypeElementArray } from "./properties-from-type-element-array"
import * as Ts from 'typescript'
import { state } from "../states"

export function* InterfaceDeclaration(node: Ts.InterfaceDeclaration): IterableIterator<string> {
    state.useImports = true
    const isRecursiveType = IsRecursiveType(node)
    if (isRecursiveType) state.recursiveDeclaration = node
    const heritage = node.heritageClauses !== undefined ? node.heritageClauses.flatMap((node) => Collect(node)) : []
    if (node.typeParameters) {
      state.useGenerics = true
      const exports = IsExport(node) ? 'export ' : ''
      const identifier = ResolveIdentifier(node)
      const options = state.useIdentifiers ? { ...ResolveOptions(node), $id: identifier } : { ...ResolveOptions(node) }
      const constraints = node.typeParameters.map((param) => `${Collect(param)} extends TSchema`).join(', ')
      const parameters = node.typeParameters.map((param) => `${Collect(param)}: ${Collect(param)}`).join(', ')
      const members = PropertiesFromTypeElementArray(node.members)
      const names = node.typeParameters.map((param) => `${Collect(param)}`).join(', ')
      const staticDeclaration = `${exports}type ${node.name.getText()}<${constraints}> = Static<ReturnType<typeof ${node.name.getText()}<${names}>>>`
      const rawTypeExpression = IsRecursiveType(node) ? `Type.Recursive(This => Type.Object(${members}))` : `Type.Object(${members})`
      const typeExpression = heritage.length === 0 ? rawTypeExpression : `Type.Composite([${heritage.join(', ')}, ${rawTypeExpression}])`
      const type = InjectOptions(typeExpression, options)
      const typeDeclaration = `${exports}const ${node.name.getText()} = <${constraints}>(${parameters}) => ${type}`
      yield `${staticDeclaration}\n${typeDeclaration}`
    } else {
      const exports = IsExport(node) ? 'export ' : ''
      const identifier = ResolveIdentifier(node)
      const options = state.useIdentifiers ? { ...ResolveOptions(node), $id: identifier } : { ...ResolveOptions(node) }
      const members = PropertiesFromTypeElementArray(node.members)
      const staticDeclaration = `${exports}type ${node.name.getText()} = Static<typeof ${node.name.getText()}>`
      const rawTypeExpression = IsRecursiveType(node) ? `Type.Recursive(This => Type.Object(${members}))` : `Type.Object(${members})`
      const typeExpression = heritage.length === 0 ? rawTypeExpression : `Type.Composite([${heritage.join(', ')}, ${rawTypeExpression}])`
      const type = InjectOptions(typeExpression, options)
      const typeDeclaration = `${exports}const ${node.name.getText()} = ${type}`
      yield `${staticDeclaration}\n${typeDeclaration}`
    }
    state.recursiveDeclaration = null
  }
