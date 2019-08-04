import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Author } from './author';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthorService{

    private url = 'http://localhost:2403/authors';

    constructor(private http: HttpClient){ }

    public getAuthors(): Observable<Author[]>{
        let authors = this.http.get(this.url).pipe(
        map(this.extractAuthors));
    return authors;
    }

    public getAuthor(id: string): Observable<Author>{
        let author = this.http.get(this.url + '/' + id).pipe(
            map(this.extractAuthor));
        return author;
    }

    public addAuthor(author: Author){
        return this.http.post(this.url, author)
    }

    public editAuthor(author: Author){
        return this.http.put(this.url + "/" + author.id, author)
    }

    public deleteAuthor(author: Author){
        return this.http.delete(this.url + "/" + author.id)
    }


    private extractAuthors(response) {
        let res = response;
        let authors: Author[] = [];
        for (let i = 0; i < res.length; i++) {
            authors.push(new Author(res[i].id, res[i].firstName, res[i].lastName, res[i].middleName, res[i].dateOfBirth));
        }
        return authors;
    }

    private extractAuthor(response) {
        let res = response;
        let author = new Author(res.id, res.firstName, res.lastName, res.middleName, res.dateOfBirth);
        return author;
    }
}