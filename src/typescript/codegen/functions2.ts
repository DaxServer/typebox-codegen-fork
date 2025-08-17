import { Collect } from "./visit/collect"
import * as Ts from 'typescript'

export function* HeritageClause(node: Ts.HeritageClause): IterableIterator<string> {
    const types = node.types.map((node) => Collect(node))
    // Note: Heritage clauses are only used in interface extends cases. We expect the
    // outer type to be a Composite, and where this type will be prepended before the
    // interface definition.
    yield types.join(', ')
  }
 export function* IndexedAccessType(node: Ts.IndexedAccessTypeNode): IterableIterator<string> {
    const obj = node.objectType.getText()
    const key = Collect(node.indexType)
    yield `Type.Index(${obj}, ${key})`
  }
 export function* ExpressionWithTypeArguments(node: Ts.ExpressionWithTypeArguments): IterableIterator<string> {
    const name = Collect(node.expression)
    const typeArguments = node.typeArguments === undefined ? [] : node.typeArguments.map((node) => Collect(node))
    // todo: default type argument (resolve `= number` from `type Foo<T = number>`)
    return yield typeArguments.length === 0 ? `${name}` : `${name}(${typeArguments.join(', ')})`
  }
 export function* TypeParameterDeclaration(node: Ts.TypeParameterDeclaration): IterableIterator<string> {
    yield node.name.getText()
  }
 export function* ParenthesizedTypeNode(node: Ts.ParenthesizedTypeNode): IterableIterator<string> {
    yield Collect(node.type)
  }
 export function* PropertyAccessExpression(node: Ts.PropertyAccessExpression): IterableIterator<string> {
    yield node.getText()
  }
 export function* RestTypeNode(node: Ts.RestTypeNode): IterableIterator<string> {
    yield `...Type.Rest(${node.type.getText()})`
  }
 export function* ConditionalTypeNode(node: Ts.ConditionalTypeNode): IterableIterator<string> {
    const checkType = Collect(node.checkType)
    const extendsType = Collect(node.extendsType)
    const trueType = Collect(node.trueType)
    const falseType = Collect(node.falseType)
    yield `Type.Extends(${checkType}, ${extendsType}, ${trueType}, ${falseType})`
  }
 export function* isIndexSignatureDeclaration(node: Ts.IndexSignatureDeclaration) {
    // note: we ignore the key and just return the type. this is a mismatch between
    // object and record types. Address in TypeBox by unifying validation paths
    // for objects and record types.
    yield Collect(node.type)
  }
