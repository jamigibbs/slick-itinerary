import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Tag, Typography } from 'antd';
import './ItineraryCard.css';

const { Link } = Typography;

const ItineraryCard = (props) => {

  const formatedTime = (str) => {
    const time = new Date(str)
    return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  }

  const { card, accentColor } = props;
  const{ desc, customFieldItems, cover } = card;
  const coverUrl = cover.url ? cover.url : cover.sharedSourceUrl;

  const address = customFieldItems.find(field => {
    return field.name.toLowerCase() === 'address';
  });

  const link = card.customFieldItems.find(field => {
    return field.name.toLowerCase() === 'link';
  });

  const startTimeField = card.customFieldItems.find(field => {
    return field.name.toLowerCase() === 'start time';
  });

  let startTime = null;
  if (startTimeField) {
    startTime = formatedTime(startTimeField.value.date);
  }

  // The color "sky" does not map to the ant design Tag component so
  // we're just assigning the color as blue.
  const labels = card.labels.map((label) => {
    if (label.color === 'sky') {
      label.color = 'blue';
    }
    return label;
  });

  let googleMapLink = null;
  if (address && address.value.text) {
    googleMapLink = `https://maps.google.com/?q=1200 ${address.value.text}`;
  }

  const encodeURI = (uri) => {
    return encodeURIComponent(uri);
  }

  return (
    <div className="itinerary-card">
      {startTime && <div className="card-start-time">{startTime}</div>}
      <div>
        <div className="header-left-column">
          {link 
            ? <h4 className="card-name"><a href={link.value.text} style={{color: accentColor}} target="_blank" rel="noopener noreferrer">{card.name}</a></h4>
            :  <h4 className="card-name" style={{color: accentColor}}>{card.name}</h4>
          }
          {address && 
            <div className="card-address">
              <Link href={googleMapLink} target="_blank" rel="noopener noreferrer">{address.value.text}</Link>
            </div>
          }
        </div>
        <div className="header-right-column">
          {coverUrl ? 
            <img className="card-cover" src={`/api/img/${encodeURI(coverUrl)}`} alt={card.name}></img>
          : null }
        </div>

      </div>
      {desc &&
        <div className="card-desc">
          <ReactMarkdown class="card-desc" source={desc} />
        </div>
      }
      <div className="card-labels">
        {labels.map(label => {
          return (
            <Tag key={label.id} color={label.color}>{label.name}</Tag>
          )
        })}
      </div>

    </div>
  )
}

export default ItineraryCard;
