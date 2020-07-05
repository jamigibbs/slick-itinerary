import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  FilePdfOutlined
} from '@ant-design/icons';
import './Header.css';

class Header extends React.Component {

  render() {
    const { headerImages, backgroundColor, title } = this.props;
    let bg = null;
    let headerStyle = {};

    if (headerImages) {
      bg = headerImages[5].url;
      headerStyle = {
        background: `url(${bg}) no-repeat center center fixed`,
        backgroundSize: 'cover'
      }
    } else {
      headerStyle = {
        backgroundColor: backgroundColor
      }
    }

    const titleArray = title.split(' ');
    const titleFirstWord = titleArray[0];
    titleArray.shift();
    const titleAfterFirstWord = titleArray.join(' ');

    return (
      <Layout className="layout">
        <header className="header" style={headerStyle}>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="2" icon={<FilePdfOutlined />}>
              <span className="hide-screen">Generate PDF</span>
              <button onClick={() => window.print()}></button>
            </Menu.Item>
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <span className="hide-screen">Home</span>
              <Link to="/" />
            </Menu.Item>
          </Menu>
          <h1 className="title"><span>{titleFirstWord}</span> {titleAfterFirstWord}</h1>
        </header>
      </Layout>
    )
  }

}

export default Header;
