import React, { Component } from "react";
// import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
// import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import {BookListItems, BookList} from "../components/BookList";
import Nav from "../components/Nav";
import Button from "../components/Button";

class Books extends Component {
  state = {
    books: [],
    title: "",
  };

  // componentDidMount() {
  //   this.loadBooks();
  // }

  // loadBooks = () => {
  //   API.getBooks()
  //     .then(res =>
  //       this.setState({ books: res.data, title: ""})
  //     )
  //     .catch(err => console.log(err));
  // };

  // deleteBook = id => {
  //   API.deleteBook(id)
  //     .then(res => this.loadBooks())
  //     .catch(err => console.log(err));
  // };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // handleFormSubmit = event => {
  //   // event.preventDefault();
  //   if (this.state.title) {
  //     API.saveBook({
  //       title: this.state.title,
  //       // author: this.state.author,
  //       // synopsis: this.state.synopsis
  //     })
  //       // .then(res => this.loadBooks())
  //       .catch(err => console.log(err));
  //   }
  // };

  handleSave = booksData => {
    API.saveBook(booksData);
  }

  handleFormSubmit = event => {
    event.preventDefault();
    API.googleBooksPull(this.state.title)
      .then(res => this.setState({ books: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        {/* <Nav /> */}
        <Jumbotron />
        <Container>
          <Row>
            <Col size="md-12">
              <form>
                <Container>
                  <Row>
                    <Col size="xs-9 sm-10">
                      <Input
                        name="title"
                        value={this.state.title}
                        onChange={this.handleInputChange}
                        placeholder="Search for a book"
                      />
                    </Col>
                    <Col size="xs-3 sm-2">
                      <Button
                        onClick={this.handleFormSubmit}
                        type="success"
                        className="input-lg"
                      >
                        Search
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </form>
            </Col>
          </Row>
          <Row>
            <Col size="xs-12">
              {!this.state.books.length ? (
                <h1 className="text-center">No Books to Display</h1>
              ) : (
                <BookList>
                  {this.state.books.map(book => {
                    return (
                      <BookListItems
                        key={book.id}
                        title={book.volumeInfo.title}
                        link={book.volumeInfo.infoLink}
                        authors={book.volumeInfo.authors}
                        description={book.volumeInfo.description}
                        image={book.volumeInfo.imageLinks.thumbnail}
                        handleSave={ () => this.handleSave({
                          title: book.volumeInfo.title,
                          link: book.volumeInfo.infoLink,
                          authors: book.volumeInfo.authors,
                          description: book.volumeInfo.description,
                          image: book.volumeInfo.imageLinks.thumbnail
                        })}
                      />
                    );
                  })}
                </BookList>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Books;
