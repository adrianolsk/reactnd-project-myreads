import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';

class MyReadsPage extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    }

    render() {
        // todo: create BookShelf component
        // todo: improve loading message

        const {books} = this.props;
        const wantToReadBooks = books.filter((book) => book.shelf === "wantToRead");
        const currentlyReadingBooks = books.filter((book) => book.shelf === "currentlyReading");
        const readBooks = books.filter((book) => book.shelf === "read");

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {currentlyReadingBooks.length == 0 ? (<p>You are no reading any book</p>) : ''}

                                    {currentlyReadingBooks.map(book => (
                                        <Book key={book.id} book={book} onUpdateBook={this.props.onUpdateBook}></Book>
                                    ))}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {wantToReadBooks.length == 0 ? (<p>You have no books in mind</p>) : ''}

                                    {wantToReadBooks.map(book => (
                                        <Book key={book.id} book={book} onUpdateBook={this.props.onUpdateBook}></Book>
                                    ))}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {readBooks.length == 0 ? (<p>You have't read a single book :(</p>) : ''}

                                    {readBooks.map(book => (
                                        <Book key={book.id} book={book} onUpdateBook={this.props.onUpdateBook}></Book>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        );
    }
}

export default MyReadsPage;