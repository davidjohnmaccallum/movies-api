import * as chai from "chai";
const expect = chai.expect;
import * as moviesController from "../src/controller/movieController";
import { Movie } from "../src/model/Movie";
import { MovieDataAccessFactory } from "../src/dataaccess/MovieDataAccessFactory";
import { MessageGatewayFactory } from "../src/messagegateway/MessageGatewayFactory";
import { MessageGatewayMock } from "../src/messagegateway/MessageGatewayMock";

describe("Movies Controller", function() {

    before(function() {
        MovieDataAccessFactory.enableTestMode();
        MessageGatewayFactory.enableTestMode();
    });
    
    it("list", async function () {

        const result = await moviesController.list();

        expect(result.total).to.equal(30);
        expect(result.totalPages).to.equal(3);
        expect(result.page).to.equal(0);
        expect(result.data.length).to.equal(10);
        
    });

    it("list with paging", async function () {

        const result = await moviesController.list(2, 5);

        expect(result.total).to.equal(30);
        expect(result.totalPages).to.equal(6);
        expect(result.page).to.equal(2);
        expect(result.data.length).to.equal(5);

    });

    it("findOneByTitle", async function () {

        const expected: Movie = {
            "_id": "82b23265-08e3-47f9-bc59-abe594ceb05f",
            "title": "Rogue One: A Star Wars Story",
            "rated": "PG-13",
            "released": "16 Dec 2016",
            "runtime": "133 min",
            "director": "Gareth Edwards",
            "actors": [
                "Felicity Jones",
                "Diego Luna",
                "Alan Tudyk",
                "Donnie Yen"
            ],
            "posterLink": "https://m.media-amazon.com/images/M/MV5BMjEwMzMxODIzOV5BMl5BanBnXkFtZTgwNzg3OTAzMDI@._V1_SX300.jpg",
            "tags": [],
            "createdDate": new Date("2019-06-29T12:24:50.142Z")
        };

        const result = await moviesController.findOneByTitle("Rogue One: A Star Wars Story");
        
        expect(result).to.deep.equal(expected);

    });

    it("findAllByActor", async function () {

        const result = await moviesController.findAllByActorName("Harrison Ford");

        expect(result.total).to.equal(4);
        expect(result.data.map(it => it.title).sort()).to.deep.equal([ 
            "Star Wars: Episode IV - A New Hope",
            "Star Wars: Episode VI - Return of the Jedi",
            "Star Wars: Episode V - The Empire Strikes Back",
            "Star Wars: Episode VII - The Force Awakens" 
        ].sort());
        
    });

    it("create", async function() {

        const movieToCreate: Movie = {
            "title": "Star Wars: Episode VII - The Force Awakens",
            "rated": "PG-13",
            "released": "18 Dec 2015",
            "runtime": "136 min",
            "director": "J.J. Abrams",
            "actors": [
                "Harrison Ford",
                "Mark Hamill",
                "Carrie Fisher",
                "Adam Driver"
            ],
            "posterLink": "https://m.media-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SX300.jpg",
            "tags": []
        };

        const totalBeforeCreate = (await moviesController.list()).total;
        const createdMovie = await moviesController.create(movieToCreate);
        const totalAfterCreate = (await moviesController.list()).total;

        // Has the dataset grown by 1
        expect(totalAfterCreate - totalBeforeCreate).to.equal(1);
        // Have all the fields been persisted
        expect(createdMovie).to.deep.include(movieToCreate);
        // Did event get published?
        expect(MessageGatewayMock.methodsCalled).to.include("notifyMovieCreated");      

    });

    it("update", async function () {

        const movieUpdate: Movie = {
            "_id": "0c650da9-e7b2-4bb3-8bec-2f3503542be0",
            "title": "Star Wars: Episode V - The Empire Strikes Back",
            "rated": "PG",
            "released": "20 Jun 1979",
            "runtime": "124 min",
            "director": "Irvin Kershner",
            "actors": [
                "Mark Hamill",
                "Harrison Ford",
                "Carrie Fisher",
                "Billy Dee Williams"
            ],
            "posterLink": "https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
            "tags": [],
            "createdDate": new Date("2019-06-29T12:24:50.074Z")
        };
        
        await moviesController.update(movieUpdate._id, movieUpdate);
        const movieAfterUpdate = await moviesController.read(movieUpdate._id);

        expect(movieAfterUpdate.released).to.equal(movieUpdate.released);
        // Did event get published?
        expect(MessageGatewayMock.methodsCalled).to.include("notifyMovieUpdated");      

    });

    it("read", async function () {

        const expected: Movie = {
            "_id": "ec13115a-e1ed-411f-b21d-d54c7882e567",
            "title": "Star Wars: Episode VI - Return of the Jedi",
            "rated": "PG",
            "released": "25 May 1983",
            "runtime": "131 min",
            "director": "Richard Marquand",
            "actors": [
                "Mark Hamill",
                "Harrison Ford",
                "Carrie Fisher",
                "Billy Dee Williams"
            ],
            "posterLink": "https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
            "tags": [],
            "createdDate": new Date("2019-06-29T12:24:50.090Z")
        };

        const returnedMovie = await moviesController.read(expected._id);

        // Has the correct movie been returned?
        expect(returnedMovie).to.deep.equal(expected);        
        
    });

    it("delete", async function () {

        const expected: Movie = {
            "_id": "6d663049-e120-497e-b108-04606923e798",
            "title": "Star Wars: Episode IV - A New Hope",
            "rated": "PG",
            "released": "25 May 1977",
            "runtime": "121 min",
            "director": "George Lucas",
            "actors": [
                "Mark Hamill",
                "Harrison Ford",
                "Carrie Fisher",
                "Peter Cushing"
            ],
            "posterLink": "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
            "tags": [],
            "createdDate": new Date("2019-06-29T12:24:50.124Z")
        };

        const totalBeforeCreate = (await moviesController.list()).total;
        const deletedMovie = await moviesController._delete(expected._id);
        const totalAfterCreate = (await moviesController.list()).total;
        const tryRead = await moviesController.read(expected._id);

        // Has the dataset shrunk by 1
        expect(totalBeforeCreate - totalAfterCreate).to.equal(1);

        // Test return value
        expect(deletedMovie).to.deep.equal(expected);        

        // Was the correct movie deleted?
        expect(tryRead).to.be.undefined;
        // Did event get published?
        expect(MessageGatewayMock.methodsCalled).to.include("notifyMovieDeleted");      

    });

});