import React, { useState, useEffect } from 'react';
import { BackTop, Layout } from 'antd';
import { isLocalHost, triggerGAEventPush, setPageTitle, getUrlParameter, insertUrlParam } from '../../utils';
import Header from '../Header';
import LoadingSpinner from '../LoadingSpinner';
import ItineraryCards from'../ItineraryCards';
import SiteFooter from '../SiteFooter';
import './Itinerary.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSuitcase} from '@fortawesome/free-solid-svg-icons'
import { MehOutlined } from '@ant-design/icons';
import { DEFAULT_ACCENT_COLOR_HEX, BOARD_HISTORY_KEY } from '../../constants';

const { Footer } = Layout;

const Itinerary = ({props}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [itinerary, setItinerary] = useState({});
  const [loadingText, setLoadingText] = useState('Loading your itinerary...');
  const [error, setError] = useState(null);
  const [accentColor, setAccentColor] = useState(DEFAULT_ACCENT_COLOR_HEX);

  useEffect(() => {
    const boardShortLink = props.match.params.boardShortLink;
    setIsLoading(true);
    fetchBoardItinerary(boardShortLink);
  }, []);

  const fetchBoardItinerary = (boardShortLink) => {
    fetch(`/api/board/${boardShortLink}`)
      .then((response) => response.json())
      .then((itinerary) => {
        if (isLocalHost) console.log('itinerary', itinerary);
        setPageTitle(itinerary.name);
        setItinerary(itinerary);
        setIsLoading(false);
        setLocalStorage(itinerary, boardShortLink);
      })
      .catch((error) => setError(error));
  }

  const setLocalStorage = (itinerary, boardShortLink) => {
    const boardHistory = getBoardHistoryLocalStorage();
    let timestamp =  Date.now(); 
    const color = getUrlParameter('color');

    // Setting board history localStorage.
    if (boardHistory && boardHistory.length > 0) {
      const activeBoard = boardHistory.find((board) => {
        return board.id === boardShortLink;
      });
      // If the active board is already in the history, update those values.
      if (activeBoard) {
        const activeColor = color ? `#${color}` : activeBoard.color;
        if (activeColor) insertUrlParam('color', activeColor.slice(1));
        setAccentColor(activeColor);

        updateBoardHistoryItem(boardHistory, {
          timestamp,
          color: activeColor,
          id: boardShortLink,
          name: itinerary.name
        });
      } else {
        const activeColor = color ? color : DEFAULT_ACCENT_COLOR_HEX;
        setAccentColor(activeColor);
        // There is a board history but this board is not in it yet.
        addBoardHistoryItem({
          timestamp,
          id: boardShortLink,
          color: activeColor,
          name: itinerary.name
        })
      }
    } else {
      const activeColor = color ? color : DEFAULT_ACCENT_COLOR_HEX;
      setAccentColor(activeColor);
      // No board history at all so let's create it.
      setBoardHistoryLocalStorage([{
        timestamp,
        id: boardShortLink,
        color: activeColor,
        name: itinerary.name
      }]);
    }
  }

  const handleLoadingIndicator = (bool, text) => {
    setIsLoading(bool);
    if (text) {
      setLoadingText(text);
    }
  }

  const addBoardHistoryItem = (item) => {
    const boardHistory = JSON.parse(localStorage.getItem(BOARD_HISTORY_KEY));
    boardHistory.push(item);
    setBoardHistoryLocalStorage(boardHistory);
  }

  const updateBoardHistoryItem = (boardHistory, item) => {
    const index = boardHistory.findIndex(board => board.id === item.id);
    
    if (index !== -1) {
      Object.assign(boardHistory[index], {
        timestamp: item.timestamp,
        id: item.id,
        color: item.color,
        name: item.name
      })
      setBoardHistoryLocalStorage(boardHistory);
    }
  }

  const getBoardHistoryLocalStorage = () => {
    return JSON.parse(localStorage.getItem(BOARD_HISTORY_KEY));
  }

  const setBoardHistoryLocalStorage = (history) => {
    localStorage.setItem(BOARD_HISTORY_KEY, JSON.stringify(history));
  }

  const updateAccentColor = (color) => {
    setAccentColor(color);
    insertUrlParam('color', color.slice(1)); // Removes # from color hex.

    const boardHistory = getBoardHistoryLocalStorage();
    let timestamp =  Date.now();

    updateBoardHistoryItem(boardHistory, {
      color,
      timestamp,
      id: itinerary.shortLink,
      name: itinerary.name,
    });

    triggerGAEventPush({
      category: 'User',
      action: 'Updated Color',
      label: accentColor
    });
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
                  handleLoadingIndicator={(bool, text) => handleLoadingIndicator(bool, text)}
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
            <LoadingSpinner isLoading={true} text={loadingText} />
          </div>
        }

        {!error && !isLoading && isData &&
          <Footer className="footer" style={{backgroundColor: '#333333'}}>
            <SiteFooter></SiteFooter>
          </Footer>
        }
    </div>
  )
}

export default Itinerary;
