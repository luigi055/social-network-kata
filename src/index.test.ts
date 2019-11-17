import { Output, Terminal } from "./interfaces";
import SocialNetworkClient, { User } from ".";

const consoleReading = (input: string): Terminal => ({
  readLine() {
    return input;
  }
});

describe("Testing Social Network Kata", () => {
  let lines: string[];
  let output: Output;

  beforeEach(() => {
    lines = [];
    output = {
      cache: lines,
      writeLine(line: string) {
        lines.push(line);
      },
      println: jest.fn()
    };
  });

  it("should save a new message in the timeline when Alice post a new timeline", () => {
    /**
     * Given the User initialize the command line interface and start the social network
     */
    const alice = new User("Alice");
    const aliceClient = new SocialNetworkClient(alice, output);

    /**
     * When the User write a new message in his/her timeline
     */
    const input = consoleReading("post Hello World!");
    aliceClient.process(input);

    /**
     * Then the user could see the new message added in his/her timeline
     */
    aliceClient.process(consoleReading("timeline"));

    expect(output.println).toHaveBeenCalledWith("Alice (0s ago): Hello World!");
  });

  it("should read the Alice's timeline when Bob ask for her timeline", () => {
    /**
     * Given the Bob initialize the command line interface and start the social network
     * And Alice have some messages in her timeline
     */

    const alice = new User("Alice");
    const aliceClient = new SocialNetworkClient(alice, output);

    const bob = new User("Bob");
    const bobClient = new SocialNetworkClient(bob, output);

    /**
     * When Bob asks for the Alice's timeline
     */
    const input = consoleReading("post Hello World for Bob!");
    aliceClient.process(input);

    /**
     * Then Bob reads the Alice's timeline
     */
    bobClient.process(consoleReading("read timeline Alice"));

    expect(output.println).toHaveBeenCalledWith(
      "Alice (0s ago): Hello World for Bob!"
    );
  });

  it("should follow to Alice and Bob when Charly subscribe to them", () => {
    /**
     * Given the Charly initialize the command line interface and start the social network
     * And Alice and Bob have some messages in her timeline
     */

    const alice = new User("Alice");
    const aliceClient = new SocialNetworkClient(alice, output);

    const bob = new User("Bob");
    const bobClient = new SocialNetworkClient(bob, output);

    const charly = new User("Charly");
    const charlyClient = new SocialNetworkClient(charly, output);

    aliceClient.process(
      consoleReading("post Hello I'm Alice, this is my Timeline")
    );

    bobClient.process(
      consoleReading("post Hello I'm Bob, this is my Timeline")
    );

    /**
     * When charly follow to Alice and Bob's timeline
     */
    charlyClient.process(consoleReading("follow Alice"));
    charlyClient.process(consoleReading("follow Bob"));
    charlyClient.process(consoleReading("get following"));

    /**
     * Then Charly receives a list of all users he follows
     */

    expect(output.println).toHaveBeenCalledWith("Alice");
    expect(output.println).toHaveBeenCalledWith("Bob");
  });
});
