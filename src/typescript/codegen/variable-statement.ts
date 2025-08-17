import * as Ts from 'typescript'

export function* VariableStatement(node: Ts.VariableStatement): IterableIterator<string> {
    for (const declaration of node.declarationList.declarations) {
        if (Ts.isVariableDeclaration(declaration)) {
            yield `export const ${declaration.name.getText()} = ${declaration.initializer?.getText()}`
        }
    }
}
