import { IMessageGateway } from "./IMessageGateway";
import { MessageGateway } from "./MessageGateway";
import { MessageGatewayMock } from "./MessageGatewayMock";

export class MessageGatewayFactory {
    
    static _instance: IMessageGateway = new MessageGateway();

    /**
     * Used to switch to a mock message gateway for unit testing.
     */
    static enableTestMode() {
        this._instance = new MessageGatewayMock();
    }

    static instance(): IMessageGateway {
        return this._instance;
    }

}