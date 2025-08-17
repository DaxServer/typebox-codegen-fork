// Note: This function is only called when 'useIdentifiers' is true. What we're trying to achieve with
  // identifier injection is a referential type model over the default inline model. For the purposes of
  // code generation, we tend to prefer referential types as these can be both inlined or referenced in
  // the codegen target; and where different targets may have different referential requirements. It
  // should be possible to implement a more robust injection mechanism however. For review.

import { UnwrapModifier } from "../f7"
import { state } from "../states"
  // prettier-ignore
 export function InjectOptions(type: string, options: Record<string, unknown>): string {
    if (globalThis.Object.keys(options).length === 0) return type
    // unwrap for modifiers
    if (type.indexOf('Type.ReadonlyOptional') === 0) return `Type.ReadonlyOptional( ${InjectOptions(UnwrapModifier(type), options)} )`
    if (type.indexOf('Type.Readonly') === 0) return `Type.Readonly( ${InjectOptions(UnwrapModifier(type), options)} )`
    if (type.indexOf('Type.Optional') === 0) return `Type.Optional( ${InjectOptions(UnwrapModifier(type), options)} )`
    const encoded = JSON.stringify(options)
    // indexer type
    if (type.lastIndexOf(']') === type.length - 1) state.useCloneType = true
    if (type.lastIndexOf(']') === type.length - 1) return `CloneType(${type}, ${encoded})`
    // referenced type
    if (type.indexOf('(') === -1) { state.useCloneType = true; return `CloneType(${type}, ${encoded})` }
    if (type.lastIndexOf('()') === type.length - 2) return type.slice(0, type.length - 1) + `${encoded})`
    if (type.lastIndexOf('})') === type.length - 2) return type.slice(0, type.length - 1) + `, ${encoded})`
    if (type.lastIndexOf('])') === type.length - 2) return type.slice(0, type.length - 1) + `, ${encoded})`
    if (type.lastIndexOf(')') === type.length - 1) return type.slice(0, type.length - 1) + `, ${encoded})`
    return type
  }
