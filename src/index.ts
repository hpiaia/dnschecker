import {Command, flags} from '@oclif/command'
import {check} from './checker'

class Dnschecker extends Command {
  static description = 'check the propagation of a dns around the world';

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
  };

  static args = [
    {
      name: 'uri',
      required: true,
      description: 'the uri you want to check the dns',
    },
    {
      name: 'dnsType',
      required: false,
      description: 'the type of the dns you want to check',
      default: 'A',
      options: [
        'A',
        'AAAA',
        'CNAME',
        'MX',
        'NS',
        'PTR',
        'SRV',
        'SOA',
        'TXT',
        'CAA',
        'DS',
        'DNSKEY',
      ],
    },
  ];

  async run() {
    const {args} = this.parse(Dnschecker)

    await check(args.uri, args.dnsType)
  }
}

export = Dnschecker;
