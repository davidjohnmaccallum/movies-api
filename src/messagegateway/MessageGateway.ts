/**
 * In a real application the message gateway (eg AWS SNS or RabbitMQ)
 * code would go here. To save time and make the example easier to 
 * run I have left this out.
 */

import { MessageGatewayMock } from "./MessageGatewayMock";

export class MessageGateway extends MessageGatewayMock {}