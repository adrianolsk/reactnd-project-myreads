import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Bookshelf from './Bookshelf'
import sortBy from 'sort-by'

class MyReadsPage extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    }

    constructor() {
        super();

        this.state = {
            kambanStyle: false,
            shelves: [
                {
                    title: 'Currently Reading',
                    placeholder: 'You are not reading any book',
                    shelf: 'currentlyReading',
                    order: 1,
                    kanbanOrder: 2
                },
                {
                    title: 'Want to Read',
                    placeholder: 'You have no books in mind',
                    shelf: 'wantToRead',
                    order: 2,
                    kanbanOrder: 1
                },
                {
                    title: 'Read',
                    placeholder: 'You haven\'t read a single book? :(',
                    shelf: 'read',
                    order: 3,
                    kanbanOrder: 3
                }
            ]
        }

        this.changeShelvesStyle = this.changeShelvesStyle.bind(this);
    }

    changeShelvesStyle() {
        this.setState((prev) => ({
            kambanStyle: !prev.kambanStyle,
            shelves: prev.shelves.sort(sortBy(prev.kambanStyle ? 'order' : 'kanbanOrder'))
        }));
    }

    render() {
        const {books} = this.props;

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                    <button className="btn-shelf-style" onClick={this.changeShelvesStyle}>Change shelf style</button>
                </div>
                <div className={this.state.kambanStyle ? 'list-books-content kanban' : 'list-books-content'}>
                    {this.state.shelves.map(item => (
                        <Bookshelf
                            key={item.shelf}
                            books={books.filter((book) => book.shelf === item.shelf)}
                            title={item.title}
                            placeholder={item.placeholder}
                            onUpdateBook={this.props.onUpdateBook}/>
                    ))}
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        );
    }
}

export default MyReadsPage;