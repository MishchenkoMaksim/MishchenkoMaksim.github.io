import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './book';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BookService {

    private url = "http://localhost:2403/books";

    constructor(private http: HttpClient){ }

    public getBooks(): Observable<Book[]>{
        let books = this.http.get(this.url).pipe(
            map(this.extractBooks));
            return books;
    }

    public getBook(id: string): Observable<Book>{
        let book = this.http.get(this.url + "/" + id).pipe(
            map(this.extractBook));
            return book;
    }

    public addBook(book: Book){
        return this.http.post(this.url, book)
    }

    public editBook(book: Book){
        return this.http.put(this.url + "/" + book.id, book)
    }

    public deleteBook(book: Book){
        return this.http.delete(this.url + "/" + book.id)
    }

    private extractBooks(response) {
        let res = response;
        let books: Book[] = [];
        for (let i = 0; i < res.length; i++) {
            books.push(new Book(res[i].id, res[i].bookName, res[i].numOfPages, res[i].genre, res[i].id2, res[i].href));
        }
        return books;
    }

    private extractBook(response) {
        let res = response;
        let book = new Book(res.id, res.bookName, res.numOfPages, res.genre, res.id2, res.href);
        return book;
    }
}