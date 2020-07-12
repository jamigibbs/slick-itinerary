import React from 'react';
import { Link } from "react-router-dom";
import LinkInput from './LinkInput';
import BoardHistory from './BoardHistory';
import HomeFooter from './HomeFooter';
import './Home.css';
import { Layout, Row, Col, Divider, Typography } from 'antd';

const { Footer, Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const BOARD_HISTORY_KEY = 'si_board_history';

class Home extends React.Component {
  state = {
    boardHistory: []
  }

  componentDidMount() {
    const boardHistory = JSON.parse(localStorage.getItem(BOARD_HISTORY_KEY));
    this.setState({boardHistory});
  }

  render() {
    const { boardHistory } = this.state;
    let isBoardHistory = false;
    if (boardHistory) {
      isBoardHistory = boardHistory.length > 0;
    }
    return (
      <Layout>
        <div className="flex-wrapper">
        <Layout>
          <Content>
            <Row>
              <Col xs={{ span: 24, order: 2 }} sm={{ span: 24, order: 2 }} md={{ span: 12, order: 1 }} className="home-left-column-wrap">
                <div className="home-left-column">
                  <Title className="logo">Slick Itinerary</Title>
                  <Paragraph>
                  Organize your trip using <a href="https://trello.com/">Trello</a> and turn it into a sharable, printable, beautiful travel itinerary instantly!
                  </Paragraph>

                  <Divider />

                  <Text strong>Getting Started</Text>

                  <Paragraph>
                  Quick start by copying the <a href="https://trello.com/b/I0TyGYpi" target="_blank" rel="noopener noreferrer">example board</a> and enter the board link below to generate an itineray.
                  </Paragraph>

                  <Paragraph style={{marginTop: '20px'}}>Need more help? Check out the <Link>support guide</Link>.</Paragraph>

                  <LinkInput />

                  <Divider dashed={true} />

                  { isBoardHistory && <BoardHistory data={boardHistory} /> }
                </div>
              </Col>
              <Col xs={{ span: 24, order: 1 }} sm={{ span: 24, order: 1 }} md={{ span: 12, order: 2 }} >
                <img src="home-bg.svg" alt="woman riding bike" />
              </Col>
            </Row>
          </Content>
        </Layout>
        <Footer style={{backgroundColor: '#333333'}}>
          <HomeFooter></HomeFooter>
        </Footer>
        </div>
      </Layout>

    )
  }
}

export default Home;
