const imageHelper = require('../lib/image-helper');

test('generate palette', async function(done) {
    imageHelper.getBlockPalette(6).then(() => {
        done();
    });
});


test('map image', async function(done) {
    //await imageHelper.createMapImage('./images/npm-logo.png');
    //imageHelper.createMapImage('./images/github.jpg').then(() => {
    imageHelper.createMapImage('./images/1200px-The_Scream.jpg').then(() => {
        done();
    });
});

test('map image in greyscale', async function(done) {
    imageHelper.createMapImage('./images/owen.jpg', true).then(() => {
        done();
    });
});