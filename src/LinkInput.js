import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Input } from 'antd';
import './LinkInput.css';

const LinkInput = (props) => {
  const [link, setLink] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();

  function handleInputSubmit(event) {
    event.preventDefault();
    const boardId = getBoardShortId(link);
    if (boardId) {
      setError('');
      history.push(boardId);
    } else {
      setError('Please enter a Trello board link.');
    }
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
