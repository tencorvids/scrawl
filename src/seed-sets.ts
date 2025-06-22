import fs from "fs";
import path from "path";

const SETS_ENDPOINT = "https://api.scryfall.com/sets";

type ScryfallSet = {
  name: string;
  code: string;
  icon_svg_uri: string;
};

async function fetchSets() {
    console.log("Fetching sets from Scryfall API...");
    const response = await fetch(SETS_ENDPOINT);
    if (!response.ok) {
      throw new Error(`HTTP error, status: ${response.status}`);
    }

    console.log("Parsing API response...");
    const data = await response.json();
    if (data.object !== "list" || !Array.isArray(data.data)) {
      throw new Error("Unexpected API response format");
    }

    const sets = data.data.map((set: ScryfallSet) => ({
        name: set.name,
        code: set.code,
        icon_svg_uri: set.icon_svg_uri,
    }));

    return sets;
}

async function main() {
    const sets = await fetchSets();
    
    const iconsDir = path.join(process.cwd(), "icons", "sets");
    if (!fs.existsSync(iconsDir)) {
        fs.mkdirSync(iconsDir, { recursive: true });
    }

    fs.writeFileSync(path.join(process.cwd(), "icons", "sets.json"), JSON.stringify(sets, null, 2));

    for (const set of sets) {
        const response = await fetch(set.icon_svg_uri);
        if (!response.ok) {
            throw new Error(`HTTP error, status: ${response.status}`);
        }
        const svg = await response.text();
        fs.writeFileSync(path.join(iconsDir, `${set.code}.svg`), svg);
        console.log(`Saved ${set.code}.svg`);

        // good citizen
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

main();