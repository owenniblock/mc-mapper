// API docs: https://education.minecraft.net/wp-content/uploads/Code_Connection_API.pdf
// TODO: Refactor this out as a fully blown client to Code Connection in its own package :-)

const fetch = require('node-fetch');
const blocks = require('../blocks.json')

async function _sendCommand(query) {
    return fetch(`http://localhost:8080/${query}`)
        .then(res => res.json())
        .then(json => console.log(json));
}

function _getBlockPosition(x, y, z, relative) {
    let r = '';

    if (relative) {
        r = '~';
    }

    return `${r}${x}%20${r}${y}%20${r}${z}`;
}

async function fill(fromX, fromY, fromZ, toX, toY, toZ, relative, block, data) {
    const from = _getBlockPosition(fromX, fromY, fromZ, relative);
    const to = _getBlockPosition(toX, toY, toZ, relative);

    let query = `fill?from=${from}&to=${to}&tileName=${block}`;

    if (data) {
        query = `${query}&tileData=${data}`;
    }

    console.log(`Running query: ${query}`);
    return _sendCommand(query);
}

async function place(x, y, z, relative, block, data) {
    const position = _getBlockPosition(x, y, z, relative);

    let query = `setblock?position=${position}&tileName=${block}`;

    if (data) {
        query = `${query}&tileData=${data}`;
    }

    console.log(`Running query: ${query}`);
    return _sendCommand(query);
}

async function createRainbowMap(y, relative) {
    let i = 0;
    for (let z = 0; z < 128; z++) {
        if (i+128 >= blocks.length) {
            return
        }

        const block = blocks[i+128];
        await fill(-64, y, z - 64, 64, y, z - 64, false, block.name, block.data);

        i++;
    }
}

async function createHeightMap(y, relative, blockId) {
    for (let i = 0; i < 128; i++) {
        let block = blocks[blockId];
        await place(i - 64, y + i, -64, relative, block.name, block.data)
    }
}

async function deleteHeightMap(y, relative) {
    for (let i = 0; i < 128; i++) {
        await place(i - 64, y + i, -64, relative, 'air')
    }
}

exports.fill = fill;
exports.place = place;
exports.createRainbowMap = createRainbowMap;
exports.createHeightMap = createHeightMap;
exports.deleteHeightMap = deleteHeightMap;