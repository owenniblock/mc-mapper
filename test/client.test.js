
const client = require('../lib/client');

test('places block without error', async function (done) {
        await client.place(0, 0, 10, true, 'stone')

        done();
});

test('creates a fill without errors', async function (done) {
        await client.fill(-64, 20, -64, 64, 20, 64, false, 'dirt')

        done();
});

test('clears everything without errors', async function (done) {
        await client.fill(-64, 24, -64, 64, 24, 64, false, 'air')

        done();
});