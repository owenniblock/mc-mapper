const jimp = require('jimp');
const blocks = require('../blocks.json')
const fs = require('fs')

async function getBlockPalette(blockSize) {
    await jimp.read('./images/test-blocks.png', (err, testBlocks) => {
        let palette = [];
        if (err) throw err;
        for (let y = blockSize / 2; y < testBlocks.getHeight(); y = y + blockSize) {
            for (let x = blockSize / 2; x < testBlocks.getWidth(); x = x + blockSize) {
                const colour = testBlocks.getPixelColour(x, y);
                const rgba = jimp.intToRGBA(colour);
                palette.push(rgba);
            }
        }
        console.log(palette.length);

        let blockJson = [];
        let i = 0;

        for (const block in blocks) {
            console.log(`Pushing block ${i}`);
            blockJson.push({
                "name": block.name,
                "data": block.data,
                "r": palette[i].r,
                "g": palette[i].g,
                "b": palette[i].b
            });
            i++;
        }

        console.log(`Writing blockPalette file`);
        fs.writeFileSync('./blockPalette.json', JSON.stringify(blockJson));
    });
}

exports.getBlockPalette = getBlockPalette;