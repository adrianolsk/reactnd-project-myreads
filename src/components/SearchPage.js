import React, {Component} from 'react';
import * as BooksAPI from '../util/BooksAPI';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import Book from './Book';
import { debounce } from 'throttle-debounce';

class SearchPage extends Component {

    static propTypes = {
        onUpdateBook: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired,
        currentBooks: PropTypes.array.isRequired
    }

    constructor() {
        super();

        this.state = {
            query: '',
            results: []
        };

        this.searchBook = debounce(500, this.searchBook);
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {
        this.searchInput.focus();
    }


    searchBook(searchTerm) {


        if (searchTerm.trim().length > 0) {

            this.setState({
                query: searchTerm.trim()
            });

            BooksAPI.search(this.state.query, 20)
                .then(response => {

                    let results = response === undefined || response.error || response.length === 0 ? [] : response;
                    results.map((book) => {

                        for (let currentBook of this.props.currentBooks) {
                            if (currentBook.id === book.id) {
                                book.shelf = currentBook.shelf;
                                break;
                            }
                        }
                    });

                    this.setState({
                        results: results
                    })
                })
                .catch(err => {
                    this.props.onError("Ops! Something went wrong with your search.");
                });
        }
    }
    handleChange(e) {
        event.preventDefault();
        this.searchBook(e.target.value);
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>

                    <div className="search-books-input-wrapper">
                        <input
                            ref={(input) => {
                                this.searchInput = input;
                            }}
                            type="text"
                            placeholder="Search by title or author"
                            onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.results.map(book => (
                            <Book key={book.id} book={book} onUpdateBook={this.props.onUpdateBook}></Book>

                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchPage;