const {Command, flags} = require('@oclif/command');
const client = require('../lib/mc-client');
const imageHelper = require('../lib/image-helper');

class McmCommand extends Command {
  static args = [
    { name: 'imagePath' }
  ]

  async run() {
    const {args} = this.parse(McmCommand);
    const {flags} = this.parse(McmCommand)

    if (flags.remove) {
      await client.fill(-64, 20, -64, 64, 20, 64, false, 'air');
    }

    if (flags.canvas) {
      await client.fill(-65, 20, -65, 65, 20, -65, false, 'air');

      await client.fill(-65, 19, -65, 65, 19, 65, false, 'air');
      // We have to make it slightly wider than the map so we don't get the lightening affect from height.
      await client.fill(-65, 19, -65, 65, 19, 65, false, 'quartz_block');
      // Add a lip so we don't get the weird shadow effect.
      // We have to make it slightly wider than the map so we don't get the lightening affect from height.
      await client.fill(-65, 20, -65, 65, 20, -65, false, 'quartz_block');
    }

    if  (args.imagePath) {
      await imageHelper.createMapImage(args.imagePath, flags.greyscale)
    }
  }
}

function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}

McmCommand.description = `Create a map by running 'mcm -i /path/to/image'`

McmCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({char: 'v'}),
  // add --help flag to show CLI version
  help: flags.help({char: 'h'}),
  greyscale: flags.boolean({char: 'g', description: 'enable greyscale mode'}),
  remove: flags.boolean({char: 'r', description: 'remove the image'}),
  canvas: flags.boolean({char: 'c', description: 'create the canvas'}),
}

module.exports = McmCommand
