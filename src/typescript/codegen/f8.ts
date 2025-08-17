import * as Ts from 'typescript'
import { state } from './states'

export function FindRecursiveParent(decl: Ts.InterfaceDeclaration | Ts.TypeAliasDeclaration, node: Ts.Node): boolean {
  return (Ts.isTypeReferenceNode(node) && decl.name.getText() === node.typeName.getText()) || node.getChildren().some((node) => FindRecursiveParent(decl, node))
}
export function FindRecursiveThis(node: Ts.Node): boolean {
  return node.getChildren().some((node) => Ts.isThisTypeNode(node) || FindRecursiveThis(node))
}
export function FindTypeName(node: Ts.Node, name: string): boolean {
  const found =
      state.typenames.has(name) ||
      node.getChildren().some((node) => {
        return ((Ts.isInterfaceDeclaration(node) || Ts.isTypeAliasDeclaration(node)) && node.name.getText() === name) || FindTypeName(node, name)
      })
    if (found) state.typenames.add(name)
    return found
  }
  export function IsRecursiveType(decl: Ts.InterfaceDeclaration | Ts.TypeAliasDeclaration) {
    const check1 = Ts.isTypeAliasDeclaration(decl) ? [decl.type].some((node) => FindRecursiveParent(decl, node)) : decl.members.some((node) => FindRecursiveParent(decl, node))
    const check2 = Ts.isInterfaceDeclaration(decl) && FindRecursiveThis(decl)
    return check1 || check2
  }
  export function IsReadonlyProperty(node: Ts.PropertySignature): boolean {
    return node.modifiers !== undefined && node.modifiers.find((modifier) => modifier.getText() === 'readonly') !== undefined
  }
  export function IsOptionalProperty(node: Ts.PropertySignature) {
    return node.questionToken !== undefined
  }
  export function IsOptionalParameter(node: Ts.ParameterDeclaration) {
    return node.questionToken !== undefined
  }
  export function IsExport(node: Ts.InterfaceDeclaration | Ts.TypeAliasDeclaration | Ts.EnumDeclaration | Ts.ModuleDeclaration): boolean {
    return state.blockLevel === 0 && (state.useExportsEverything || (node.modifiers !== undefined && node.modifiers.find((modifier) => modifier.getText() === 'export') !== undefined))
  }
  export function IsNamespace(node: Ts.ModuleDeclaration) {
    return node.flags === Ts.NodeFlags.Namespace
  }
