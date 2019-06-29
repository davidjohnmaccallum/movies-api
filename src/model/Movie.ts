import { ListOptions } from "./ListOptions";
import { MovieDataAccessFactory } from "../dataaccess/MovieDataAccessFactory";

export class Movie {

    _id?: string;
    title: string;
    rated: string;
    released: string;
    runtime: string;
    director: string;
    actors: string[];
    posterLink: string;
    tags: string[];
    createdDate?: Date;
    updatedDate?: Date;

}

export class MovieActiveRecord extends Movie {

    static async read(id: string): Promise<MovieActiveRecord> {
        const dataAccess = MovieDataAccessFactory.instance();
        return await dataAccess.read(id);
    }

    async create(): Promise<MovieActiveRecord> {
        const dataAccess = MovieDataAccessFactory.instance();
        return await dataAccess.create(this);
    }

    async update(): Promise<MovieActiveRecord> {
        const dataAccess = MovieDataAccessFactory.instance();
        return await dataAccess.update(this._id, this);
    }

    static async delete(id: string): Promise<MovieActiveRecord> {
        const dataAccess = MovieDataAccessFactory.instance();
        return await dataAccess._delete(id);
    }

    static async list(listOptions: ListOptions): Promise<MovieList> {
        const dataAccess = MovieDataAccessFactory.instance();
        return await dataAccess.list(listOptions);
    }

    static async findOneByTitle(movieName: string): Promise<MovieActiveRecord> {
        const dataAccess = MovieDataAccessFactory.instance();
        return await dataAccess.findOneByTitle(movieName);
    }

    static async findAllByActorName(actorName: string, listOptions: ListOptions): Promise<MovieList> {
        const dataAccess = MovieDataAccessFactory.instance();
        return await dataAccess.findAllByActorName(actorName, listOptions);
    }

}

export class MovieList {

    data: Movie[];
    total: number;
    page: number;
    totalPages: number;

}