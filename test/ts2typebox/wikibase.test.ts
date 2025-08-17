import { expect, describe, it } from 'bun:test';
import { TypeScriptToTypeBox } from "../../src/typescript/typescript-to-typebox";
import * as prettier from 'prettier';

function expectEqualIgnoreFormatting(a: string, b: string) {
  const format = (text: string) => prettier.format(text, { parser: 'typescript' });
  expect(format(a)).toEqual(format(b));
}

describe("wikibase-sdk types", () => {
  it("should handle imported types from wikibase-sdk", () => {
    const generatedTypebox = TypeScriptToTypeBox.Generate(
      `
      import { Entity } from 'wikibase-sdk';

      export type MyEntity = Entity;
      `,
      { useExportEverything: true }
    );

    const expectedResult = `
import { Type, Static } from "@sinclair/typebox";

export type MyEntity = Static<typeof MyEntity>;
export const MyEntity = Type.Any();
`;
    expectEqualIgnoreFormatting(generatedTypebox, expectedResult);
  });
});
