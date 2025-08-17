import { ClassDeclaration, FunctionDeclaration, ImportDeclaration, LiteralTypeNode, NamedTupleMember, ModuleDeclaration, ModuleBlock } from "../functions1"
import { ConditionalTypeNode, ExpressionWithTypeArguments, HeritageClause, IndexedAccessType, isIndexSignatureDeclaration, ParenthesizedTypeNode, PropertyAccessExpression, RestTypeNode, TypeParameterDeclaration } from "../functions2"
import { ConstructorTypeNode, EnumDeclaration, FunctionTypeNode, Parameter, TypeLiteralNode } from "../functions3"
import { IntersectionTypeNode, MethodSignature, TemplateLiteralTypeNode, TemplateLiteralTypeSpan, TemplateHead, TemplateMiddle, TemplateTail, ThisTypeNode, TypeOperatorNode } from "../functions4"
import { UnionTypeNode, MappedTypeNode, TupleTypeNode } from "../functions5"
import { ArrayTypeNode, Block, SourceFile } from "../functions6"
import { PropertySignature } from "../nodes/property-signature"
import { InterfaceDeclaration } from "./interface-declaration"
import { TypeAliasDeclaration } from "./type-alias-declaration"
import { TypeReferenceNode } from "./type-reference-node"
import { VariableStatement } from "../variable-statement"
import * as Ts from 'typescript'

export function* Visit(node: Ts.Node | undefined): IterableIterator<string> {
    if (node === undefined) return
    if (Ts.isArrayTypeNode(node)) return yield* ArrayTypeNode(node)
    if (Ts.isBlock(node)) return yield* Block(node)
    if (Ts.isClassDeclaration(node)) return yield* ClassDeclaration(node)
    if (Ts.isConditionalTypeNode(node)) return yield* ConditionalTypeNode(node)
    if (Ts.isConstructorTypeNode(node)) return yield* ConstructorTypeNode(node)
    if (Ts.isEnumDeclaration(node)) return yield* EnumDeclaration(node)
    if (Ts.isExpressionWithTypeArguments(node)) return yield* ExpressionWithTypeArguments(node)
    if (Ts.isFunctionDeclaration(node)) return yield* FunctionDeclaration(node)
    if (Ts.isFunctionTypeNode(node)) return yield* FunctionTypeNode(node)
    if (Ts.isHeritageClause(node)) return yield* HeritageClause(node)
    if (Ts.isIndexedAccessTypeNode(node)) return yield* IndexedAccessType(node)
    if (Ts.isIndexSignatureDeclaration(node)) return yield* isIndexSignatureDeclaration(node)
    if (Ts.isImportDeclaration(node)) return yield* ImportDeclaration(node)
    if (Ts.isInterfaceDeclaration(node)) return yield* InterfaceDeclaration(node)
    if (Ts.isLiteralTypeNode(node)) return yield* LiteralTypeNode(node)
    if (Ts.isNamedTupleMember(node)) return yield* NamedTupleMember(node)
    if (Ts.isPropertySignature(node)) return yield* PropertySignature(node)
    if (Ts.isModuleDeclaration(node)) return yield* ModuleDeclaration(node)
    if (Ts.isIdentifier(node)) return yield node.getText()
    if (Ts.isIntersectionTypeNode(node)) return yield* IntersectionTypeNode(node)
    if (Ts.isUnionTypeNode(node)) return yield* UnionTypeNode(node)
    if (Ts.isMappedTypeNode(node)) return yield* MappedTypeNode(node)
    if (Ts.isMethodSignature(node)) return yield* MethodSignature(node)
    if (Ts.isModuleBlock(node)) return yield* ModuleBlock(node)
    if (Ts.isParameter(node)) return yield* Parameter(node)
    if (Ts.isParenthesizedTypeNode(node)) return yield* ParenthesizedTypeNode(node)
    if (Ts.isPropertyAccessExpression(node)) return yield* PropertyAccessExpression(node)
    if (Ts.isRestTypeNode(node)) return yield* RestTypeNode(node)
    if (Ts.isTupleTypeNode(node)) return yield* TupleTypeNode(node)
    if (Ts.isTemplateLiteralTypeNode(node)) return yield* TemplateLiteralTypeNode(node)
    if (Ts.isTemplateLiteralTypeSpan(node)) return yield* TemplateLiteralTypeSpan(node)
    if (Ts.isTemplateHead(node)) return yield* TemplateHead(node)
    if (Ts.isTemplateMiddle(node)) return yield* TemplateMiddle(node)
    if (Ts.isTemplateTail(node)) return yield* TemplateTail(node)
    if (Ts.isThisTypeNode(node)) return yield* ThisTypeNode(node)
    if (Ts.isTypeAliasDeclaration(node)) return yield* TypeAliasDeclaration(node)
    if (Ts.isTypeLiteralNode(node)) return yield* TypeLiteralNode(node)
    if (Ts.isTypeOperatorNode(node)) return yield* TypeOperatorNode(node)
    if (Ts.isTypeParameterDeclaration(node)) return yield* TypeParameterDeclaration(node)
    if (Ts.isTypeReferenceNode(node)) return yield* TypeReferenceNode(node)
    if (Ts.isVariableStatement(node)) return yield* VariableStatement(node)
    if (Ts.isSourceFile(node)) return yield* SourceFile(node)
    if (node.kind === Ts.SyntaxKind.ExportKeyword) return yield `export`
    if (node.kind === Ts.SyntaxKind.KeyOfKeyword) return yield `Type.KeyOf()`
    if (node.kind === Ts.SyntaxKind.NumberKeyword) return yield `Type.Number()`
    if (node.kind === Ts.SyntaxKind.BigIntKeyword) return yield `Type.BigInt()`
    if (node.kind === Ts.SyntaxKind.StringKeyword) return yield `Type.String()`
    if (node.kind === Ts.SyntaxKind.SymbolKeyword) return yield `Type.Symbol()`
    if (node.kind === Ts.SyntaxKind.BooleanKeyword) return yield `Type.Boolean()`
    if (node.kind === Ts.SyntaxKind.UndefinedKeyword) return yield `Type.Undefined()`
    if (node.kind === Ts.SyntaxKind.UnknownKeyword) return yield `Type.Unknown()`
    if (node.kind === Ts.SyntaxKind.AnyKeyword) return yield `Type.Any()`
    if (node.kind === Ts.SyntaxKind.NeverKeyword) return yield `Type.Never()`
    if (node.kind === Ts.SyntaxKind.NullKeyword) return yield `Type.Null()`
    if (node.kind === Ts.SyntaxKind.VoidKeyword) return yield `Type.Void()`
    if (node.kind === Ts.SyntaxKind.EndOfFileToken) return
    if (node.kind === Ts.SyntaxKind.SyntaxList) {
      for (const child of node.getChildren()) {
        yield* Visit(child)
      }
      return
    }
    console.warn('Unhandled:', Ts.SyntaxKind[node.kind], node.getText())
  }
