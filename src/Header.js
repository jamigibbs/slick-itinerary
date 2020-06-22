import React from 'react';
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
      <header className="header" style={headerStyle}>
        <h1 className="title"><span>{titleFirstWord}</span> {titleAfterFirstWord}</h1>
      </header>
    )
  }

}

export default Header;
