import React, {Component} from 'react';
import * as BooksAPI from '../BooksAPI';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'

class SearchPage extends Component {

    static propTypes = {
        // todo: pass current books and update function
        // onUpdateBook: PropTypes.func.isRequired,
        // currentBooks: PropTypes.array.isRequired
    }

    constructor() {
        super();

        this.state = {
            query: '',
            results: []
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {

    }

    // todo: implement debounce to avoid search while typing
    handleChange(e) {
        event.preventDefault();

        this.setState({
            query: e.target.value.trim()
        });

        if (this.state.query.length > 0) {
            BooksAPI.search(this.state.query, 20)
                .then(response => {
                    let results = response === undefined || response.error || response.length === 0 ? [] : response;
                    results.map(book => {
                        // todo: check if the book is already in a shelf
                    });

                    this.setState({
                        results: results
                    })
                });
        }

    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>

                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.results.map(book => (
                            <div key={book.id} style={{
                                border: 'solid 1px #ccc',
                                padding: '10px',
                                margin: '10px',
                                width: '200px',
                                height: '200px'
                            }}>
                                {book.title}
                            </div>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchPage;