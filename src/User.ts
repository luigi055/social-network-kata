import { UserInterface, MessageInterface } from ".";

export class User implements UserInterface {

    timeline: Array<MessageInterface> = [];
    
    constructor(public name: string){};
};