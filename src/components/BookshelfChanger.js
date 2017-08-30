import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {shelves} from '../util/Constants';

class BookShelfChanger extends Component {

    static propTypes = {
        onUpdateBook: PropTypes.func.isRequired,
        shelf: PropTypes.string.isRequired
    }

    constructor() {
        super();

        this.state = {
            isOpen: false,
            options: shelves
        };

        this.openMenu = this.openMenu.bind(this);
        this.onSelected = this.onSelected.bind(this);
    }


    openMenu() {
        if (!this.state.isOpen) {
            this.setState({isOpen: true});
        }
    }

    onSelected(shelf) {
        this.setState({isOpen: false});
        this.props.onUpdateBook(shelf);
    }

    render() {

        let {options, isOpen} = this.state;
        let {shelf} = this.props;

        return (
            <button className="book-shelf-changer"
                    onClick={this.openMenu}>

                {!isOpen ? '' : (
                    <div>
                        <ul>
                            <li className="title">Move to...</li>
                            {options.map(option => (
                                <li onClick={() => this.onSelected(option.value)}
                                    value={option.value} className={option.value === shelf ? 'selected' : ''}
                                    key={option.value}>
                                    {option.text}
                                </li>
                            ))}

                        </ul>
                    </div>
                )}

            </button>
        );
    }

}
export default BookShelfChanger;