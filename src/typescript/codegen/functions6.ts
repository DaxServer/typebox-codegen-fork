import { state } from "./states"
import { Collect } from "./visit/collect"
import { Visit } from "./visit/visit"
import * as Ts from 'typescript'

export function* SourceFile(node: Ts.SourceFile): IterableIterator<string> {
    for (const next of node.getChildren()) {
      yield* Visit(next)
    }
  }

  export function* ArrayTypeNode(node: Ts.ArrayTypeNode): IterableIterator<string> {
    const type = Collect(node.elementType)
    yield `Type.Array(${type})`
  }
  export function* Block(node: Ts.Block): IterableIterator<string> {
    state.blockLevel += 1
    const statments = node.statements.map((statement) => Collect(statement)).join('\n\n')
    state.blockLevel -= 1
    yield `{\n${statments}\n}`
  }
