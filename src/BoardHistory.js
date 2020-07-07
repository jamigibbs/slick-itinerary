import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { List, Typography, Divider } from 'antd';
import './LinkInput.css';

const BoardHistory = (props) => {
  const origin = window.location.origin;

  const data = props.data.sort((a, b) => {
    return b.timestamp - a.timestamp;
  })
  
  return (
    <div>
      <List
        size="small"
        header={<h4>Your Slick Itinerary History</h4>}
        bordered
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Link to={item.id}>{`${origin}/${item.id}`}</Link>
            <a href={`https://trello.com/b/${item.id}`}>{`https://trello.com/b/${item.id}`}</a>
          </List.Item>
        )}
      />
    </div>
  )
}

export default BoardHistory;
