export interface Output {
  cache: string[];
  println(line: string): void;
  writeLine(line: string): void;
}

export interface UserInterface {
  name: string;
}

export interface Terminal {
  readLine(): string;
}
