import { Collect } from "./visit/collect"
import * as Ts from 'typescript'

export function* MethodSignature(node: Ts.MethodSignature): IterableIterator<string> {
    const parameters = node.parameters.map((parameter) => (parameter.dotDotDotToken !== undefined ? `...Type.Rest(${Collect(parameter)})` : Collect(parameter))).join(', ')
    const returnType = node.type === undefined ? `Type.Unknown()` : Collect(node.type)
    yield `${node.name.getText()}: Type.Function([${parameters}], ${returnType})`
  }
  // prettier-ignore
  export function* TemplateLiteralTypeNode(node: Ts.TemplateLiteralTypeNode) {
    const collect = node.getChildren().map(node => Collect(node)).join('')
    yield `Type.TemplateLiteral([${collect.slice(0, collect.length - 2)}])` // can't remove trailing here
  }
  // prettier-ignore
  export function* TemplateLiteralTypeSpan(node: Ts.TemplateLiteralTypeSpan) {
    const collect = node.getChildren().map(node => Collect(node)).join(', ')
    if (collect.length > 0) yield `${collect}`
  }
  export function* TemplateHead(node: Ts.TemplateHead) {
    if (node.text.length > 0) yield `Type.Literal('${node.text}'), `
  }
  export function* TemplateMiddle(node: Ts.TemplateMiddle) {
    if (node.text.length > 0) yield `Type.Literal('${node.text}'), `
  }
  export function* TemplateTail(node: Ts.TemplateTail) {
    if (node.text.length > 0) yield `Type.Literal('${node.text}'), `
  }
  export function* ThisTypeNode(node: Ts.ThisTypeNode) {
    yield `This`
  }
  export function* IntersectionTypeNode(node: Ts.IntersectionTypeNode): IterableIterator<string> {
    const types = node.types.map((type) => Collect(type)).join(',\n')
    yield `Type.Intersect([\n${types}\n])`
  }
  export function* TypeOperatorNode(node: Ts.TypeOperatorNode): IterableIterator<string> {
    if (node.operator === Ts.SyntaxKind.KeyOfKeyword) {
      const type = Collect(node.type)
      yield `Type.KeyOf(${type})`
    }
    if (node.operator === Ts.SyntaxKind.ReadonlyKeyword) {
      yield `Type.Readonly(${Collect(node.type)})`
    }
  }
