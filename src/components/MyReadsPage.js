import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Bookshelf from './Bookshelf'
class MyReadsPage extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    }

    render() {

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

                    <Bookshelf
                        books={currentlyReadingBooks}
                        title={'Currently Reading'}
                        placeholder={'You are no reading any book'}
                        onUpdateBook={this.props.onUpdateBook}/>

                    <Bookshelf
                        books={wantToReadBooks}
                        title={'Want to Read'}
                        placeholder={'You have no books in mind'}
                        onUpdateBook={this.props.onUpdateBook}/>

                    <Bookshelf
                        books={readBooks}
                        title={'Read'}
                        placeholder={'You have\'t read a single book :('}
                        onUpdateBook={this.props.onUpdateBook}/>

                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        );
    }
}

export default MyReadsPage;