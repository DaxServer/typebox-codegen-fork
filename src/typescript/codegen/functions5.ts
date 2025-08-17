import { Collect } from "./visit/collect"
import * as Ts from 'typescript'

export function* TupleTypeNode(node: Ts.TupleTypeNode): IterableIterator<string> {
    const types = node.elements.map((type) => Collect(type)).join(',\n')
    yield `Type.Tuple([\n${types}\n])`
  }
  export function* UnionTypeNode(node: Ts.UnionTypeNode): IterableIterator<string> {
    const types = node.types.map((type) => Collect(type)).join(',\n')
    yield `Type.Union([\n${types}\n])`
  }
  export function* MappedTypeNode(node: Ts.MappedTypeNode): IterableIterator<string> {
    const K = Collect(node.typeParameter)
    const T = Collect(node.type)
    const C = Collect(node.typeParameter.constraint)
    const readonly = node.readonlyToken !== undefined
    const optional = node.questionToken !== undefined
    const readonly_subtractive = readonly && Ts.isMinusToken(node.readonlyToken)
    const optional_subtractive = optional && Ts.isMinusToken(node.questionToken)
    // prettier-ignore
    return yield (
      (readonly && optional) ? (
        (readonly_subtractive && optional_subtractive) ? `Type.Mapped(${C}, ${K} => Type.Readonly(Type.Optional(${T}, false), false))` :
        (readonly_subtractive) ? `Type.Mapped(${C}, ${K} => Type.Readonly(Type.Optional(${T}), false))` :
        (optional_subtractive) ? `Type.Mapped(${C}, ${K} => Type.Readonly(Type.Optional(${T}, false)))` :
        `Type.Mapped(${C}, ${K} => Type.Readonly(Type.Optional(${T})))`
      ) : (readonly) ? (
        readonly_subtractive
          ? `Type.Mapped(${C}, ${K} => Type.Readonly(${T}, false))`
          : `Type.Mapped(${C}, ${K} => Type.Readonly(${T}))`
      ) : (optional) ? (
        optional_subtractive
          ? `Type.Mapped(${C}, ${K} => Type.Optional(${T}, false))`
          : `Type.Mapped(${C}, ${K} => Type.Optional(${T}))`
      ) : `Type.Mapped(${C}, ${K} => ${T})`
    )
  }
