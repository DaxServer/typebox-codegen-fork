import { Type, Static, TSchema } from '@sinclair/typebox'


export const EntityTypes = undefined

export type EntityType = Static<typeof EntityType>
export const EntityType = Type.Index(typeof EntityTypes, Type.Number())

export type NumericId = Static<typeof NumericId>
export const NumericId = Type.TemplateLiteral([Type.Number()])

export type ItemId = Static<typeof ItemId>
export const ItemId = Type.TemplateLiteral([Type.Literal('Q'), Type.Number()])

export type PropertyId = Static<typeof PropertyId>
export const PropertyId = Type.TemplateLiteral([Type.Literal('P'), Type.Number()])

export type LexemeId = Static<typeof LexemeId>
export const LexemeId = Type.TemplateLiteral([Type.Literal('L'), Type.Number()])

export type FormId = Static<typeof FormId>
export const FormId = Type.TemplateLiteral([Type.Literal('L'), Type.Number(), Type.Literal('-F'), Type.Number()])

export type SenseId = Static<typeof SenseId>
export const SenseId = Type.TemplateLiteral([Type.Literal('L'), Type.Number(), Type.Literal('-S'), Type.Number()])

export type EntitySchemaId = Static<typeof EntitySchemaId>
export const EntitySchemaId = Type.TemplateLiteral([Type.Literal('E'), Type.Number()])

export type MediaInfoId = Static<typeof MediaInfoId>
export const MediaInfoId = Type.TemplateLiteral([Type.Literal('M'), Type.Number()])

export type RevisionId = Static<typeof RevisionId>
export const RevisionId = Type.TemplateLiteral([Type.Number()])

export type PropertyClaimsId = Static<typeof PropertyClaimsId>
export const PropertyClaimsId = Type.TemplateLiteral([EntityId, Type.Literal('#'), PropertyId])

export type EntityId = Static<typeof EntityId>
export const EntityId = Type.Union([
NonNestedEntityId,
FormId,
SenseId
])

export type NonNestedEntityId = Static<typeof NonNestedEntityId>
export const NonNestedEntityId = Type.Union([
ItemId,
PropertyId,
LexemeId,
MediaInfoId,
EntitySchemaId
])

export type NamespacedEntityId = Static<typeof NamespacedEntityId>
export const NamespacedEntityId = Type.Union([
Type.TemplateLiteral([Type.Literal('Item:'), ItemId]),
Type.TemplateLiteral([Type.Literal('Lexeme:'), LexemeId]),
Type.TemplateLiteral([Type.Literal('Property:'), PropertyId]),
Type.TemplateLiteral([Type.Literal('EntitySchema:'), EntitySchemaId])
])

export type IdByEntityType = Static<typeof IdByEntityType>
export const IdByEntityType = Type.Object({
'form': FormId,
'item': ItemId,
'lexeme': LexemeId,
'property': PropertyId,
'sense': SenseId,
'entity-schema': EntitySchemaId
})

export type Guid = Static<typeof Guid>
export const Guid = Type.TemplateLiteral([Type.Union([
EntityId,
Type.Lowercase(EntityId)
]), Type.Literal('$'), Type.String()])

export type GuidAltSyntax = Static<typeof GuidAltSyntax>
export const GuidAltSyntax = Type.TemplateLiteral([Type.Union([
EntityId,
Type.Lowercase(EntityId)
]), Type.Literal('-'), Type.String()])

export type Hash = Static<typeof Hash>
export const Hash = Type.String()

export type Entity = Static<typeof Entity>
export const Entity = Type.Union([
Property,
Item,
Lexeme,
MediaInfo
])

export type EntityPageTitle = Static<typeof EntityPageTitle>
export const EntityPageTitle = Type.Union([
NamespacedEntityId,
ItemId
])

export type Entities = Static<typeof Entities>
export const Entities = Type.Record(EntityId, Entity)

export type Property = Static<typeof Property>
export const Property = Type.Composite([EntityInfo(PropertyId), Type.Object({
type: Type.Literal('property'),
datatype: Type.Optional(Type.Any()),
labels: Type.Optional(Type.Any()),
descriptions: Type.Optional(Type.Any()),
aliases: Type.Optional(Type.Any()),
claims: Type.Optional(Type.Any())
})])

export type Item = Static<typeof Item>
export const Item = Type.Composite([EntityInfo(ItemId), Type.Object({
type: Type.Literal('item'),
labels: Type.Optional(Type.Any()),
descriptions: Type.Optional(Type.Any()),
aliases: Type.Optional(Type.Any()),
claims: Type.Optional(Type.Any()),
sitelinks: Type.Optional(Type.Any())
})])

export type Lexeme = Static<typeof Lexeme>
export const Lexeme = Type.Composite([EntityInfo(LexemeId), Type.Object({
type: Type.Literal('lexeme'),
lexicalCategory: ItemId,
language: ItemId,
claims: Type.Optional(Type.Any()),
lemmas: Type.Optional(Type.Any()),
forms: Type.Optional(Type.Array(Type.Any())),
senses: Type.Optional(Type.Array(Type.Any()))
})])

export type MediaInfo = Static<typeof MediaInfo>
export const MediaInfo = Type.Composite([EntityInfo(MediaInfoId), Type.Object({
type: Type.Literal('mediainfo'),
labels: Type.Optional(Type.Any()),
descriptions: Type.Optional(Type.Any()),
statements: Type.Optional(Type.Any())
})])

export type EntityInfo<T extends TSchema> = Static<ReturnType<typeof EntityInfo<T>>>
export const EntityInfo = <T extends TSchema>(T: T) => Type.Object({
pageid: Type.Optional(Type.Number()),
ns: Type.Optional(Type.Number()),
title: Type.Optional(Type.String()),
lastrevid: Type.Optional(Type.Number()),
modified: Type.Optional(Type.String()),
redirects: Type.Optional(Type.Object({
from: Type.Any(),
to: Type.Any()
})),
id: Type.Any()
})

export type SimplifiedEntityInfo = Static<typeof SimplifiedEntityInfo>
export const SimplifiedEntityInfo = Type.Object({
id: EntityId,
modified: Type.Optional(Type.String())
})

export type SimplifiedItem = Static<typeof SimplifiedItem>
export const SimplifiedItem = Type.Composite([SimplifiedEntityInfo, Type.Object({
type: Type.Literal('item'),
labels: Type.Optional(Type.Any()),
descriptions: Type.Optional(Type.Any()),
aliases: Type.Optional(Type.Any()),
claims: Type.Optional(Type.Any()),
sitelinks: Type.Optional(Type.Any()),
lexicalCategory: Type.String()
})])

export type SimplifiedProperty = Static<typeof SimplifiedProperty>
export const SimplifiedProperty = Type.Composite([SimplifiedEntityInfo, Type.Object({
type: Type.Literal('property'),
datatype: Type.Any(),
labels: Type.Optional(Type.Any()),
descriptions: Type.Optional(Type.Any()),
aliases: Type.Optional(Type.Any()),
claims: Type.Optional(Type.Any()),
lexicalCategory: Type.String()
})])

export type SimplifiedLexeme = Static<typeof SimplifiedLexeme>
export const SimplifiedLexeme = Type.Composite([SimplifiedEntityInfo, Type.Object({
type: Type.Literal('lexeme'),
lexicalCategory: ItemId,
language: ItemId,
claims: Type.Optional(Type.Any()),
lemmas: Type.Optional(Type.Any()),
forms: Type.Optional(Type.Any()),
senses: Type.Optional(Type.Any())
})])

export type SimplifiedEntity = Static<typeof SimplifiedEntity>
export const SimplifiedEntity = Type.Union([
SimplifiedProperty,
SimplifiedItem,
SimplifiedLexeme
])

export type SimplifiedEntities = Static<typeof SimplifiedEntities>
export const SimplifiedEntities = Type.Record(EntityId, SimplifiedEntity)