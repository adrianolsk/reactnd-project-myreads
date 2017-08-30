import React, {Component} from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class Bookshelf extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
        onUpdateBook: PropTypes.func.isRequired
    }

    render() {

        let {books, title, placeholder = 'No books'} = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title} ({books.length})</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.length === 0 ? (<p>{placeholder}</p>) : ''}

                        {books.map(book => (
                            <Book key={book.id} book={book} onUpdateBook={this.props.onUpdateBook}/>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Bookshelf;