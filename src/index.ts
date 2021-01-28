import {Command, flags} from '@oclif/command'
import {check} from './checker'

class Dnschecker extends Command {
  static description = 'check the propagation of a dns around the world'

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
  }

  static args = [{
    name: 'uri',
  }]

  async run() {
    const {args} = this.parse(Dnschecker)

    await check(args.uri)
  }
}

export = Dnschecker
