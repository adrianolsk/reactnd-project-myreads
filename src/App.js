import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom'
import './App.css'
import SearchPage from './components/SearchPage'
import MyReadsPage from './components/MyReadsPage'

import { Appbar, Button, Container } from 'muicss/react';


class BooksApp extends React.Component {
    state = {
        books: [],
        message: {
            type: '',
            text: '',
            show: false
        }
    }

    constructor() {
        super();
        this.onUpdateBook = this.onUpdateBook.bind(this);
        this.onError = this.onError.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
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

        this.setState(prev => ({
            books: prev.books.filter((b) => b.id !== book.id).concat([book])
        }));
        this.setState({
            message: {
                type: 'success',
                text: 'Saving your book...',
                show: true
            }
        });
        BooksAPI.update(book, shelf)
            .then(response => {
                // Todo: Show success message
                this.onSuccess('Book updated successfuly');
            })
            .catch(err => {
                // Todo: Maybe undo the previous operation on the state
                this.onError('There was a problem while updating your book');
            });

    }


    onError(text) {
        this.setState({
            message: {
                type: 'error',
                text,
                show: true
            }
        });
    }

    //Todo: Extract messages to a component
    onSuccess(text) {
        this.setState({
            message: {
                type: 'success',
                text,
                show: true
            }
        });

        setTimeout(() => {
            this.setState({
                message: {
                    show: false
                }
            });
        }, 4000);
    }

    render() {
        const {books} = this.state;

        return (
            <div className="app">
                <Appbar>
                    <span>MyReads App</span>
                </Appbar>
                <Container>
                    <Route exact path="/" render={() => (
                        <MyReadsPage books={books} onUpdateBook={this.onUpdateBook}/>
                    )}/>
                    <Route path="/search" render={() => (
                        <SearchPage currentBooks={books}
                                    onUpdateBook={this.onUpdateBook}
                                    onError={this.onError}
                        />
                    )}/>
                    {this.state.message.type ? (
                        <div className={`message ${this.state.message.type}`}
                             style={{display: this.state.message.show ? 'block' : 'none'}}>
                            <p>{this.state.message.text}</p>
                        </div>
                    ): ''}

                </Container>
            </div>
        );
    }
}

export
default
BooksApp
