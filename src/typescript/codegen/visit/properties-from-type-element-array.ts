import { Collect } from "./collect"
import * as Ts from 'typescript'

export function PropertiesFromTypeElementArray(members: Ts.NodeArray<Ts.TypeElement>): string {
    const properties = members.filter((member) => !Ts.isIndexSignatureDeclaration(member))
    const indexers = members.filter((member) => Ts.isIndexSignatureDeclaration(member))
    const propertyCollect = properties.map((property) => Collect(property)).join(',\n')
    const indexer = indexers.length > 0 ? Collect(indexers[indexers.length - 1]) : ''
    if (properties.length === 0 && indexer.length > 0) {
      return `{},\n{\nadditionalProperties: ${indexer}\n }`
    } else if (properties.length > 0 && indexer.length > 0) {
      return `{\n${propertyCollect}\n},\n{\nadditionalProperties: ${indexer}\n }`
    } else {
      return `{\n${propertyCollect}\n}`
    }
  }
