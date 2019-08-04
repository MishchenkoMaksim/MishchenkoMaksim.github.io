import { Component, OnInit } from '@angular/core';
import { GenreService } from './service/genres.service';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
    selector: 'genres',
    templateUrl: './genres.component.html'
})

export class GenresComponent implements OnInit{

    genres: string[];
    genreName = '';
    bool: boolean = true;

    constructor(
        private service: GenreService,
        private http: HttpClient,
        private location: Location
    ){}

    ngOnInit() {
        this.getGenres();
    }

    private getGenres() {
        this.service.getGenres().subscribe(
            (genres: any) => this.genres = genres
        )
    }

    private deleteGenre(genre){
        this.service.deleteGenre(genre).subscribe(
            () => this.getGenres()
        )
    }

    private addGenre(value) {
        if(value.match("^[А-Яа-яЁё\s]+$")){

        this.bool = true;

        this.http.post(this.service.url, {
            genre: this.genreName
        }).subscribe(
            () => {this.getGenres(); this.genreName = '';}
        );
        } else{
            this.bool = false;
        }  
    }

    sortGenre(){
        this.genres.sort(function(genre1: any, genre2: any) :any{
            if ( genre1.genre < genre2.genre ){
                return -1;
              }
              if (genre1.genre > genre2.genre ){
                return 1;
              }
              return 0;
        })
    }

    goBack() {
        this.location.back();
    }
}