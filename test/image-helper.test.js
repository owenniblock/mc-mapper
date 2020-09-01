const imageHelper = require('../lib/image-helper');

test('generate palette', async function(done) {
    await imageHelper.getBlockPalette(12);

    done();
});