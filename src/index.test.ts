import SocialNetworkClient, { Terminal } from "./index";
const consoleReading = (input: string) => ({
  readLine() {
    return input;
  }
});

describe("Testing Social Network Kata", () => {
  describe("Testing the User", () => {
    it("should publish a message on the timeline", () => {
      const lines = [];

      const output = {
        println(line: string) {
          console.log(line);
          lines.push(line);
        }
      };
      const client = new SocialNetworkClient(output);

      let input: Terminal = consoleReading("post (0s ago): Hello World!");

      client.process(input);

      client.process(consoleReading("timeline"));

      expect(lines).toContain("Alice (0s ago): Hello World!");
    });
  });
});
