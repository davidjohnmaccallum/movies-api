import { Movie, MovieList, MovieActiveRecord } from "../model/Movie";
import { ListOptions } from "../model/ListOptions";
import { MessageGatewayFactory } from "../messagegateway/MessageGatewayFactory";
import { LoggerFactory } from "../logger/LoggerFactory";

export async function read(movieId: string): Promise<Movie> {

    const logger = LoggerFactory.instance();

    try {

        logger.debug("movie.read", movieId);

        logger.startTimer("movie.read");

        const result = await MovieActiveRecord.read(movieId);

        logger.logTime("movie.read");

        return result;
        
    } catch (err) {
                
        logger.error("Error reading movie", err);        
        throw err;

    }    

}

export async function list(pageIndex = 0, pageSize = 10): Promise<MovieList> {

    const logger = LoggerFactory.instance();

    try {

        logger.debug("movie.list", {pageIndex, pageSize});

        logger.startTimer("movie.list");

        const result = await MovieActiveRecord.list(new ListOptions(pageIndex, pageSize));

        logger.logTime("movie.list");

        return result;

    } catch (err) {
        
        logger.error("Error listing movies", err);        
        throw err;

    }

}

export async function _delete(movieId: string): Promise<Movie> {

    const logger = LoggerFactory.instance();

    try {

        logger.debug("movie.delete", movieId);

        logger.startTimer("movie.delete");
            
        const deletedMovie = await MovieActiveRecord.delete(movieId);

        const messageGateway = MessageGatewayFactory.instance();
        messageGateway.notifyMovieDeleted(deletedMovie);

        logger.logTime("movie.delete");

        return deletedMovie;

    } catch (err) {
        
        logger.error("Error deleting movie", err);        
        throw err;

    }

}

export async function update(movieId: string, movieData: Movie): Promise<Movie> {

    const logger = LoggerFactory.instance();

    try {

        logger.debug("movie.update", {movieId, movieData});

        logger.startTimer("movie.update");
            
        const movie: MovieActiveRecord = await MovieActiveRecord.read(movieId);
        if (!movie) return;
        const toUpdate: MovieActiveRecord = Object.assign(movie, movieData);
        const updatedMovie = await toUpdate.update();

        const messageGateway = MessageGatewayFactory.instance();
        messageGateway.notifyMovieUpdated(updatedMovie);

        logger.logTime("movie.update");

        return updatedMovie;

    } catch (err) {

        logger.error("Error updating movie", err);        
        throw err;

    }

}

export async function create(movieData: Movie): Promise<Movie> {

    const logger = LoggerFactory.instance();

    try {

        logger.debug("movie.create", movieData);

        logger.startTimer("movie.create");

        const movie: MovieActiveRecord = Object.assign(new MovieActiveRecord(), movieData);
        const createdMovie = await movie.create();
        
        const messageGateway = MessageGatewayFactory.instance();
        messageGateway.notifyMovieCreated(createdMovie);

        logger.logTime("movie.create");

        return createdMovie;

    } catch (err) {

        logger.error("Error creating movie", err);        
        throw err;

    }

}

export async function findOneByTitle(movieTitle: string): Promise<Movie> {

    const logger = LoggerFactory.instance();

    try {

        logger.debug("movie.findOneByTitle", movieTitle);

        logger.startTimer("movie.findOneByTitle");
            
        const result = await MovieActiveRecord.findOneByTitle(movieTitle);

        logger.logTime("movie.findOneByTitle");

        return result;

    } catch (err) {
        
        logger.error("Error finding movie by title", err);
        throw err;

    }

}

export async function findAllByActorName(actorName: string, pageIndex = 0, pageSize = 10): Promise<MovieList> {

    const logger = LoggerFactory.instance();

    try {

        logger.debug("movie.findAllByActorName", {actorName, pageIndex, pageSize});

        logger.startTimer("movie.findAllByActorName");
            
        const result = await MovieActiveRecord.findAllByActorName(actorName, new ListOptions(pageIndex, pageSize));

        logger.logTime("movie.findAllByActorName");

        return result;

    } catch (err) {
        
        logger.error("Error listing movies by actor name", err);
        throw err;

    }

}
