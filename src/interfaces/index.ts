export interface Output {
  cache: string[];
  readLine(line: string): void;
  printLn(line: string): void;
}

export interface UserInterface {
  name: string;
}

export interface Terminal {
  readLine(): string;
}
