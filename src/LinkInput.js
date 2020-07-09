import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input } from 'antd';
import './LinkInput.css';
const BOARD_HISTORY_KEY = 'si_board_history';
const TRELLO_API_ROOT = 'https://api.trello.com/1';
const TRELLO_KEY = process.env.REACT_APP_TRELLO_KEY;
const TRELLO_TOKEN = process.env.REACT_APP_TRELLO_TOKEN;

const LinkInput = (props) => {
  const [link, setLink] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();

  function handleInputSubmit(event) {
    event.preventDefault();
    const boardId = getBoardShortId(link);
    if (boardId) {
      setError('');
      updateBoardHistory(boardId);
      // Navigate to the board's itinerary page.
      history.push(boardId);
    } else {
      setError('Please enter a Trello board link.');
    }
  }

  async function updateBoardHistory(id){
    let timestamp =  Date.now();
    const boardHistory = localStorage.getItem(BOARD_HISTORY_KEY);

    if (boardHistory) {
      const boardHistoryParsed = JSON.parse(localStorage.getItem(BOARD_HISTORY_KEY));
      // Check if the board ID exists already.
      const index = boardHistoryParsed.findIndex((board) => {
        return board.id === id;
      });

      if (index !== -1) {
        // If the board exists, update the timestamp.
        boardHistoryParsed[index].timestamp = timestamp;
      } else {
        // Otherwise, add the new board to the history.
        const trelloResponse = await getBoardName(id);
        const boardData = await trelloResponse.json();
        boardHistoryParsed.push({timestamp, id, name: boardData.name});
      }
      localStorage.setItem(BOARD_HISTORY_KEY, JSON.stringify(boardHistoryParsed));
    } else {
      const trelloResponse = await getBoardName(id);
      const boardData = await trelloResponse.json();
      const newBoardHistory = [{timestamp, id, name: boardData.name}];
      localStorage.setItem(BOARD_HISTORY_KEY, JSON.stringify(newBoardHistory));
    }
  }

  function getBoardName(id) {
    return fetch(`${TRELLO_API_ROOT}/boards/${id}?fields=name&key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`);
  }

  function handleInputChange(event) {
    const link = event.target.value;
    setLink(link);
  }

  function getBoardShortId(link){
    // eg. https://trello.com/b/I0TyGYpi
    return link.split('b/')[1];
  }

  return (
    <div>
      <Input 
        size="large" 
        type="text" 
        value={link}
        placeholder="ie. https://trello.com/b/I0TyGYpi" 
        onChange={(e) => handleInputChange(e)}
        onPressEnter={(e) => handleInputSubmit(e)} />
        {error && 
          <div className="error-message">{error}</div>
        }
    </div>
  )
}

export default LinkInput;
