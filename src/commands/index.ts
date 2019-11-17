import { User } from "./../index";
import { Output, UserInterface, Terminal } from "./../interfaces/index";
import {
  POST,
  READ_TIMELINE,
  TIMELINE,
  FOLLOW,
  GET_FOLLOWING
} from "./constants";

export const commandDictionary = {
  [POST]: POST,
  [READ_TIMELINE]: READ_TIMELINE,
  [TIMELINE]: TIMELINE,
  [FOLLOW]: FOLLOW,
  [GET_FOLLOWING]: GET_FOLLOWING
};

export default class CommandsFactory {
  public handleCommand(user: UserInterface, output: Output): object {
    return {
      [POST]: new PostCommand(user, output),
      [READ_TIMELINE]: new ReadTimeLineCommand(user, output),
      [TIMELINE]: new PersonalTimeline(user, output),
      [FOLLOW]: new FollowUser(output),
      [GET_FOLLOWING]: new GetFollowingUsers(output)
    };
  }
}

class PostCommand {
  constructor(private user: UserInterface, private output: Output) {}

  execute(terminal: Terminal) {
    this.output.writeLine(
      `${this.user.name} (${"0s ago"}): ${terminal
        .readLine()
        .replace("post ", "")}`
    );
  }
}

class ReadTimeLineCommand {
  constructor(private user: UserInterface, private output: Output) {}

  execute(terminal: Terminal) {
    const command = terminal.readLine();
    const readTimeline = this.output.cache.filter(message =>
      command.endsWith(command.split(" ")[2])
    );
    for (let message of readTimeline) {
      this.output.println(message);
    }
  }
}

class PersonalTimeline {
  constructor(private user: UserInterface, private output: Output) {}

  execute() {
    const readTimeline = this.output.cache.filter(message =>
      message.startsWith(this.user.name)
    );
    for (let message of readTimeline) {
      this.output.println(message);
    }
  }
}

class FollowUser {
  constructor(private output: Output) {}

  execute(terminal: Terminal, followingUsers?: UserInterface[]) {
    const command = terminal.readLine();
    const userName = command.split(" ")[1];

    followingUsers.push(new User(userName));

    this.output.println(`You're now following to ${userName}`);
  }
}

class GetFollowingUsers {
  constructor(private output: Output) {}

  execute(terminal: Terminal, followingUsers?: UserInterface[]) {
    for (const user of followingUsers) {
      this.output.println(user.name);
    }
  }
}
