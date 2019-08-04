import { Component, OnInit } from '@angular/core';
import { Book, AuthorService, Author } from '../../index';
import { HttpClient } from '@angular/common/http';
import { BookService } from '../../shared/book.service';
import { GenreService } from '../genres-list/service/genres.service';
import { Genre } from '../genres-list/service/genre';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'book-list',
    templateUrl: './books-list.component.html'
})

export class BooksListComponent implements OnInit{

    books: Book[];
    genres: Genre[];
    id = this.activatedRoute.snapshot.params['id'];
    author: Author;
    addBookForm: FormGroup;

    bool: boolean = true;


    constructor(private service: BookService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private http: HttpClient,
        private fb: FormBuilder,
        private genreService: GenreService,
        private authorService: AuthorService
    ){ }

    ngOnInit() {
        this.getBooks();
        this.getGenres();
        this.getAuthors();
        this.buildForm();
    }

    checkError(el: string, errorType){
        return this.addBookForm.get(el).touched && this.addBookForm.get(el).hasError(errorType)
    }

    private getBooks() {
        this.service.getBooks().subscribe(
            products => this.books = products
            );
    }

    private getAuthors() {
        this.authorService.getAuthor(this.id).subscribe(
            author => this.author = author
        )
    }

    private getGenres() {
        this.genreService.getGenres().subscribe(
            (genres: any) => this.genres = genres
        )
    }

    public deleteBook(book: Book) {
        this.router.navigate(["authors", this.id, "bookslist", "delete", book.id]);
    }

    public editBook(book: Book){
        this.router.navigate(["authors", this.id, "bookslist", "edit", book.id]);
    }

    public editGenres(){
        this.router.navigate(["authors", this.id, "bookslist", "genres"]);
    }

    onSubmit(addBookForm: FormGroup){
        for(let i = 0; i < this.genres.length; i++){
            if(addBookForm.value.genre == this.genres[i].genre){
                this.bool = true;
                this.http.post("http://localhost:2403/books", {
                bookName: addBookForm.value.bookName,
                numOfPages: addBookForm.value.numOfPages,
                genre: addBookForm.value.genre,
                id2: this.id,
                href: this.activatedRoute.snapshot.url.join('/')
            }).subscribe(
                () => {this.getBooks(); this.buildForm();}
            )
            break;
            } else {
                this.bool = false;
            }
        } 
    }

    sortBName(){
        this.books.sort(function(book1: any, book2: any) :any{
            if ( book1.bookName < book2.bookName ){
                return -1;
              }
              if ( book1.bookName > book2.bookName ){
                return 1;
              }
              return 0;
        })
    }

    sortNumOfPages(){
        this.books.sort(function(book1: any, book2: any) :any{
            if ( book1.numOfPages < book2.numOfPages ){
                return -1;
              }
              if ( book1.numOfPages > book2.numOfPages ){
                return 1;
              }
              return 0;
        })
    }

    sortGenreInTable(){
        this.books.sort(function(book1: any, book2: any) :any{
            if ( book1.genre < book2.genre ){
                return -1;
              }
              if (book1.genre > book2.genre ){
                return 1;
              }
              return 0;
        })
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

    private buildForm() {
        this.addBookForm = this.fb.group({
            bookName: ["", Validators.required],
            numOfPages: [null, [Validators.required, Validators.pattern("^[ 0-9]+$")]],
            genre: ["", Validators.required]
        });
    }

}