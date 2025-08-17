import { IsOptionalParameter, IsExport } from "./f8"
import { state } from "./states"
import { Collect } from "./visit/collect"
import { PropertiesFromTypeElementArray } from "./visit/properties-from-type-element-array"
import * as Ts from 'typescript'

export function* Parameter(node: Ts.ParameterDeclaration): IterableIterator<string> {
    yield IsOptionalParameter(node) ? `Type.Optional(${Collect(node.type)})` : Collect(node.type)
  }
 export function* FunctionTypeNode(node: Ts.FunctionTypeNode): IterableIterator<string> {
    const parameters = node.parameters.map((parameter) => (parameter.dotDotDotToken !== undefined ? `...Type.Rest(${Collect(parameter)})` : Collect(parameter))).join(', ')
    const returns = Collect(node.type)
    yield `Type.Function([${parameters}], ${returns})`
  }
 export function* ConstructorTypeNode(node: Ts.ConstructorTypeNode): IterableIterator<string> {
    const parameters = node.parameters.map((param) => Collect(param)).join(', ')
    const returns = Collect(node.type)
    yield `Type.Constructor([${parameters}], ${returns})`
  }
 export function* EnumDeclaration(node: Ts.EnumDeclaration): IterableIterator<string> {
    state.useImports = true
    const exports = IsExport(node) ? 'export ' : ''
    const members = node.members.map((member) => member.getText()).join(', ')
    const enumType = `${exports}enum Enum${node.name.getText()} { ${members} }`
    const staticType = `${exports}type ${node.name.getText()} = Static<typeof ${node.name.getText()}>`
    const type = `${exports}const ${node.name.getText()} = Type.Enum(Enum${node.name.getText()})`
    yield [enumType, '', staticType, type].join('\n')
  }

 export function* TypeLiteralNode(node: Ts.TypeLiteralNode): IterableIterator<string> {
    const members = PropertiesFromTypeElementArray(node.members)
    yield* `Type.Object(${members})`
  }
