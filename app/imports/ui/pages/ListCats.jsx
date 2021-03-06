import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Container, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Cat from '../components/Cat';
import { Cats } from '../../api/cat/Cats';
import { Notes } from '../../api/note/Notes';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListCats extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">Registered Cats 🐾</Header>
        <Card.Group centered>
          {this.props.cats.map((cat, index) => <Cat
            key={index}
            cat={cat}
            notes={this.props.notes.filter(note => (note.catId === cat._id))}/>)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListCats.propTypes = {
  cats: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  notes: PropTypes.array.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Cats.userPublicationName);
  const subscription2 = Meteor.subscribe(Notes.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Stuff documents
  const cats = Cats.collection.find({}).fetch();
  const notes = Notes.collection.find({}).fetch();
  return {
    cats,
    ready,
    notes,
  };
})(ListCats);
