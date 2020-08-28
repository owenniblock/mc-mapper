// API docs: https://education.minecraft.net/wp-content/uploads/Code_Connection_API.pdf

const fetch = require('node-fetch');

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

async function fill(fromX, fromY, fromZ, toX, toY, toZ, relative, block) {
    const from = _getBlockPosition(fromX, fromY, fromZ, relative);
    const to = _getBlockPosition(toX, toY, toZ, relative);

    const query = `fill?from=${from}&to=${to}&tileName=${block}`;
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

exports.fill = fill;
exports.place = place;