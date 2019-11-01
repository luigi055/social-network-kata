interface Output {
  println(line: string): void;
}

export interface Terminal {
  readLine(): string;
}

export default class SocialNetworkClient {
  constructor(private output: Output) {}
  private storage: string[] = [];

  public process(terminal: Terminal): void {
    const command = terminal.readLine();
    const isCommandStartingWith = (commandLine: string) =>
      command.startsWith(commandLine);

    if (isCommandStartingWith("post")) {
      this.storage.push(command.replace("post", "Alice"));
    } else if (isCommandStartingWith("timeline")) {
      const messageFilteredByUserName = this.storage.filter(message =>
        message.startsWith("Alice")
      );

      messageFilteredByUserName.forEach(message => {
        this.output.println(message);
      });
    }
  }
}
