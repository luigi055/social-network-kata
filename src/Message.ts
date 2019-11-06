import { UserInterface, MessageInterface } from ".";

export class Message implements MessageInterface {

    constructor(public inputDate: string, public message: string){};
};