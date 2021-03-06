import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Container, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Cats } from '../../api/cat/Cats';
import CatPublic from '../components/CatPublic';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListCatsPublic extends React.Component {

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
          {this.props.cats.map((cat, index) => <CatPublic
            key={index}
            cat={cat} />)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListCatsPublic.propTypes = {
  cats: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Cats.publicPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const cats = Cats.collection.find({}).fetch();
  return {
    cats,
    ready,
  };
})(ListCatsPublic);
