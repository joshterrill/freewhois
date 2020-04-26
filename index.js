const fs = require("fs");
const request = require("request");

let dns = [];

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

    const foundTld = dns.find(i => i[0][0] === tld);
    if (!foundTld) {
        throw new Error(`Unable to find tld ${tld}`);
    }
    const rdapUrl = foundTld[1][0];
    return rdapUrl;
}

async function whois(domain) {
    return new Promise((resolve, reject) => {
        const strippedDomain = domain.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
        const rdapUrl = findRDAPUrl(strippedDomain);
        request.get(`${rdapUrl}/domain/${strippedDomain}`, (err, body, response) => {
            if (err || response === "" || response === "''") {
                reject(`Error making WHOIS request for domain: ${domain}`);
            } else {
                resolve(JSON.parse(response));
            }
        });
    });
    
}

module.exports = whois;