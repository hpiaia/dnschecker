import fetch from 'node-fetch'
import {BASE_URL} from './settings'
import cli from 'cli-ux'

type DnsType = 'A' | 'AAAA' | 'CNAME' | 'MX' | 'NS' | 'PTR' | 'SRV' | 'SOA' | 'TXT' | 'CAA' | 'DS' | 'DNSKEY'

interface CheckServerRequest {
  serverId: number;
  dnsType: DnsType;
  uri: string;
  csrftoken: string;
}

const generateCsrf = async () => {
  const {csrf} = await fetch(`${BASE_URL}/ajax_files/gen_csrf.php`, {
    headers: {
      referer: BASE_URL,
    },
  }).then<{csrf: string}>(res => res.json())

  return csrf
}

const checkServer = async (request: CheckServerRequest) => {
  const {serverId, dnsType, csrftoken, uri} = request

  const data = await fetch(`${BASE_URL}/ajax_files/api/${serverId}/${dnsType}/${uri}`, {
    headers: {
      referer: BASE_URL,
      csrftoken,
    },
  }).then(res => res.json())

  return data
}

export const check = async (uri: string, dnsType: DnsType) => {
  cli.action.start('generating csrf token')

  const csrftoken = await generateCsrf()

  cli.action.stop()

  cli.action.start('fetching dns for server 0')

  const res = await checkServer({
    serverId: 0,
    dnsType,
    csrftoken,
    uri,
  })

  cli.action.stop()

  cli.log(res)

  return {}
}
