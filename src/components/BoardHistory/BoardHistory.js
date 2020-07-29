import React from 'react';
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
        header={<h2 className="history-header">Your Recent Itineraries</h2>}
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Tooltip title="Go to itinerary" color="blue" placement="right">
              <Link to={item.id}>{item.name}</Link>
            </Tooltip>
            <Tooltip title={`${item.name} Trello board`} color="blue" placement="right">
              <a href={`https://trello.com/b/${item.id}`} aria-label={`Trello board with ID ${item.id}`} target="_blank" rel="noopener noreferrer"> 
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
