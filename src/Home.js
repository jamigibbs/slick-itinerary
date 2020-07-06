import React from 'react';
import { Link } from "react-router-dom";
import Header from './Header';
import LinkInput from './LinkInput';
import { Layout, Row, Col } from 'antd';
const { Footer, Content } = Layout;

class Home extends React.Component {

  render() {

    return (
      <Layout>
      {
        // <Header displayBackgroundImage={false} />
      } 
        <Layout>
          <Content>
            <Row>
              <Col span={12}>
                <p>Home page</p>
                <Link to="I0TyGYpi">Example Itinerary</Link>
                <LinkInput />
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
