import React from "react";
import Thumbnail from "../Thumbnail";
import { Container, Row, Col } from "../Grid";
import Button from "../Button";
// Exporting both RecipeList and RecipeListItem from this file

// RecipeList renders a bootstrap list item
export function BookList({ children }) {
  return <ul className="list-group">{children}</ul>;
}

// RecipeListItem renders a bootstrap list item containing data from the recipe api call
const BookListItems = props => {
  return (
    <li className="list-group-item">
      <Container>
        <Row>
          <Col size="xs-4 sm-2">
            <Thumbnail src={props.thumbnail} />
          </Col>
          <Col size="xs-8 sm-9">
            <h3>{props.title}</h3>
            <p>Author(s): {props.authors.join(', ')}</p>
            <p>Summary: {props.description}</p>
            <a rel="noreferrer noopener" target="_blank" href={props.link}>
              Go to recipe!
            </a>
            <button onClick={props.handleSave} type="button">
                Save</button>
          </Col>
        </Row>
      </Container>
    </li>
  )
}

export {BookListItems}
