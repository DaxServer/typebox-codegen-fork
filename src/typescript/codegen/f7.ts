import { JsDoc } from 'src/common'
import * as Ts from 'typescript'

export function ResolveIdentifier(node: Ts.InterfaceDeclaration | Ts.TypeAliasDeclaration) {
    function* resolve(node: Ts.Node): IterableIterator<string> {
      if (node.parent) yield* resolve(node.parent)
      if (Ts.isModuleDeclaration(node)) yield node.name.getText()
    }
    return [...resolve(node), node.name.getText()].join('.')
  }
  export function UnwrapModifier(type: string) {
    for (let i = 0; i < type.length; i++) if (type[i] === '(') return type.slice(i + 1, type.length - 1)
    return type
  }

  export function ResolveJsDocComment(node: Ts.TypeAliasDeclaration | Ts.PropertySignature | Ts.InterfaceDeclaration): string {
    const content = node.getFullText().trim()
    const indices = [content.indexOf('/**'), content.indexOf('type'), content.indexOf('interface')].map((n) => (n === -1 ? Infinity : n))
    if (indices[0] === -1 || indices[1] < indices[0] || indices[2] < indices[0]) return '' // no comment or declaration before comment
    for (let i = indices[0]; i < content.length; i++) {
      if (content[i] === '*' && content[i + 1] === '/') return content.slice(0, i + 2)
    }
    return ''
  }
  export function ResolveOptions(node: Ts.TypeAliasDeclaration | Ts.PropertySignature | Ts.InterfaceDeclaration): Record<string, unknown> {
    const content = ResolveJsDocComment(node)
    return JsDoc.Parse(content)
  }
