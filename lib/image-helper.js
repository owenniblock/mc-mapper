const jimp = require('jimp');
const map = require('../lib/mc-client');
const fs = require('fs');

const blocks = require('../blocks.json');
const palette = require('../blockPalette.json');

async function getBlockPalette(blockSize) {
    let palette = [];
    let blockJson = [];

    return jimp.read('./images/test-blocks-1.png').then((testBlocks) => {

        for (let y = 0; y <= testBlocks.getHeight(); y = y + blockSize) {
            const colour = testBlocks.getPixelColour(testBlocks.getWidth() / 2, y);
            const rgba = jimp.intToRGBA(colour);
            palette.push(rgba);
        }
        console.log(palette.length);
    }).then(() => {
        return jimp.read('./images/test-blocks-2.png').then((testBlocks2) => {
            for (let y = 0; y <= testBlocks2.getHeight(); y = y + blockSize) {
                const colour = testBlocks2.getPixelColour(testBlocks2.getWidth() / 2, y);
                const rgba = jimp.intToRGBA(colour);
                palette.push(rgba);
            }
            console.log(palette.length);
        }).then(() => {
            console.log(`Block count: ${blocks.length}`)
            for (let i = 0; i < palette.length; i++) {
                console.log(`Pushing block ${i}, name: ${blocks[i].name}`);
                blockJson.push({
                    "name": blocks[i].name,
                    "data": blocks[i].data,
                    "r": palette[i].r,
                    "g": palette[i].g,
                    "b": palette[i].b
                });
            }

            console.log(`Writing blockPalette file`);
            fs.writeFileSync('./blockPalette.json', JSON.stringify(blockJson));
        })
    });
}

async function createMapImage(imagePath) {
    return jimp.read(imagePath).then(async image => {
        image.contain(128, 128);

        for (let y = 0; y < 128; y++) {
            for (let x = 0; x < 128; x++) {
                const colour = image.getPixelColour(x, y);
                const rgba = jimp.intToRGBA(colour);
                const block = _getClosestBlock(rgba.r, rgba.g, rgba.b)
                await map.place(x - 64, 20, y - 64, false, block.name, block.data);
            }
        }
    });
}

function _getClosestBlock(r, g, b) {
    // We treat the colour space like 3d space and brute force the nearest colour.
    // We could use a clevererer space algorithm here but the list is quick small
    // ¯\_(ツ)_/¯
    // TODO: Implement caching.
    let distance = 99999999;
    let block;
    for (let i = 0; i < palette.length; i++) {
        d = Math.sqrt((r - palette[i].r) * (r - palette[i].r) +
            (g - palette[i].g) * (g - palette[i].g) +
            (b - palette[i].b) * (b - palette[i].b));
        if (distance > d) {
            distance = d;
            block = palette[i];

            if (distance == 0) {
                // Spot on!
                return block;
            }
        }
    }

    console.log(`For rgb: ${r} ${g} ${b} = ${block.name} ${block.data} ${block.r} ${block.g} ${block.b}`)
    return block;
}

exports.getBlockPalette = getBlockPalette;
exports.createMapImage = createMapImage;