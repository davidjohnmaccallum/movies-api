import { Movie, MovieList, MovieActiveRecord } from "../model/Movie";
import { ListOptions } from "../model/ListOptions";

export interface IMovieDataAccess {

    read(id: string): Promise<MovieActiveRecord>;
    
    create(movie: Movie): Promise<MovieActiveRecord>;
    
    update(id: string, movie: Movie): Promise<MovieActiveRecord>;
    
    _delete(id: string): Promise<MovieActiveRecord>;
    
    list(listOptions: ListOptions): Promise<MovieList>;
    
    findOneByTitle(movieTitle: string): Promise<MovieActiveRecord>;
    
    findAllByActorName(actorName: string, listOptions: ListOptions): Promise<MovieList>;
    
}