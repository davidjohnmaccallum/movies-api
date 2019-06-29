import { IMovieDataAccess } from "./IMovieDataAccess";
import { MovieDataAccessMock } from "./MovieDataAccessMock";
import { MovieDataAccess } from "./MovieDataAccess";

export class MovieDataAccessFactory {
    
    static _instance: IMovieDataAccess = new MovieDataAccess();

    static enableTestMode() {
        this._instance = new MovieDataAccessMock();
    }

    static instance(): IMovieDataAccess {        
        return this._instance;
    }

}