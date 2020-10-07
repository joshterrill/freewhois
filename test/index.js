const assert = require("assert");
const whois = require("../");

describe("freewhois tests", () => {
    it("should lookup google.com whois successfully", async () => {
        const google = await whois("google.com");
        assert.ok(google);
        assert.strictEqual(google.ldhName, "GOOGLE.COM");
    });

    it("should fail to lookup a tld that does not exist", async () => {
        try {
            await whois("somedomain.sdfgsdjgs");
        } catch (error) {
            assert.strictEqual(error.message, "Unable to find tld sdfgsdjgs");
        }
    });

    it("should fail to lookup because no domain was provided", async () => {
        try {
            await whois("");
        } catch (error) {
            assert.strictEqual(error.message, "You must enter a domain");
        }
    });
});