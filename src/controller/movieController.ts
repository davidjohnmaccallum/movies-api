import { Movie, MovieList, MovieActiveRecord } from "../model/Movie";
import { ListOptions } from "../model/ListOptions";
import { MessageGatewayFactory } from "../messagegateway/MessageGatewayFactory";

export async function read(movieId: string): Promise<Movie> {

    try {

        // plogger.startTimer("search");
    
        return await MovieActiveRecord.read(movieId);

        // plogger.logTime("search", req.get("correlationId"));
        
    } catch (err) {
                
        // log error
        
        throw err;

    }    

}

export async function list(pageIndex = 0, pageSize = 10): Promise<MovieList> {

    try {

        // plogger.startTimer("search");

        return await MovieActiveRecord.list(new ListOptions(pageIndex, pageSize));

        // plogger.logTime("search", req.get("correlationId"));

    } catch (err) {
        
        // log error
        
        throw err;

    }

}

export async function _delete(movieId: string): Promise<Movie> {

    try {

        // plogger.startTimer("search");
            
        const deletedMovie = await MovieActiveRecord.delete(movieId);

        const messageGateway = MessageGatewayFactory.instance();
        messageGateway.notifyMovieDeleted(deletedMovie);

        return deletedMovie;

        // plogger.logTime("search", req.get("correlationId"));

    } catch (err) {
        
        // log error
        
        throw err;

    }

}

export async function update(movieId: string, movieData: Movie): Promise<Movie> {

    try {

        // plogger.startTimer("search");
            
        const movie: MovieActiveRecord = await MovieActiveRecord.read(movieId);
        if (!movie) return;
        const toUpdate: MovieActiveRecord = Object.assign(movie, movieData);
        const updatedMovie = await toUpdate.update();

        const messageGateway = MessageGatewayFactory.instance();
        messageGateway.notifyMovieUpdated(updatedMovie);

        return updatedMovie;

        // plogger.logTime("search", req.get("correlationId"));

    } catch (err) {

        // log error

        throw err;

    }

}

export async function create(movieData: Movie): Promise<Movie> {

    try {

        // plogger.startTimer("search");

        const movie: MovieActiveRecord = Object.assign(new MovieActiveRecord(), movieData);
        const createdMovie = await movie.create();
        
        const messageGateway = MessageGatewayFactory.instance();
        messageGateway.notifyMovieCreated(createdMovie);

        return createdMovie;

        // plogger.logTime("search", req.get("correlationId"));

    } catch (err) {

        // log error

        throw err;

    }

}

export async function findOneByTitle(movieTitle: string): Promise<Movie> {

    try {

        // plogger.startTimer("search");
            
        return await MovieActiveRecord.findOneByTitle(movieTitle);

        // plogger.logTime("search", req.get("correlationId"));

    } catch (err) {
        
        // log error

        throw err;

    }

}

export async function findAllByActorName(actorName: string, pageIndex = 0, pageSize = 10): Promise<MovieList> {

    try {

        // plogger.startTimer("search");
            
        return await MovieActiveRecord.findAllByActorName(actorName, new ListOptions(pageIndex, pageSize));

        // plogger.logTime("search", req.get("correlationId"));

    } catch (err) {
        
        // log error

        throw err;

    }

}
