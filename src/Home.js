import React from 'react';
import { Link } from "react-router-dom";
import Header from './Header';
import LinkInput from './LinkInput';
import BoardHistory from './BoardHistory';
import './Home.css';
import { Layout, Row, Col, Divider, Typography } from 'antd';
const { Footer, Content } = Layout;
const { Title, Paragraph } = Typography;
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
        {
          //<Header displayBackgroundImage={false} />
        }
        <div className="flex-wrapper">
        <Layout>
          <Content>
            <Row>
              <Col span={12} className="home-left-column-wrap">
                <div className="home-left-column">
                  <Title>Slick Itinerary</Title>
                  <Paragraph>
                  Justo quaerat sociis id, porro! Consectetur. Pellentesque nec nibh interdum, suspendisse eligendi illo vivamus voluptas, diam eu impedit odit suscipit. Consequuntur eveniet optio consequat minus, necessitatibus, netus. Parturient repudiandae nunc.
                  </Paragraph>

                  <LinkInput />

                  { isBoardHistory && <BoardHistory data={boardHistory} /> }
                </div>
              </Col>
              <Col span={12}>
                <img src="home-bg.svg" alt="woman riding bike" />
              </Col>
            </Row>
          </Content>
        </Layout>
        <Footer style={{backgroundColor: "black"}}>Footer</Footer>
        </div>
      </Layout>

    )
  }
}

export default Home;
