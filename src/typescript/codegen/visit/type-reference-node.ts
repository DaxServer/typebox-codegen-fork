import * as Ts from 'typescript'
import { FindRecursiveParent, FindTypeName } from "../f8"
import { Collect } from "./collect"
import { state } from '../states'
export function* TypeReferenceNode(node: Ts.TypeReferenceNode): IterableIterator<string> {
    const name = node.typeName.getText()
    const args = node.typeArguments ? `(${node.typeArguments.map((type) => Collect(type)).join(', ')})` : ''
    // --------------------------------------------------------------
    // Instance Types
    // --------------------------------------------------------------
    if (name === 'Date') return yield `Type.Date()`
    if (name === 'Uint8Array') return yield `Type.Uint8Array()`
    if (name === 'String') return yield `Type.String()`
    if (name === 'Number') return yield `Type.Number()`
    if (name === 'Boolean') return yield `Type.Boolean()`
    if (name === 'Function') return yield `Type.Function([], Type.Unknown())`
    // --------------------------------------------------------------
    // Types
    // --------------------------------------------------------------
    if (name === 'Array') return yield `Type.Array${args}`
    if (name === 'Record') return yield `Type.Record${args}`
    if (name === 'Partial') return yield `Type.Partial${args}`
    if (name === 'Required') return yield `Type.Required${args}`
    if (name === 'Omit') return yield `Type.Omit${args}`
    if (name === 'Pick') return yield `Type.Pick${args}`
    if (name === 'Promise') return yield `Type.Promise${args}`
    if (name === 'ReturnType') return yield `Type.ReturnType${args}`
    if (name === 'InstanceType') return yield `Type.InstanceType${args}`
    if (name === 'Parameters') return yield `Type.Parameters${args}`
    if (name === 'AsyncIterableIterator') return yield `Type.AsyncIterator${args}`
    if (name === 'IterableIterator') return yield `Type.Iterator${args}`
    if (name === 'ConstructorParameters') return yield `Type.ConstructorParameters${args}`
    if (name === 'Exclude') return yield `Type.Exclude${args}`
    if (name === 'Extract') return yield `Type.Extract${args}`
    if (name === 'Awaited') return yield `Type.Awaited${args}`
    if (name === 'Uppercase') return yield `Type.Uppercase${args}`
    if (name === 'Lowercase') return yield `Type.Lowercase${args}`
    if (name === 'Capitalize') return yield `Type.Capitalize${args}`
    if (name === 'Uncapitalize') return yield `Type.Uncapitalize${args}`
    if (state.recursiveDeclaration !== null && FindRecursiveParent(state.recursiveDeclaration, node)) return yield `This`
    if (FindTypeName(node.getSourceFile(), name) && args.length === 0 /** non-resolvable */) {
      return yield `${name}${args}`
    }
    // Check if the type is an imported type (e.g., from wikibase-sdk)
    // This is a placeholder for more sophisticated import resolution.
    // For now, we'll treat any unresolved type reference as Type.Any().
    if (name in globalThis) return yield `Type.Never()`
    // If the type is not a known TypeBox type or a global, treat it as Type.Any()
    // This handles imported types that are not explicitly defined in the current file.
    if (!FindTypeName(node.getSourceFile(), name)) {
      return yield `Type.Any()`
    }
    return yield `${name}${args}`
  }
