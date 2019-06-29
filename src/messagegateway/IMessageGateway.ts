import { Movie } from "src/model/Movie";

export interface IMessageGateway {

    notifyMovieCreated(movie: Movie): void;

    notifyMovieUpdated(movie: Movie): void;

    notifyMovieDeleted(movie: Movie): void;

}