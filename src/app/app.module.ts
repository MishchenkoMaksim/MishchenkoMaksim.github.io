import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorService } from './index';

import { AuthorDeleteComponent } from './author-delete/author-delete.component';
import { AuthorCreateEditComponent } from './author-create-edit/author-create-edit.component';

import { BooksListComponent } from './books/books-list/books-list.component';
import { BookService } from './shared/book.service';
import { BookDeleteComponent } from './books/book-delete/book-delete.component';
import { BookCreateEditComponent } from './books/book-create-edit/book-create-edit.component';
import { GenresComponent } from './books/genres-list/genres.component';
import { GenreService } from './books/genres-list/service/genres.service';

import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    AuthorListComponent,
    AuthorDeleteComponent,
    AuthorCreateEditComponent,
    BooksListComponent,
    BookDeleteComponent,
    BookCreateEditComponent,
    GenresComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [AuthorService, BookService, GenreService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
