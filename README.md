# freewhois

A node client that uses the iana RDAP DNS database to lookup WHOIS information for free.

TLD List comes from: https://data.iana.org/rdap/dns.json

*TLD's last updated on 07/14/2021*

## Usage in code

1. Install via `npm i freewhois --save`

2. Code example:

```javascript
const whois = require("freewhois");

async function whoisLookup() {
    const data = await whois("https://www.google.com");
    console.log(data); // returns as json
}

```

## Usage in CLI

1. Install via `npm i freewhois -g`

2. CLI command:

```bash
$ freewhois "https://www.google.com"
$ # returns formatted json
```

## License

MIT
