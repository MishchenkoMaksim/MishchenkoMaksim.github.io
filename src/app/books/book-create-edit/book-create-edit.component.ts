import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { GenreService } from '../genres-list/service/genres.service';
import { Genre } from '../genres-list/service/genre';
import { Location } from '@angular/common';

import { BookService, Book } from '../../index';

@Component({
    selector: 'book-create-edit',
    templateUrl: './book-create-edit.component.html'
})

export class BookCreateEditComponent implements OnInit {

    currentBook: Book;
    bookForm: FormGroup;
    genres: Genre[];
    bool: boolean = true;

    constructor(private service: BookService,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private genreService: GenreService,
        private location: Location
    ) { }

    ngOnInit() {
        this.buildForm();
        this.getBookFromRoute();
        this.getGenres();
    }

    getGenres() {
        this.genreService.getGenres().subscribe(
            (genres: any) => this.genres = genres
        )
    }

    checkError(el: string, errorType){
        return this.bookForm.get(el).touched && this.bookForm.get(el).hasError(errorType)
    }

    public onSubmit(bookForm: FormGroup) {

        for(let i = 0; i < this.genres.length; i++){
            let genres = this.genres[i].genre;

            if(bookForm.value.genre == genres){
                this.bool = true;
                this.currentBook.bookName = bookForm.value.bookName;
                this.currentBook.numOfPages = bookForm.value.numOfPages;
                this.currentBook.genre = bookForm.value.genre;

                this.service.editBook(this.currentBook).subscribe(
                    () => this.goBack()
                );
            break;
            } else {
                this.bool = false;
            }
        }
    }

    private getBookFromRoute() {
        this.activatedRoute.params.forEach((params)=> {
            let ID = params['id'];
                if(ID){
                    this.service.getBook(ID).subscribe(
                        book => {this.currentBook = book;
                        this.bookForm.patchValue(this.currentBook);
                    }
                    )
                 } 
                else {
                 this.currentBook = new Book(null, null, null, null, null, null);
                 this.bookForm.patchValue(this.currentBook);
                }
        })
    }
    
    private buildForm() {
        this.bookForm = this.fb.group({
            bookName: ["", Validators.required],
            numOfPages: ["", [Validators.required, Validators.pattern("^[ 0-9]+$")]],
            genre: ["", Validators.required]
        });
    }

    goBack() {
        this.location.back();
    }
}