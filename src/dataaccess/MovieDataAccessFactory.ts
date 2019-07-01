import { IMovieDataAccess } from "./IMovieDataAccess";
import { MovieDataAccessMock } from "./MovieDataAccessMock";
import { MovieDataAccess } from "./MovieDataAccess";

export class MovieDataAccessFactory {
    
    static _instance: IMovieDataAccess = new MovieDataAccess();

    /**
     * Used to switch to an in memory mock database for unit testing.
     */
    static enableTestMode() {
        this._instance = new MovieDataAccessMock();
    }

    static instance(): IMovieDataAccess {        
        return this._instance;
    }

}