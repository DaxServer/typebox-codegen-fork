import * as Codegen from '@sinclair/typebox-codegen'
import * as path from 'path'

// Read the Wikibase SDK entity type definitions
const dtsPath = path.join(process.cwd(), 'node_modules', 'wikibase-sdk', 'dist', 'src', 'types', 'entity.d.ts')
const dts = await Bun.file(dtsPath).text()

// Generate TypeBox code
const typeboxCode = Codegen.TypeScriptToTypeBox.Generate(dts)

// Write the generated code to the output file
const outputPath = path.join(process.cwd(), 'test', 'wikibase', 'test-result.ts')
await Bun.write(outputPath, typeboxCode)
console.log(`TypeBox schemas generated at ${outputPath}`)
