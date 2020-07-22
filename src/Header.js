import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import generatePDFDocument from './generatePDFDocument';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Layout, Menu } from 'antd';
import { 
  HomeOutlined, 
  FilePdfOutlined, 
  BgColorsOutlined, 
  MailOutlined 
} from '@ant-design/icons';
import { TwitterPicker } from 'react-color';
import './Header.css';

class Header extends React.Component {

  handleColorPickerClick(){
    document.querySelector('.color-picker').classList.toggle('hidden');
  }

  handleShareClick(event){
    event.preventDefault();
    console.log('share clicked', this.emailLink())
    window.location.href = this.emailLink();
  }

  emailLink() {
    const { title } = this.props;
    const email = {
      subject: `Check out the itinerary for ${title}`,
      body: `I created an itinerary for our trip and I\'d like to share it with you: ${window.location.href}`
    }
    return `mailto:enteranemail?subject=${email.subject}&body=${email.body}`;
  } 

  render() {
    const { 
      headerImages, 
      backgroundColor, 
      title, 
      lists,
      handleColorUpdated, 
      accentColor } = this.props;
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

    let titleAfterFirstWord = null;
    let titleFirstWord = null;

    if (title) {
      const titleArray = title.split(' ');
      titleFirstWord = titleArray[0];
      titleArray.shift();
      titleAfterFirstWord = titleArray.join(' ');
    }

    const colorsArray = ['#E1474A', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#263238', '#FF6900', '#F78DA7', '#9900EF'];

    return (
      <View>
      <Layout className="layout">
        <header className='display-header-bg' style={headerStyle}>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item 
              key="1" 
              icon={<HomeOutlined />} 
              title="Home">
              <span className="hide-screen">Home</span>
              <Link to="/" />
            </Menu.Item>
            <Menu.Item 
              key="2"
              title="Create PDF" 
              icon={<FilePdfOutlined />} 
              onClick={() => generatePDFDocument(title, lists, accentColor, headerImages, backgroundColor)}>
            </Menu.Item>
            <Menu.Item 
              key="3" 
              icon={<MailOutlined 
              onClick={(event) => this.handleShareClick(event)} />} 
              title="Email Itinerary">
            </Menu.Item>
            <Menu.Item 
              key="4" 
              icon={<BgColorsOutlined 
              onClick={this.handleColorPickerClick} />} 
              title="Highlight Color">
              <span className="color-picker hidden">
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
      </View>
    )
  }
}

export default Header;
