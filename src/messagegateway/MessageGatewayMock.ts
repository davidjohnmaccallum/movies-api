// I have deliberately left this file blank to save time. In this file
// I would implement IMessageGateway using a real messaging service.

import { IMessageGateway } from "./IMessageGateway";
import { Movie } from "src/model/Movie";

export class MessageGatewayMock implements IMessageGateway {
    
    public static methodsCalled: string[] = [];

    notifyMovieCreated(movie: Movie): void {
        MessageGatewayMock.methodsCalled.push("notifyMovieCreated");
    }    
    
    notifyMovieUpdated(movie: Movie): void {
        MessageGatewayMock.methodsCalled.push("notifyMovieUpdated");
    }
    
    notifyMovieDeleted(movie: Movie): void {
        MessageGatewayMock.methodsCalled.push("notifyMovieDeleted");
    }

}
