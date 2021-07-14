#!/usr/bin/env node

const whois = require("../");
const util = require("util");

const args = process.argv.splice(2);
const domain = args[0];

if (domain) {
    whois(domain).then(res => console.log(util.inspect(res, false, null, true))).catch(err => console.log(util.inspect(err, false, null, true)))
} else {
    console.log("No domain entered, syntax is 'freewhois https://example.com'");
}
