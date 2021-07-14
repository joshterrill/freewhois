const assert = require("assert");
const whois = require("../");

describe("freewhois tests", () => {
    it("should lookup google.com whois successfully", async () => {
        const google = await whois("google.com");
        assert.ok(google);
        assert.strictEqual(google.ldhName.toUpperCase(), "GOOGLE.COM");
    });

    it("should lookup pbr.digital whois successfully", async () => {
        const pbr = await whois("http://pbr.digital/");
        assert.ok(pbr);
        assert.strictEqual(pbr.ldhName.toUpperCase(), "PBR.DIGITAL");
    });

    it("should fail to lookup a tld that does not exist", async () => {
        try {
            await whois("somedomain.sdfgsdjgs");
        } catch (error) {
            assert.strictEqual(error.message, "Unable to find TLD: sdfgsdjgs");
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