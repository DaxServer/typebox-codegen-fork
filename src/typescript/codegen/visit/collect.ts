import { Visit } from "./visit";
import * as Ts from 'typescript'

export function Collect(node: Ts.Node | undefined): string {
    return `${[...Visit(node)].join('')}`
  }
