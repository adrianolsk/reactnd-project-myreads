import React, {Component} from 'react';
import PropTypes from 'prop-types';

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
        console.log('Book componentDidMount');
    }

    onUpdateBook(e) {
        this.setState({
            shelf: e.target.value
        });
        this.props.onUpdateBook(this.props.book, e.target.value);
    }



    render() {

        const {shelf} = this.state;
        const {
            title,
            authors,
            imageLinks
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
                        <div className="book-shelf-changer">
                            <select value={shelf} onChange={this.onUpdateBook}>
                                <option value="" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{title}</div>
                    <div className="book-authors">{authors}</div>
                </div>
            </li>
        );
    }
}

export default Book;