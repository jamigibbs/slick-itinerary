import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { List, Tooltip } from 'antd';
import './BoardHistory.css';

const BoardHistory = (props) => {
  // Sort from timestamp and return only first 10.
  const data = props.data.sort((a, b) => {
    return b.timestamp - a.timestamp;
  }).slice(0, 10);
  
  return (
    <div>
      <List
        size="small"
        header={<h4>Your Latest Itineraries</h4>}
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Link to={item.id}>{item.name} Slick Itinerary</Link>&nbsp;<span className="en-dash">–</span>
            <Tooltip title={`${item.name} Trello board`} color="blue">
              <a href={`https://trello.com/b/${item.id}`} target="_blank" rel="noopener noreferrer">&nbsp;  
                <img src="trello-logo.svg" alt="Trello Logo" width="15" />
              </a>
            </Tooltip>
          </List.Item>
        )}
      />
    </div>
  )
}

export default BoardHistory;
