import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import LinkInput from '../LinkInput';
import BoardHistory from '../BoardHistory';
import SiteFooter from '../SiteFooter';
import './Home.css';
import { setPageTitle } from '../../utils';
import { Layout, Divider, Typography } from 'antd';
import { BOARD_HISTORY_KEY, TRELLO_URL } from '../../constants';

const { Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

const Home = (props) => {
  const [boardHistory, setBoardHistory] = useState([]);

  useEffect(() => {
    setBoardHistoryFromLocalStorage();
    setPageTitle();
  }, []);

  const setBoardHistoryFromLocalStorage = () => {
    const boardHistory = JSON.parse(localStorage.getItem(BOARD_HISTORY_KEY));
    if (boardHistory) {
      setBoardHistory(boardHistory);
    }
  }

  const isBoardHistory = boardHistory ? boardHistory.length > 0 : false;

  return (
<div>
      <div className="flex-grid">

        <div className="col left">
          <Title className="logo">Slick Itinerary</Title>
          <Paragraph style={{fontSize: '20px'}}>
          Organize your trip using Trello and turn it into a sharable, printable, beautiful travel itinerary instantly!
          </Paragraph>

          <Divider />

          <Text strong>Quick Start</Text>

          <Paragraph style={{fontSize: '16px'}}>
          Copy our <a href={`${TRELLO_URL}/b/aMsO3PuO`} aria-label="Example board" target="_blank" rel="noopener noreferrer">example trip board</a> and modify it for your own trip. Then enter your board link below to generate an itineray.
          </Paragraph>

          <Paragraph style={{marginBottom: '20px'}}>Need more help? Check out the <Link to="guide">support guide</Link>.</Paragraph>

          <LinkInput />

          <Divider dashed={true} />

          { isBoardHistory && <BoardHistory data={boardHistory} /> }
        </div>

        <div className="col right">
          <img src="img/home-bg.svg" alt="woman riding bike" />
        </div>

      </div>

      <Footer className="footer" style={{backgroundColor: '#333333'}}>
        <SiteFooter></SiteFooter>
      </Footer>
    </div>
  )
}

export default Home;
