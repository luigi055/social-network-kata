import SocialNetworkClient, { Terminal, UserInterface, MessageInterface } from "./index";
import { User } from "./User";
import { Message } from "./Message";
const consoleReading = (input: string) => ({
  readLine() {
    return input;
  },

  println(input: string) {
    return input;
  }
});

describe("Testing Social Network Kata", () => {

  const lines = [];

      const output = {
        println(line: string) {
          console.log(line);
          lines.push(line);
        }
      };

  describe("Testing the User", () => {
    it("should publish a message on the timeline", () => {
      
      let user = new User("Alice");
      const client = new SocialNetworkClient(output, user);

      let input: Terminal = consoleReading("post Hello World!");

      client.process(input);

      expect(client.showTimeline(input)).toContain("Alice (0s ago): Hello World!");
    });
  });

  describe("should show user timeline", () => {

    let user = new User("Alice");
      const client = new SocialNetworkClient(output, user);
      let message = new Message(" (0s ago): ", "Hello World!");
      client.user.timeline.push(message);
      let input: Terminal = consoleReading("timeline");

      client.process(input);

      expect(client.showTimeline(input)).toContain("Alice (0s ago): Hello World!");
  });

});
