import React from 'react';
import { BackTop } from 'antd';
import Header from './Header';
import LoadingSpinner from './LoadingSpinner';
import ItineraryCards from'./ItineraryCards';
import './Itinerary.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSuitcase} from '@fortawesome/free-solid-svg-icons'
import { MehOutlined } from '@ant-design/icons';

const TRELLO_API_ROOT = 'https://api.trello.com/1';
const TRELLO_KEY = process.env.REACT_APP_TRELLO_KEY;
const TRELLO_TOKEN = process.env.REACT_APP_TRELLO_TOKEN;
const ACCENT_COLOR_KEY = 'si_accent_color';

class Itinerary extends React.Component {
  state = {
    isLoading: true,
    itinerary: {},
    error: null,
    accentColor: '#E1474A',
  }

  componentDidMount() {
    const boardShortLink = this.props.match.params.boardShortLink;
    this.fetchItinerary(boardShortLink);
  }

  updateAccentColor(accentColor){
    this.setState({accentColor});

    // Setting the selected color into local storage.
    const itineraryColorKey = ACCENT_COLOR_KEY + '_' + this.state.itinerary.shortLink;
    localStorage.setItem(itineraryColorKey, accentColor);
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

          // Checking if there's a selected accent color available yet.
          const itineraryColorKey = ACCENT_COLOR_KEY + '_' + itinerary.shortLink;
          const accentColor = localStorage.getItem(itineraryColorKey);
          if (accentColor) this.setState({accentColor});

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
              return fetch(`${TRELLO_API_ROOT}/boards/${boardId}?cards=visible&card_customFieldItems=true&key=${TRELLO_KEY}&token=${TRELLO_TOKEN}&attachments=true&attachment_fields=all`);
            })
            .then((response) => response.json())
            .then((data) => {
              // Getting the cards that have a cover ID for us to fetch the image.
              const cardsWithCovers = data.cards.filter((item, i) => {
                return item.cover.idAttachment;
              });

              // Creating our batched request array for fetching cover urls. 
              const batchedUrls = [];
              let batch = [];

              for (let i = 0; i < cardsWithCovers.length; i++) {
                // if it's the 10th item, add array to batchedUrls and reset the batch array.
                const url = `/cards/${cardsWithCovers[i].id}/attachments/${cardsWithCovers[i].cover.idAttachment}`;
                batch.push(url);
                // If we have our max 10 request urls, or it's the last item, push the request url group and reset batch array.
                if (batch.length === 10 || i === cardsWithCovers.length - 1) {
                  batchedUrls.push(batch);
                  batch = [];
                }
              }

              let requests = batchedUrls.map((urls) => {
                return fetch(`${TRELLO_API_ROOT}/batch?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}&urls=${urls}`)
              });

              Promise.all(requests)
                .then(responses => Promise.all(responses.map(res => res.json())))
                .then(batchedData => {

                  // Combine the batched array responses into a single array.
                  const mergedCardsWithCovers = [].concat.apply([], batchedData);

                  data.cards.forEach((card) => {
                    // Finding which list the card goes and putting it into that list.
                    const list = itinerary.lists.find((item) => {
                      return item.id === card.idList
                    });

                    // Finding the card cover image url and adding it to the card.
                    const cover = mergedCardsWithCovers.find((cardWithCover) => {
                      return card.cover.idAttachment === cardWithCover[200].id;
                    });
                    if (cover) card.cover.url = cover[200].url;
              
                    // Mapping the custom field name to the custom field value.
                    card.customFieldItems.map((fieldItem) => {
                      const matchingCustomField = customFields.find((field) => {
                        return field.id === fieldItem.idCustomField
                      });
                      if (matchingCustomField) fieldItem.name = matchingCustomField.name;
                      return fieldItem;
                    });
              
                    list.cards.push(card);
                  });

                  console.log('itinerary', itinerary)

                  this.setState({
                    itinerary,
                    isLoading: false,
                  });
                });
          
            })
            .catch(error => this.setState({ error, isLoading: false }));
        } else {
          this.setState({ error: 'Sorry, no board found.', isLoading: false })
        }
      })
      .catch((error) => this.setState({ error: 'Sorry, no board found.', isLoading: false }));
  }

  render() {
    const { isLoading, itinerary, error, accentColor } = this.state;
    const isData = itinerary.id;
    return (
      <div className="App">
          <BackTop />
          
          {!error && !isLoading && isData &&
            <Header headerImages={itinerary.prefs.backgroundImageScaled} 
                    backgroundColor={itinerary.prefs.backgroundTopColor}
                    title={itinerary.name} 
                    lists={itinerary.lists} 
                    accentColor={this.state.accentColor}
                    handleColorUpdated={(hex) => this.updateAccentColor(hex)}/>
          }

          <main className="itinerary-content">

            {!error && !isLoading && isData &&
              <div>
                <div className="itinerary-start-circle" style={{backgroundColor: accentColor}}>
                  <FontAwesomeIcon icon={faSuitcase} color="white" />
                </div>

                <div className="itinerary-lists">
                  {itinerary.lists.map(list => {
                    return (
                      <div key={list.id} className="itinerary-list">
                        <div className="itinerary-list-circle" style={{borderColor: accentColor}}></div>
                          <h2 className="itinerary-list-name" style={{color: accentColor}}>{list.name}</h2>
                          <ItineraryCards cards={list.cards} accentColor={accentColor} />
                      </div>
                    );
                  })}
                </div>
              </div>
            }

          </main>

          {error && 
            <p className="error-message">{error} &nbsp; <MehOutlined style={{fontSize: '30px'}}/></p> 
          }

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
