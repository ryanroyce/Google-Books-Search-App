import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { Input} from "../components/Form";
import {BookListItems, BookList} from "../components/BookList";
import Button from "../components/Button";

class Books extends Component {
  state = {
    books: [],
    title: "",
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

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
        <Jumbotron>
              <h1>Google Books React Search</h1>
              <p>Search for and save books of interest</p>
            </Jumbotron>
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
                        thumbnail={book.volumeInfo.imageLinks.thumbnail}
                        handleSave={ () => this.handleSave({
                          title: book.volumeInfo.title,
                          link: book.volumeInfo.infoLink,
                          authors: book.volumeInfo.authors,
                          description: book.volumeInfo.description,
                          thumbnail: book.volumeInfo.imageLinks.thumbnail
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
