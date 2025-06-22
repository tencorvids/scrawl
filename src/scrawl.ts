import fs from 'fs';
import path from 'path';
import { FontAssetType, OtherAssetType, generateFonts } from 'fantasticon';

function main() {
    if (!fs.existsSync(path.join(process.cwd(), "fonts"))) {
        fs.mkdirSync(path.join(process.cwd(), "fonts"), { recursive: true });
    }

    if (!fs.existsSync(path.join(process.cwd(), "fonts", "sets"))) {
        fs.mkdirSync(path.join(process.cwd(), "fonts", "sets"), { recursive: true });
    }

    if (!fs.existsSync(path.join(process.cwd(), "fonts", "symbols"))) {
        fs.mkdirSync(path.join(process.cwd(), "fonts", "symbols"), { recursive: true });
    }

    generateFonts({
        inputDir: path.join(process.cwd(), "icons", "sets"),
        outputDir: path.join(process.cwd(), "fonts", "sets"),
        name: "scrawl-sets",
        fontTypes: [FontAssetType.WOFF2, FontAssetType.WOFF],
        assetTypes: [OtherAssetType.CSS, OtherAssetType.HTML],
        normalize: true,
    }).then(results => console.log('Done', results));

    generateFonts({
        inputDir: path.join(process.cwd(), "icons", "symbols"),
        outputDir: path.join(process.cwd(), "fonts", "symbols"),
        name: "scrawl-symbols",
        fontTypes: [FontAssetType.WOFF2, FontAssetType.WOFF],
        assetTypes: [OtherAssetType.CSS, OtherAssetType.HTML],
        normalize: true,
    }).then(results => console.log('Done', results));
}

main();