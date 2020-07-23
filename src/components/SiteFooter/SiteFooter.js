import React from 'react';
import './SiteFooter.css'
import { Typography } from 'antd';

const { Text } = Typography;

const SiteFooter = () => {
  const year = new Date().getFullYear();
  return (
    <div className="site-footer">
      <Text>&copy; {year} Slick Itinerary. All rights reserved.</Text>
    </div>
  )
}

export default SiteFooter;
