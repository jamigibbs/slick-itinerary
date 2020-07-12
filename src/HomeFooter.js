import React from 'react';
import './HomeFooter.css'
import { Typography } from 'antd';

const { Text } = Typography;

const HomeFooter = () => {
  const year = new Date().getFullYear();
  return (
    <div className="home-footer">
      <Text>&copy; {year} Slick Itinerary. All rights reserved.</Text>
    </div>
  )
}

export default HomeFooter;
