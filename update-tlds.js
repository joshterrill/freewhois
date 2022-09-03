const axios = require('axios');
const fs = require('fs');

(async () => {
    const res = await axios('https://data.iana.org/rdap/dns.json');
    const data = res.data;
    if (data && data.services) {
        fs.writeFileSync('./tlds.json', JSON.stringify(data.services));
        console.log('Updated tlds.json');
    } else {
        console.log('Couldn\'t get tlds');
    }
    process.exit();
})();