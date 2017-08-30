import renderer from 'react-test-renderer';
import React from 'react';
import { shallow, mount } from 'enzyme';
import Book from "../../components/Book";


describe('Book', () => {
    let book, wrapper, mounted;
    let onUpdateBook = (book) => {
        console.log('book', book);
    }

    beforeAll(() => {
        book = {
            title: 'Book One',
            subtitle: 'A Subtitle',
            authors: ['Author One', 'Author Two'],
            imageLinks: {thumbnail: 'http://book-cover.jpg'},
            id: 'xpto123',
            shelf: 'wantToRead'
        };


        wrapper = shallow(
            <Book book={book} onUpdateBook={onUpdateBook}/>
        );

        mounted = mount(<Book book={book} onUpdateBook={onUpdateBook}/>
        );
    });


    it("should show the book's title", () => {
        expect(mounted.text().includes(book.title)).toBe(true);
    });

    it("should show all the book's authors", () => {
        book.authors.forEach(author => {
            expect(mounted.text().includes(author)).toBe(true);
        });
    });

});