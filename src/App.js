import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom'
import './App.css'
import SearchPage from './components/SearchPage'
import MyReadsPage from './components/MyReadsPage'

class BooksApp extends React.Component {
    state = {
        books: []
    }

    constructor() {
        super();
        this.onUpdateBook = this.onUpdateBook.bind(this);
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({
                books
            });
        })
    }

    onUpdateBook(book, shelf) {
        book.shelf = shelf;

        // todo: implement optimistic UI, set the state first, save and update state if fail
        BooksAPI.update(book, shelf)
            .then(response => {
                this.setState(prev => ({
                    books: prev.books.filter((b) => b.id !== book.id).concat([book])
                }))
            });

    }

    render() {
        const {books} = this.state;

        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <MyReadsPage books={books} onUpdateBook={this.onUpdateBook}></MyReadsPage>
                )}/>
                <Route path="/search" render={() => (
                    <SearchPage currentBooks={books} onUpdateBook={this.onUpdateBook}></SearchPage>
                )}/>
            </div>
        );
    }
}

export default BooksApp
