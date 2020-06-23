import React from 'react';
import Header from './Header';
import LoadingSpinner from './LoadingSpinner';
import './Itinerary.css';
import { Row, Col, Divider } from 'antd';

const TRELLO_API_ROOT = 'https://api.trello.com/1';
const TRELLO_KEY = process.env.REACT_APP_TRELLO_KEY;
const TRELLO_TOKEN = process.env.REACT_APP_TRELLO_TOKEN;

class Itinerary extends React.Component {
  state = {
    isLoading: true,
    itinerary: {},
    error: null
  }

  componentDidMount() {
    const boardShortLink = this.props.match.params.boardShortLink;
    this.fetchItinerary(boardShortLink);
  }

  fetchItinerary(boardShortLink) {
    let boardId = null;
    let itinerary = null;
    let customFields = [];

    fetch(`${TRELLO_API_ROOT}/members/me/boards?fields=name,url,prefs,cards,shortLink&key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`)
      .then(response => response.json())
      .then((data) => {

        itinerary = data.find((item) => {
          return item.shortLink === boardShortLink;
        })

        if (itinerary.id) {
          boardId = itinerary.id;
          fetch(`${TRELLO_API_ROOT}/boards/${boardId}/lists?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`)
            .then((response) => response.json())
            .then((data) => {
              // board card info
              itinerary.lists = data;
              itinerary.lists.forEach((item) => {
                // Adding a place to push cards assigned to the list for the next fetch.
                item.cards = [];
              });
          
              return fetch(`${TRELLO_API_ROOT}/boards/${boardId}/customFields?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`)
            })
            .then((response) => response.json())
            .then((data) => {
              // Getting custom field data so that we can map the field name.
              customFields = data;
              // Get the cards and map them to their assigned list.
              return fetch(`${TRELLO_API_ROOT}/boards/${boardId}?cards=all&card_customFieldItems=true&key=${TRELLO_KEY}&token=${TRELLO_TOKEN}&attachments=true`);
            })
            .then((response) => response.json())
            .then((data) => {
              data.cards.forEach((card, i) => {
                // Finding which list the card goes and putting it into that list.
                const list = itinerary.lists.find((item) => {
                  return item.id === card.idList
                } );
          
                // Mapping the custom field name to the custom field value.
                card.customFieldItems.map((fieldItem) => {
                  const matchingCustomField = customFields.find((field) => {
                    return field.id === fieldItem.idCustomField
                  });
          
                  if (matchingCustomField) {
                    fieldItem.name = matchingCustomField.name;
                  }
          
                  return fieldItem;
                });
          
                list.cards.push(card);
              });

              console.log('itinerary', itinerary)
          
              this.setState({
                itinerary,
                isLoading: false,
              })
            })
            .catch(error => this.setState({ error, isLoading: false }));
        } else {
          this.setState({ error: 'No board found', isLoading: false })
        }
      })
      .catch((error) => this.setState({ error: 'No board found', isLoading: false }));
  }

  render() {
    const { isLoading, itinerary, error } = this.state;
    const isData = itinerary.id;
    return (
      <div className="App">

          {!error && !isLoading && isData &&
            <Header headerImages={itinerary.prefs.backgroundImageScaled} 
                    backgroundColor={itinerary.prefs.backgroundTopColor}
                    title={itinerary.name} />
          }

          <main className="itinerary-content">
            {!error && !isLoading && isData && (
              itinerary.lists.map(list => {
                return (
                  <div key={list.id}>
                    <p>Name: {list.name}</p>
                    <Divider />
                  </div>
                );
              })
            )}
          </main>

            {error ? <p>{error}</p> : null}

            {!error && isLoading &&
              <div className="loading-spinner">
                <LoadingSpinner isLoading={true} />
              </div>
            }

      </div>
    )
  }

}

export default Itinerary;
