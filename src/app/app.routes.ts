import { Routes } from '@angular/router';
import { AuthorListComponent } from '../app/author-list/author-list.component';
import { AuthorDeleteComponent } from './author-delete/author-delete.component';
import { AuthorCreateEditComponent } from './author-create-edit/author-create-edit.component';
import { BooksListComponent } from './books/books-list/books-list.component';
import { BookDeleteComponent } from './books/book-delete/book-delete.component';
import { BookCreateEditComponent } from './books/book-create-edit/book-create-edit.component';
import { GenresComponent } from './books/genres-list/genres.component';

export const routes: Routes = [
    {path: "", redirectTo: "authors", pathMatch: 'full'},
    {path: 'authors', component: AuthorListComponent},
    {path: 'authors/delete/:id', component: AuthorDeleteComponent},
    {path: 'authors/create', component: AuthorCreateEditComponent},
    {path: 'authors/edit/:id', component: AuthorCreateEditComponent},
    {path: "authors/:id/bookslist", component: BooksListComponent},
    {path: "authors/:id/bookslist/delete/:id", component: BookDeleteComponent},
    {path: "authors/:id/bookslist/create", component: BookCreateEditComponent},
    {path: "authors/:id/bookslist/edit/:id", component: BookCreateEditComponent},
    {path: "authors/:id/bookslist/genres", component: GenresComponent}
]