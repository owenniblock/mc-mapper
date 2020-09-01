const imageHelper = require('../lib/image-helper');

test('generate palette', async function(done) {
    imageHelper.getBlockPalette(6).then(() => {
        done();
    });
});


test('map image', async function(done) {
    //await imageHelper.createMapImage('./images/npm-logo.png');
    //imageHelper.createMapImage('./images/github.jpg').then(() => {
    imageHelper.createMapImage('./images/ms.jpg').then(() => {
        done();
    });
});