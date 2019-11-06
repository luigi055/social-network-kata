import { Message } from "./Message";

interface Output {
  println(line: string): void;
}

export interface Terminal {
  readLine(): string;
  println(message: string): string;
}

type Date = string;

export interface UserInterface {
  name: string;
  timeline: Array<Message>;
}

export interface MessageInterface {
  inputDate: Date;
  message: string;
}


export default class SocialNetworkClient {
  
  constructor(private output: Output, public user: UserInterface) {}

  public process(terminal: Terminal): void {
    const command = terminal.readLine();
    
    const isCommandStartingWith = (commandLine: string) =>
      command.startsWith(commandLine);

    if (isCommandStartingWith("post")) {

      let message = new Message(" (0s ago) ", terminal.readLine().replace("post ", ""));
      this.user.timeline.push(message);

    } else if (isCommandStartingWith("timeline")) {

      this.user.timeline.forEach(messages =>
        this.showTimeline(terminal, messages)
      );
    }
  }

  public showTimeline(terminal: Terminal, messages: Message) {
    
    
    return terminal.println(this.user.name + " " + messages.inputDate + messages.message);
  }
}
