import React from 'react';
import { BackTop } from 'antd';
import { isLocalHost } from '../../utils';
import ReactGA from 'react-ga';
import Header from '../Header';
import LoadingSpinner from '../LoadingSpinner';
import ItineraryCards from'../ItineraryCards';
import './Itinerary.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSuitcase} from '@fortawesome/free-solid-svg-icons'
import { MehOutlined } from '@ant-design/icons';
import { ACCENT_COLOR_KEY } from '../../constants';

class Itinerary extends React.Component {
  state = {
    isLoading: false,
    itinerary: {},
    error: null,
    accentColor: '#E1474A',
  }

  componentDidMount() {
    const { props } = this.props;
    const boardShortLink = props.match.params.boardShortLink;
    this.setState({isLoading: true});

    fetch(`/api/board/${boardShortLink}`)
      .then((response) => response.json())
      .then((itinerary) => {
        if (isLocalHost()) console.log('itinerary', itinerary);
        const itineraryColorKey = ACCENT_COLOR_KEY + '_' + itinerary.shortLink;
        const accentColor = localStorage.getItem(itineraryColorKey);
        this.setState({itinerary, accentColor, isLoading: false});
      })
  }

  handleLoadingIndicator(bool){
    this.setState({isLoading: bool})
  }

  updateAccentColor(accentColor){
    this.setState({accentColor});

    if (!isLocalHost()) {
      ReactGA.event({
        category: 'User',
        action: 'Updated Color',
        label: accentColor
      });
    }

    // Setting the selected color into local storage.
    const itineraryColorKey = ACCENT_COLOR_KEY + '_' + this.state.itinerary.shortLink;
    localStorage.setItem(itineraryColorKey, accentColor);
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
                    handleLoadingIndicator={(bool) => this.handleLoadingIndicator(bool)}
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
