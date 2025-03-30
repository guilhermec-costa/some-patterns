/*
    The pattern restricts direct communications between dependent objects and forces them to collaborate only via a mediator object.
    Ex: a checkbox in the UI, that contains some business logic, and when checked, triggers a hidden text box.
    Doing this, the checkbox is not reusable, because it is coupled to the business logic, and it is coupled to the text box as well
    So, it is not possible to reuse the same checkbox in other components that does not need that same business logic and the same text field

    These components must collaborate indirectly, 
    by calling a special mediator object that redirects the calls to appropriate components
    As a result, the components depend only on a single mediator class instead of being coupled to dozens of their colleagues.

    Without the mediador, each component would contain code about the communication with the other component
    This code is not extensible at all, not reusable, causing code duplication and coupling

    The fewer dependencies a class has, the easier it becomes to modify, extend or reuse that class.
*/

class User {
    private name: string;
    private chatRoom: ChatRoom;

    constructor(name: string, chatRoom: ChatRoom) {
        this.name = name;
        this.chatRoom = chatRoom;
    }

    public sendMessage(message: string) {
        this.chatRoom.sendMessage(this, message);
    }

    public receiveMessage(message: string, from: User) {
        console.log(`${this.name} received a message from ${from.getName()}: ${message}`);
    }

    public getName() {
        return this.name;
    }
}

interface ChatRoom {
    sendMessage(user: User, message: string): void;
}

class OnlineChatRoom implements ChatRoom {
    private users: User[] = [];

    public addUser(user: User) {
        this.users.push(user);
    }

    public sendMessage(user: User, message: string): void {
        this.users.forEach((u) => {
            if (u !== user) {
                u.receiveMessage(message, user);
            }
        })
    }
}

export function execute() {
    const chatRoom = new OnlineChatRoom();
    const user1 = new User("Alice", chatRoom);
    const user2 = new User("Bob", chatRoom);
    const user3 = new User("Charlie", chatRoom);
    
    chatRoom.addUser(user1);
    chatRoom.addUser(user2);
    chatRoom.addUser(user3);

    user1.sendMessage("Hey Gui!");
    user2.sendMessage("Hey Shoyou!");
    user3.sendMessage("Hey Churros");
}
