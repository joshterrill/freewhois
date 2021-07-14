const fs = require("fs");
const fetch = require("node-fetch");

let dns = [];

async function get(url) {
    return new Promise(async (resolve, reject) => {
       try {
        const data = await fetch(url);
        const text = await data.text();
        if (!text || text === "" || text === "''" || text === "{}") {
            reject(`Error making WHOIS request for domain: ${url}`);
        }
        resolve(JSON.parse(text));
       } catch (error) {
        reject(error);
       }
    });
}

function trimSlash(input) {
    return input.endsWith("/") ? input.slice(0, -1) : input;
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
        throw new Error(`Unable to find TLD: ${tld}`);
    }
    const rdapUrl = trimSlash(foundTld[1][0]);
    return rdapUrl;
}

async function whois(domain) {
    return new Promise(async (resolve, reject) => {
        try {
            const strippedDomain = trimSlash(domain.replace(/^(?:https?:\/\/)?(?:www\.)?/i, ""));
            const rdapUrl = findRDAPUrl(strippedDomain);
            const requestUrl = `${rdapUrl}/domain/${strippedDomain}`;
            const response = await get(requestUrl);
            resolve(response);
        } catch (error) {
            reject(error || `Error making WHOIS request for domain: ${domain}`);
        }
    });
    
}

module.exports = whois;