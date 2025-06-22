import fs from 'fs';
import path from 'path';
import { FontAssetType, OtherAssetType, generateFonts } from 'fantasticon';

function main() {
    if (!fs.existsSync(path.join(process.cwd(), "fonts"))) {
        fs.mkdirSync(path.join(process.cwd(), "fonts"), { recursive: true });
    }

    generateFonts({
        inputDir: path.join(process.cwd(), "icons"),
        outputDir: path.join(process.cwd(), "fonts"),
        name: "scrawl",
        fontTypes: [FontAssetType.WOFF2, FontAssetType.WOFF],
        assetTypes: [OtherAssetType.CSS, OtherAssetType.HTML],
        fontHeight: 300,
    }).then(results => console.log('Done', results));
}

main();