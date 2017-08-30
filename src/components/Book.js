import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BookshelfChanger from './BookshelfChanger';
class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    }

    constructor() {
        super();

        this.state = {
            shelf: ''
        };
        this.onUpdateBook = this.onUpdateBook.bind(this);
    }

    componentDidMount() {

        this.setState({
            shelf: this.props.book.shelf || ''
        });
    }

    onUpdateBook(shelf) {
        this.setState({
            shelf: shelf
        });
        this.props.onUpdateBook(this.props.book, shelf);
    }


    render() {

        const {shelf} = this.state;
        const {
            title,
            authors,
            imageLinks,
            averageRating = 0,
            ratingsCount = 0
        } = this.props.book;

        return (
            <li>
                <div className="book">
                    <div className="book-top">

                        <div className="book-cover" style={{
                            width: 128,
                            height: 192,
                            backgroundImage: `url(${imageLinks.thumbnail})`
                        }}/>
                        <BookshelfChanger
                            book={this.props.book}
                            onUpdateBook={this.onUpdateBook}
                            shelf={shelf}/>
                    </div>
                    <div className="book-title">{title}</div>
                    <div className="book-authors">{authors}</div>
                    <div className="book-rating">
                        {ratingsCount > 0 ? (
                            <p>{averageRating}/5 ({ratingsCount} votes)</p>
                        ) : 'No ratings'}

                    </div>
                </div>
            </li>
        );
    }
}

export default Book;