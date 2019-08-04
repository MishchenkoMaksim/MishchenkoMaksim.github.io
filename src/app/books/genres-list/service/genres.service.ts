import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Genre } from './genre';

@Injectable()
export class GenreService {

    public url = "http://localhost:2403/genres";

    constructor(private http: HttpClient){ }

    public getGenres(){
        let genres = this.http.get(this.url);
            return genres;
    }

    public addGenre(genre: Genre){
        return this.http.post(this.url, genre)
    }

    public deleteGenre(genre){
        return this.http.delete(this.url + "/" + genre.id)
    }
}