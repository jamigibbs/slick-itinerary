import React, { useState, useEffect } from 'react';
import { BackTop } from 'antd';
import { isLocalHost, isProduction } from '../../utils';
import ReactGA from 'react-ga';
import Header from '../Header';
import LoadingSpinner from '../LoadingSpinner';
import ItineraryCards from'../ItineraryCards';
import './Itinerary.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSuitcase} from '@fortawesome/free-solid-svg-icons'
import { MehOutlined } from '@ant-design/icons';
import { ACCENT_COLOR_KEY } from '../../constants';

const Itinerary = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [itinerary, setItinerary] = useState({});
  const [error, setError] = useState(null);
  const [accentColor, setAccentColor] = useState('#E1474A');

  useEffect(() => {
    // const { props } = myProps;
    const boardShortLink = props.props.match.params.boardShortLink;
    setIsLoading(true);
    fetchBoardItinerary(boardShortLink);
  }, []);

  const fetchBoardItinerary = (boardShortLink) => {
    fetch(`/api/board/${boardShortLink}`)
      .then((response) => response.json())
      .then((itinerary) => {
        if (isLocalHost) console.log('itinerary', itinerary);
        
        const itineraryColorKey = ACCENT_COLOR_KEY + '_' + itinerary.shortLink;
        const accentColor = localStorage.getItem(itineraryColorKey);
        if (accentColor) {
          setAccentColor(accentColor);
        }

        setItinerary(itinerary);
        setIsLoading(false);
      })
      .catch((error) => setError(error));
  }

  const handleLoadingIndicator = (bool) => {
    setIsLoading(bool);
  }

  const updateAccentColor = (accentColor) => {
    // this.setState({accentColor});
    setAccentColor(accentColor);

    if (isProduction) {
      ReactGA.event({
        category: 'User',
        action: 'Updated Color',
        label: accentColor
      });
    }

    // Setting the selected color into local storage.
    const itineraryColorKey = ACCENT_COLOR_KEY + '_' + itinerary.shortLink;
    localStorage.setItem(itineraryColorKey, accentColor);
  }

  const isData = itinerary.id;
  return (
    <div className="App">
        <BackTop />
        
        {!error && !isLoading && isData &&
          <Header headerImages={itinerary.prefs.backgroundImageScaled} 
                  backgroundColor={itinerary.prefs.backgroundTopColor}
                  title={itinerary.name} 
                  lists={itinerary.lists} 
                  accentColor={accentColor}
                  handleLoadingIndicator={(bool) => handleLoadingIndicator(bool)}
                  handleColorUpdated={(hex) => updateAccentColor(hex)}/>
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

        {error ? 
          <p className="error-message">{error} &nbsp; <MehOutlined style={{fontSize: '30px'}}/></p> 
          : null
        }

        {!error && isLoading &&
          <div className="loading-spinner">
            <LoadingSpinner isLoading={true} />
          </div>
        }

    </div>
  )
}

export default Itinerary;
