import React from 'react';
import { Link } from "react-router-dom";
import Header from './Header';
import LinkInput from './LinkInput';
import BoardHistory from './BoardHistory';
import { Layout, Row, Col, Divider } from 'antd';
const { Footer, Content } = Layout;
const BOARD_HISTORY_KEY = 'si_board_history';

class Home extends React.Component {
  state = {
    boardHistory: []
  }

  componentDidMount() {
    const boardHistory = localStorage.getItem(BOARD_HISTORY_KEY);
    console.log('boardHistory', JSON.parse(boardHistory));
    this.setState({boardHistory: JSON.parse(boardHistory)});
  }

  render() {
    const { boardHistory } = this.state;
    const isBoardHistory = boardHistory.length > 0;
    return (
      <Layout>
        {
          //<Header displayBackgroundImage={false} />
        } 
        <Layout>
          <Content>
            <Row>
              <Col span={12}>
                <p>Home page</p>
                <Link to="I0TyGYpi">Example Itinerary</Link>
                <LinkInput />
                <Divider />
                { isBoardHistory &&
                  <BoardHistory data={boardHistory} />
                }
              </Col>
              <Col span={12}>
                <img src="woman-using-laptop.svg" alt="woman and laptop" width="600px" />
              </Col>
            </Row>
          </Content>
        </Layout>
        <Footer style={{backgroundColor: "black"}}>Footer</Footer>
      </Layout>

    )
  }
}

export default Home;
