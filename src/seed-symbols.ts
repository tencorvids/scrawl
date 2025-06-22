import fs from "fs";
import path from "path";

const CARD_SYMBOLS_ENDPOINT = "https://api.scryfall.com/symbology";

type ScryfallSymbol = {
  symbol: string;
  safe_symbol: string;
  svg_uri: string;
};

async function fetchSymbols() {
    console.log("Fetching card symbols from Scryfall API...");
    const response = await fetch(CARD_SYMBOLS_ENDPOINT);
    if (!response.ok) {
        throw new Error(`HTTP error, status: ${response.status}`);
    }

    const data = await response.json();
    if (data.object !== "list" || !Array.isArray(data.data)) {
        throw new Error("Unexpected API response format");
    }

    const symbols = data.data.map((symbol: ScryfallSymbol) => ({
        symbol: symbol.symbol.toLowerCase(),
        safe_symbol: symbol.svg_uri.split("/").pop()?.replace(".svg", "").toLowerCase(),
        svg_uri: symbol.svg_uri,
    }));

    return symbols;
}

async function main() {
    const symbols = await fetchSymbols();

    const symbolsDir = path.join(process.cwd(), "icons", "symbols");
    if (!fs.existsSync(symbolsDir)) {
        fs.mkdirSync(symbolsDir, { recursive: true });
    }

    fs.writeFileSync(path.join(process.cwd(), "icons", "symbols.json"), JSON.stringify(symbols, null, 2));

    for (const symbol of symbols) {
        const response = await fetch(symbol.svg_uri);
        const svg = await response.text();
        fs.writeFileSync(path.join(symbolsDir, symbol.safe_symbol), svg);
        console.log(`Saved ${symbol.safe_symbol}`);

        // good citizen
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

main();
