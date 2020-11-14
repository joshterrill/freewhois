const fs = require("fs");
const request = require("request");

let dns = [];

function trimSlash(input) {
    return input.endsWith('/') ? input.slice(0, -1) : input;
}

function findRDAPUrl(domain) {
    if (!domain) {
        throw new Error("You must enter a domain");
    }
    const tld = domain.split(".")[domain.split(".").length -1];
    if (!tld || tld === "") {
        throw new Error("Error parsing domain");
    }

    if (!dns.length) {
        const dnsFile = fs.readFileSync(`${__dirname}/tlds.json`, "utf-8");
        dns = JSON.parse(dnsFile);
    }

    const foundTld = dns.find(i => i[0].find(j => j === tld));
    if (!foundTld) {
        throw new Error(`Unable to find tld ${tld}`);
    }
    const rdapUrl = trimSlash(foundTld[1][0]);
    return rdapUrl;
}

async function whois(domain) {
    return new Promise((resolve, reject) => {
        let strippedDomain = domain.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
        strippedDomain = trimSlash(strippedDomain);
        const rdapUrl = findRDAPUrl(strippedDomain);
        const requestUrl = `${rdapUrl}/domain/${strippedDomain}`;
        request.get(requestUrl, (err, body, response) => {
            if (err || response === "" || response === "''") {
                reject(`Error making WHOIS request for domain: ${domain}`);
            } else {
                resolve(JSON.parse(response));
            }
        });
    });
    
}

module.exports = whois;