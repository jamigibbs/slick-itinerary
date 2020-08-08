import React from 'react';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Link } from "react-router-dom";
import { triggerGAEventPush } from '../../utils';
import PDFItinerary from "../PDFItinerary";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import { TwitterPicker } from 'react-color';
import { Layout, Menu, Tooltip } from 'antd';
import './Header.css';
import { 
  HomeOutlined, 
  FilePdfOutlined, 
  BgColorsOutlined, 
  MailOutlined 
} from '@ant-design/icons';

const Header = (props) => {

  const handleColorPickerClick = () => {
    document.querySelector('.color-picker').classList.toggle('hidden');
  }

  const handleShareClick = (event) => {
    event.preventDefault();

    triggerGAEventPush({
      category: 'User',
      action: 'Emailed Itinerary',
      label: window.location.pathname
    });

    window.location.href = emailLink();
  }

  const emailLink = () => {
    const { title } = props;
    const email = {
      subject: `Check out the itinerary for ${title}`,
      body: `I created an itinerary for our trip and I'd like to share it with you: ${window.location.href}`
    }
    return `mailto:EMAILHERE?subject=${email.subject}&body=${email.body}`;
  }

  const generatePDF= async () => {
    props.handleLoadingIndicator(true, 'Hang tight while we generate your PDF file...');

    const {title, lists, accentColor, headerImages, backgroundColor} = props;
    const itinerary = <PDFItinerary title={title} lists={lists} accentColor={accentColor} headerImages={headerImages} backgroundColor={backgroundColor} />;
    const blobPdf = await pdf(itinerary);
    blobPdf.updateContainer(itinerary);

    const result = await blobPdf.toBlob();
    props.handleLoadingIndicator(false);
    saveAs(result, `${title}.pdf`);

    triggerGAEventPush({
      category: 'User',
      action: 'Generated PDF',
      label: window.location.pathname
    });
  }

  const { 
    headerImages, 
    backgroundColor, 
    title,
    handleColorUpdated, 
    accentColor } = props;
  let bg = null;
  let headerStyle = {};

  if (headerImages && headerImages[4]) {
    bg = headerImages[4].url;
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
    <Layout className="layout">
      <header className='display-header-bg' style={headerStyle}>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item 
            key="1" 
            icon={<HomeOutlined />} 
            title="Home">
            <span className="hide-screen">Home</span>
            <Link to="/" aria-label="Back to home" />
          </Menu.Item>
          <Menu.Item 
            key="2"
            title="Create PDF"
            icon={<Tooltip title="Generate a PDF" color="blue" placement="bottom"><FilePdfOutlined /></Tooltip>} onClick={() => generatePDF()}>
          </Menu.Item>
          <Menu.Item 
            key="3" 
            icon={<Tooltip title="Email this itinerary" color="blue" placement="bottom"><MailOutlined onClick={(event) => handleShareClick(event)} /></Tooltip>} 
            title="Email Itinerary">
          </Menu.Item>
          <Menu.Item 
            key="4" 
            icon={<Tooltip title="Select an accent color" color="blue" placement="bottom"><BgColorsOutlined onClick={handleColorPickerClick} /></Tooltip>} 
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
  )
}

export default Header;
