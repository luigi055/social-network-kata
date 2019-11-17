import { UserInterface, Output, Terminal } from "./interfaces/index";
import CommandsFactory, { commandDictionary } from "./commands";

export class User implements UserInterface {
  constructor(public name: string = "") {}
}

class SocialNetworkClient {
  private following: User[] = [];
  constructor(private user: UserInterface, private output: Output) {}

  private parseCommand(terminal: Terminal): string {
    const commandUsed = Object.keys(commandDictionary).find(command =>
      terminal.readLine().startsWith(command)
    );

    return commandUsed;
  }

  process(terminal: Terminal) {
    const command = this.parseCommand(terminal);
    const commands = new CommandsFactory().handleCommand(
      this.user,
      this.output
    );

    commands[command].execute(terminal, this.following);
  }
}

export default SocialNetworkClient;
