import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { triggerGAEventPush } from '../../utils';
import { Input, Typography } from 'antd';
import './LinkInput.css';

const { Text } = Typography;

const LinkInput = (props) => {
  const [link, setLink] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  function handleInputSubmit(event) {
    event.preventDefault();
    const boardId = getBoardShortId(link);
    if (boardId) {
      setError('');
      
      triggerGAEventPush({
        category: 'User',
        action: 'Submitted a board',
        label: boardId
      });

      // Navigate to the board itinerary view.
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
    // eg. https://trello.com/b/aMsO3PuO or https://trello.com/b/aMsO3PuO/my-board-name
    const linkArray = link.split('/');
    const boardIdIndex = linkArray.findIndex(el => el === 'b');
    return boardIdIndex ? linkArray[boardIdIndex + 1] : null;
  }

  return (
    <div>
      <Input 
        aria-label="Enter Trello board link"
        size="large" 
        type="text" 
        value={link}
        placeholder="ie. https://trello.com/b/aMsO3PuO" 
        onChange={(e) => handleInputChange(e)}
        onPressEnter={(e) => handleInputSubmit(e)} />
        {error && 
          <Text type="danger" style={{display: 'block', marginTop: '5px'}}>{error}</Text>
        }
    </div>
  )
}

export default LinkInput;
