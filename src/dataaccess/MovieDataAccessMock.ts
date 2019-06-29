import { Movie, MovieList, MovieActiveRecord } from "../model/Movie";
import { ListOptions } from "../model/ListOptions";
import { IMovieDataAccess } from "./IMovieDataAccess";
import * as uuid from "uuid";

export class MovieDataAccessMock implements IMovieDataAccess {
    
    async read(id: string): Promise<MovieActiveRecord> {

        const found = this.data.find(movie => movie._id === id);
        if (!found) return;
        return Object.assign(new MovieActiveRecord(), found);

    }   
    
    async create(movie: Movie): Promise<MovieActiveRecord> {

        movie._id = uuid.v1();
        movie.createdDate = new Date();
        this.data.push(movie);
        return Object.assign(new MovieActiveRecord(), movie);

    }
    
    async update(id: string, movie: Movie): Promise<MovieActiveRecord> {
        
        this._delete(id);
        movie._id = id;
        movie.updatedDate = new Date();
        this.data.push(movie);
        return Object.assign(new MovieActiveRecord(), movie);

    }
    
    async _delete(id: string): Promise<MovieActiveRecord> {
        
        const toDelete = this.data.find(it => it._id === id);
        if (!toDelete) return;
        this.data = this.data.filter(it => it._id !== id);
        return Object.assign(new MovieActiveRecord(), toDelete);

    }
    
    async list(listOptions: ListOptions): Promise<MovieList> {

        const dataCopy = [...this.data];
        const result = {
            total: this.data.length,
            totalPages: Math.ceil(this.data.length / listOptions.pageSize),
            page: listOptions.pageIndex,
            data: dataCopy
                .splice(listOptions.pageIndex * listOptions.pageSize, listOptions.pageSize),
        };
        return result;

    }
    
    async findOneByTitle(movieTitle: string): Promise<MovieActiveRecord> {

        const found = this.data.find(movie => movie.title === movieTitle);
        if (!found) return;
        return Object.assign(new MovieActiveRecord(), found);

    }
    
    async findAllByActorName(actorName: string, listOptions: ListOptions): Promise<MovieList> {

        const searchResults = this.data.filter(it => it.actors.includes(actorName));

        const result = {
            total: searchResults.length,
            totalPages: Math.ceil(searchResults.length / listOptions.pageSize),
            page: listOptions.pageIndex,
            data: searchResults
                .splice(listOptions.pageIndex * listOptions.pageSize, listOptions.pageSize),
        };
        
        return result;
        
    }

    private data: Movie[] = [
        {
            "_id": "d50b8e70-1a15-4ae1-a0c4-ec13d1f18768",
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
            "tags": [],
            "createdDate": new Date("2019-06-29T12:24:50.072Z")
        },
        {
            "_id": "0c650da9-e7b2-4bb3-8bec-2f3503542be0",
            "title": "Star Wars: Episode V - The Empire Strikes Back",
            "rated": "PG",
            "released": "20 Jun 1980",
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
        },
        {
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
        },
        {
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
        },
        {
            "_id": "d7caffea-8c2c-43d0-97bd-9999024bb4e7",
            "title": "Star Wars: Episode III - Revenge of the Sith",
            "rated": "PG-13",
            "released": "19 May 2005",
            "runtime": "140 min",
            "director": "George Lucas",
            "actors": [
                "Ewan McGregor",
                "Natalie Portman",
                "Hayden Christensen",
                "Ian McDiarmid"
            ],
            "posterLink": "https://m.media-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_SX300.jpg",
            "tags": [],
            "createdDate": new Date("2019-06-29T12:24:50.125Z")
        },
        {
            "_id": "d6b6a820-2c8e-4555-a96b-fd41b46cefe3",
            "title": "Star Wars: Episode I - The Phantom Menace",
            "rated": "PG",
            "released": "19 May 1999",
            "runtime": "136 min",
            "director": "George Lucas",
            "actors": [
                "Liam Neeson",
                "Ewan McGregor",
                "Natalie Portman",
                "Jake Lloyd"
            ],
            "posterLink": "https://m.media-amazon.com/images/M/MV5BYTRhNjcwNWQtMGJmMi00NmQyLWE2YzItODVmMTdjNWI0ZDA2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
            "tags": [],
            "createdDate": new Date("2019-06-29T12:24:50.128Z")
        },
        {
            "_id": "15040f6f-e3bd-4007-a13e-7fbbe732bbab",
            "title": "Star Wars: Episode II - Attack of the Clones",
            "rated": "PG",
            "released": "16 May 2002",
            "runtime": "142 min",
            "director": "George Lucas",
            "actors": [
                "Ewan McGregor",
                "Natalie Portman",
                "Hayden Christensen",
                "Christopher Lee"
            ],
            "posterLink": "https://m.media-amazon.com/images/M/MV5BMDAzM2M0Y2UtZjRmZi00MzVlLTg4MjEtOTE3NzU5ZDVlMTU5XkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg",
            "tags": [],
            "createdDate": new Date("2019-06-29T12:24:50.132Z")
        },
        {
            "_id": "181f18b5-5812-4efc-9a61-678b546173fa",
            "title": "Star Trek",
            "rated": "PG-13",
            "released": "08 May 2009",
            "runtime": "127 min",
            "director": "J.J. Abrams",
            "actors": [
                "Chris Pine",
                "Zachary Quinto",
                "Leonard Nimoy",
                "Eric Bana"
            ],
            "posterLink": "https://m.media-amazon.com/images/M/MV5BMjE5NDQ5OTE4Ml5BMl5BanBnXkFtZTcwOTE3NDIzMw@@._V1_SX300.jpg",
            "tags": [],
            "createdDate": new Date("2019-06-29T12:24:50.135Z")
        },
        {
            "_id": "acba946b-3804-4606-b05d-73a3454e370d",
            "title": "Star Wars: The Last Jedi",
            "rated": "PG-13",
            "released": "15 Dec 2017",
            "runtime": "152 min",
            "director": "Rian Johnson",
            "actors": [
                "Mark Hamill",
                "Carrie Fisher",
                "Adam Driver",
                "Daisy Ridley"
            ],
            "posterLink": "https://m.media-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_SX300.jpg",
            "tags": [],
            "createdDate": new Date("2019-06-29T12:24:50.139Z")
        },
        {
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
        },
        {
            "_id": "1039435c-9415-44f9-9202-65683ed8dbcc",
            "title": "Solo: A Star Wars Story",
            "rated": "PG-13",
            "released": "25 May 2018",
            "runtime": "135 min",
            "director": "Ron Howard",
            "actors": [
                "Alden Ehrenreich",
                "Joonas Suotamo",
                "Woody Harrelson",
                "Emilia Clarke"
            ],
            "posterLink": "https://m.media-amazon.com/images/M/MV5BOTM2NTI3NTc3Nl5BMl5BanBnXkFtZTgwNzM1OTQyNTM@._V1_SX300.jpg",
            "tags": [],
            "createdDate": new Date("2019-06-29T12:24:57.441Z")
        },
        {
            "_id": "95e08786-f5d7-48ee-9d12-49ae54bb3835",
            "title": "Star Trek: First Contact",
            "rated": "PG-13",
            "released": "22 Nov 1996",
            "runtime": "111 min",
            "director": "Jonathan Frakes",
            "actors": [
                "Patrick Stewart",
                "Jonathan Frakes",
                "Brent Spiner",
                "LeVar Burton"
            ],
            "posterLink": "https://m.media-amazon.com/images/M/MV5BYTllZjRkY2QtYTJlMy00ZTMxLWE0YWQtMWMwYzY2YTM3YzRjXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
            "tags": [],
            "createdDate": new Date("2019-06-29T12:24:57.452Z")
        },
        {
            "_id": "6f03cc9a-f17b-4834-a507-a2cab19dfa41",
            "title": "Star Trek IV: The Voyage Home",
            "rated": "PG",
            "released": "26 Nov 1986",
            "runtime": "119 min",
            "director": "Leonard Nimoy",
            "actors": [
                "William Shatner",
                "Leonard Nimoy",
                "DeForest Kelley",
                "James Doohan"
            ],
            "posterLink": "https://m.media-amazon.com/images/M/MV5BMGY2MDE2MGQtMjczYi00YTdhLWIzNzktNDk2NzMzZmYwMTJjXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
            "tags": [],
            "createdDate": new Date("2019-06-29T12:24:57.474Z")
        },
        {
            "_id": "62dd023c-ffbf-4dcc-9f99-ee595c028a4d",
            "title": "A Star Is Born",
            "rated": "R",
            "released": "05 Oct 2018",
            "runtime": "136 min",
            "director": "Bradley Cooper",
            "actors": [
                "Lady Gaga",
                "Bradley Cooper",
                "Sam Elliott",
                "Andrew Dice Clay"
            ],
            "posterLink": "https://m.media-amazon.com/images/M/MV5BNmE5ZmE3OGItNTdlNC00YmMxLWEzNjctYzAwOGQ5ODg0OTI0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
            "tags": [],
            "createdDate": new Date("2019-06-29T12:24:57.701Z")
        },
        {
            "_id": "a4fa25ca-705b-48d5-a8b4-80e27f8b4b6a",
            "title": "Star Trek Beyond",
            "rated": "PG-13",
            "released": "22 Jul 2016",
            "runtime": "122 min",
            "director": "Justin Lin",
            "actors": [
                "Chris Pine",
                "Zachary Quinto",
                "Karl Urban",
                "Zoe Saldana"
            ],
            "posterLink": "https://m.media-amazon.com/images/M/MV5BZDRiOGE5ZTctOWIxOS00MWQwLThlMDYtNWIwMDQwNzBjZDY1XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
            "tags": [],
            "createdDate": new Date("2019-06-29T12:24:57.704Z")
        },
        {
            "_id": "670061c5-914e-44b7-9985-d0d0916ca728",
            "title": "Star Trek Into Darkness",
            "rated": "PG-13",
            "released": "16 May 2013",
            "runtime": "132 min",
            "director": "J.J. Abrams",
            "actors": [
                "Chris Pine",
                "Zachary Quinto",
                "Zoe Saldana",
                "Karl Urban"
            ],
            "posterLink": "https://m.media-amazon.com/images/M/MV5BMTk2NzczOTgxNF5BMl5BanBnXkFtZTcwODQ5ODczOQ@@._V1_SX300.jpg",
            "tags": [],
            "createdDate": new Date("2019-06-29T12:24:57.707Z")
        },
        {
            "_id": "1df5487b-8f31-4e3d-8760-3f6a865d11ac",
            "title": "Star Trek: The Motion Picture",
            "rated": "G",
            "released": "08 Dec 1979",
            "runtime": "132 min",
            "director": "Robert Wise",
            "actors": [
                "William Shatner",
                "Leonard Nimoy",
                "DeForest Kelley",
                "James Doohan"
            ],
            "posterLink": "https://m.media-amazon.com/images/M/MV5BNzNlMzNlNmQtNmYzNS00YmU5LWIzYWQtMDRkYzIzNzEzOTIyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
            "tags": [],
            "createdDate": new Date("2019-06-29T12:24:57.710Z")
        },
        {
            "_id": "dc393178-9618-4291-87c0-77a83522e00b",
            "title": "Star Trek: The Next Generation",
            "rated": "TV-PG",
            "released": "26 Sep 1987",
            "runtime": "44 min",
            "director": "N/A",
            "actors": [
                "Patrick Stewart",
                "Jonathan Frakes",
                "LeVar Burton",
                "Marina Sirtis"
            ],
            "posterLink": "https://m.media-amazon.com/images/M/MV5BNDViYjAyZWUtNGQxMy00MDUyLTlkZTAtOWNkY2M5ZTk5MTE5XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
            "tags": [],
            "createdDate": new Date("2019-06-29T12:24:57.717Z")
        },
        {
            "_id": "b3d592b8-e7a3-444c-b070-458ca462b693",
            "title": "Star Trek II: The Wrath of Khan",
            "rated": "PG",
            "released": "04 Jun 1982",
            "runtime": "113 min",
            "director": "Nicholas Meyer",
            "actors": [
                "William Shatner",
                "Leonard Nimoy",
                "DeForest Kelley",
                "James Doohan"
            ],
            "posterLink": "https://m.media-amazon.com/images/M/MV5BMzcyYWE5YmQtNDE1Yi00ZjlmLWFlZTAtMzRjODBiYjM3OTA3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
            "tags": [],
            "createdDate": new Date("2019-06-29T12:24:57.718Z")
        },
        {
            "_id": "838b2661-9b5c-4b18-aec9-f0cfcaed95c3",
            "title": "Star Trek: Discovery",
            "rated": "TV-14",
            "released": "24 Sep 2017",
            "runtime": "60 min",
            "director": "N/A",
            "actors": [
                "Sonequa Martin-Green",
                "Doug Jones",
                "Anthony Rapp",
                "Mary Wiseman"
            ],
            "posterLink": "https://m.media-amazon.com/images/M/MV5BOTg5MzA1MjAwNV5BMl5BanBnXkFtZTgwNzAwMDU5NjM@._V1_SX300.jpg",
            "tags": [],
            "createdDate": new Date("2019-06-29T12:24:57.727Z")
        },
        {
            "_id": "fe335d95-910b-4686-8e30-d5bd61e04a3c",
            "title": "Star Trek",
            "rated": "TV-PG",
            "released": "08 Sep 1966",
            "runtime": "50 min",
            "director": "N/A",
            "actors": [
                "Leonard Nimoy",
                "William Shatner",
                "DeForest Kelley",
                "Nichelle Nichols"
            ],
            "posterLink": "https://m.media-amazon.com/images/M/MV5BZTBjNDRiYjQtMGY0Yi00YmY0LWExOTktMDAwNjQ4M2IzMGNlXkEyXkFqcGdeQXVyNjUxOTY5MjI@._V1_SX300.jpg",
            "tags": [],
            "createdDate": new Date("2019-06-29T12:25:02.445Z")
        },
        {
            "_id": "2faa0b7c-501b-44dd-ae6a-12285256c916",
            "title": "Star Trek: Deep Space Nine",
            "rated": "TV-PG",
            "released": "03 Jan 1993",
            "runtime": "45 min",
            "director": "N/A",
            "actors": [
                "Avery Brooks",
                "Rene Auberjonois",
                "Cirroc Lofton",
                "Alexander Siddig"
            ],
            "posterLink": "https://m.media-amazon.com/images/M/MV5BODRkNGI5MWUtODU0MC00MzAyLWI3OTYtNTgwYTdkNTRmNjc2XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
            "tags": [],
            "createdDate": new Date("2019-06-29T12:25:02.451Z")
        },
        {
            "_id": "76f8d329-2a16-4722-8113-73d56f9d0304",
            "title": "Star Trek Generations",
            "rated": "PG",
            "released": "18 Nov 1994",
            "runtime": "118 min",
            "director": "David Carson",
            "actors": [
                "Patrick Stewart",
                "Jonathan Frakes",
                "Brent Spiner",
                "LeVar Burton"
            ],
            "posterLink": "https://m.media-amazon.com/images/M/MV5BNjFiMzc4YzAtNGMzYS00NjI0LWJhYTYtN2JiOTI2ODczYzE3XkEyXkFqcGdeQXVyNTUyMzE4Mzg@._V1_SX300.jpg",
            "tags": [],
            "createdDate": new Date("2019-06-29T12:25:02.673Z")
        },
        {
            "_id": "8c6881b7-ef3b-48e8-8212-5a996560677a",
            "title": "Star Trek: Insurrection",
            "rated": "PG",
            "released": "11 Dec 1998",
            "runtime": "103 min",
            "director": "Jonathan Frakes",
            "actors": [
                "Patrick Stewart",
                "Jonathan Frakes",
                "Brent Spiner",
                "LeVar Burton"
            ],
            "posterLink": "https://m.media-amazon.com/images/M/MV5BNWEzZDI0NjEtY2FkMC00ZjQwLWI2YzgtZDEyMzMwZmRlZDlhXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
            "tags": [],
            "createdDate": new Date("2019-06-29T12:25:02.682Z")
        },
        {
            "_id": "d0fa6325-1788-40ea-8788-da6e65342db2",
            "title": "Star Trek III: The Search for Spock",
            "rated": "PG",
            "released": "01 Jun 1984",
            "runtime": "105 min",
            "director": "Leonard Nimoy",
            "actors": [
                "William Shatner",
                "Leonard Nimoy",
                "DeForest Kelley",
                "James Doohan"
            ],
            "posterLink": "https://m.media-amazon.com/images/M/MV5BMTliZGVjZmMtNzEzMy00MzVhLWFhYjYtNDhlYmViNGNiMGFlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
            "tags": [],
            "createdDate": new Date("2019-06-29T12:25:02.687Z")
        },
        {
            "_id": "6041fc2e-cd20-4095-9d20-a173e9943ad3",
            "title": "Star Trek VI: The Undiscovered Country",
            "rated": "PG",
            "released": "06 Dec 1991",
            "runtime": "110 min",
            "director": "Nicholas Meyer",
            "actors": [
                "William Shatner",
                "Leonard Nimoy",
                "DeForest Kelley",
                "James Doohan"
            ],
            "posterLink": "https://m.media-amazon.com/images/M/MV5BYTM1ZDc0MDEtYjhhMC00ZWFmLThlMTYtOTI2MTdkZDVhODQwXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
            "tags": [],
            "createdDate": new Date("2019-06-29T12:25:02.689Z")
        },
        {
            "_id": "51aae3a0-2f2f-4f20-a345-1837fe83a01c",
            "title": "Star Trek V: The Final Frontier",
            "rated": "PG",
            "released": "09 Jun 1989",
            "runtime": "107 min",
            "director": "William Shatner",
            "actors": [
                "William Shatner",
                "Leonard Nimoy",
                "DeForest Kelley",
                "James Doohan"
            ],
            "posterLink": "https://m.media-amazon.com/images/M/MV5BZTE2NTE0YmYtNTE3YS00NzFmLWJmMDMtZWQ5Njg5NDBmNTFiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
            "tags": [],
            "createdDate": new Date("2019-06-29T12:25:02.691Z")
        },
        {
            "_id": "1eb752aa-e568-43fd-a44e-64156239473e",
            "title": "Star Wars: The Clone Wars",
            "rated": "PG",
            "released": "15 Aug 2008",
            "runtime": "98 min",
            "director": "Dave Filoni",
            "actors": [
                "Matt Lanter",
                "Ashley Eckstein",
                "James Arnold Taylor",
                "Dee Bradley Baker"
            ],
            "posterLink": "https://m.media-amazon.com/images/M/MV5BMTI1MDIwMTczOV5BMl5BanBnXkFtZTcwNTI4MDE3MQ@@._V1_SX300.jpg",
            "tags": [],
            "createdDate": new Date("2019-06-29T12:25:02.695Z")
        },
        {
            "_id": "605c15d3-2d75-4de6-bd8c-1e2e20d6b8c2",
            "title": "Star Trek: Voyager",
            "rated": "TV-PG",
            "released": "16 Jan 1995",
            "runtime": "44 min",
            "director": "N/A",
            "actors": [
                "Kate Mulgrew",
                "Robert Beltran",
                "Roxann Dawson",
                "Robert Duncan McNeill"
            ],
            "posterLink": "https://m.media-amazon.com/images/M/MV5BZDg5NzUxZTctODliNy00MzA2LWE1NjEtMzc0Zjc5NDA1OWFhXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
            "tags": [],
            "createdDate": new Date("2019-06-29T12:25:02.710Z")
        },
        {
            "_id": "8d136a76-a7d7-4dd6-bc48-90d1b308f4ee",
            "title": "Star Trek: Nemesis",
            "rated": "PG-13",
            "released": "13 Dec 2002",
            "runtime": "116 min",
            "director": "Stuart Baird",
            "actors": [
                "Patrick Stewart",
                "Jonathan Frakes",
                "Brent Spiner",
                "LeVar Burton"
            ],
            "posterLink": "https://m.media-amazon.com/images/M/MV5BMjAxNjY2NDY3NF5BMl5BanBnXkFtZTcwMjA0MTEzMw@@._V1_SX300.jpg",
            "tags": [],
            "createdDate": new Date("2019-06-29T12:25:02.711Z")
        }        
    ];

}