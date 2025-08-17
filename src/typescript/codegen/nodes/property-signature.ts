import { ResolveOptions } from "../f7"
import { IsReadonlyProperty, IsOptionalProperty } from "../f8"
import { Collect } from "../visit/collect"
import { InjectOptions } from "./inject-options"
import * as Ts from 'typescript'

export function* PropertySignature(node: Ts.PropertySignature): IterableIterator<string> {
    const [readonly, optional] = [IsReadonlyProperty(node), IsOptionalProperty(node)]
    const options = ResolveOptions(node)
    const type_0 = Collect(node.type)
    const type_1 = InjectOptions(type_0, options)
    if (readonly && optional) {
      return yield `${node.name.getText()}: Type.ReadonlyOptional(${type_1})`
    } else if (readonly) {
      return yield `${node.name.getText()}: Type.Readonly(${type_1})`
    } else if (optional) {
      return yield `${node.name.getText()}: Type.Optional(${type_1})`
    } else {
      return yield `${node.name.getText()}: ${type_1}`
    }
  }
