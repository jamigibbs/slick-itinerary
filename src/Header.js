import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Menu } from 'antd';
import { HomeOutlined, FilePdfOutlined, BgColorsOutlined } from '@ant-design/icons';
import { TwitterPicker } from 'react-color';
import './Header.css';

class Header extends React.Component {

  handleColorPickerClick(){
    document.querySelector('.color-picker').classList.toggle('hidden');
  }

  render() {
    const { headerImages, backgroundColor, title, handleColorUpdated, accentColor } = this.props;
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

    const colorsArray = ['#E1474A', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#263238', '#FF6900', '#F78DA7', '#9900EF'];

    return (
      <Layout className="layout">
        <header className="header" style={headerStyle}>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <span className="hide-screen">Home</span>
              <Link to="/" />
            </Menu.Item>
            <Menu.Item key="2" 
              icon={<FilePdfOutlined />} 
              onClick={() => window.print()}>
              <span className="hide-screen">Print Itinerary</span>
            </Menu.Item>
            <Menu.Item key="3" icon={<BgColorsOutlined onClick={this.handleColorPickerClick} />}>
              <span className="hide-screen">Hightlight Color</span>
              <span class="color-picker hidden">
                <TwitterPicker
                  colors={colorsArray}
                  color={accentColor}
                  onChangeComplete={ ({ hex }) => handleColorUpdated(hex) }
                />
              </span>
            </Menu.Item>
          </Menu>
          <h1 className="title"><span>{titleFirstWord}</span> {titleAfterFirstWord}</h1>
        </header>
      </Layout>
    )
  }

}

export default Header;
