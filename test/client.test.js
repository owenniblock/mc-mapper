
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
        await client.fill(-64, 20, -64, 64, 20, 64, false, 'air')

        done();
});

test('creates rainbow test without errors', async function (done) {
        await client.createRainbowMap(20, false);

        done();
});

test('creates height test without errors', async function (done) {
        await client.createHeightMap(20, false, 250);

        done();
});

test('deletes height test without errors', async function (done) {
        await client.deleteHeightMap(20, false);

        done();
});

test('creates a blank page', async function (done) {
        // We have to make it slightly wider than the map so we don't get the lightening affect from height.
        await client.fill(-65, 19, -65, 65, 19, 65, false, 'quartz_block')

        done();
});