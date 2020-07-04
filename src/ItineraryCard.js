import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Tag, Typography } from 'antd';
import './ItineraryCard.css';

const { Link } = Typography;

class ItineraryCard extends React.Component {

  formatedTime(str) {
    const time = new Date(str)
    return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  }

  render() {
    const { card } = this.props;
    const{ desc, customFieldItems } = card;

    const address = customFieldItems.find(field => {
      return field.name.toLowerCase() === 'address';
    });

    const link = card.customFieldItems.find(field => {
      return field.name.toLowerCase() === 'link';
    });

    const startTimeField = card.customFieldItems.find(field => {
      return field.name.toLowerCase() === 'start time';
    });

    const startTime = this.formatedTime(startTimeField.value.date);
  
    
    // The color "sky" does not map to the ant design Tag component so
    // we're just assigning the color as blue.
    const labels = card.labels.map((label) => {
      if (label.color === 'sky') {
        label.color = 'blue';
      }
      return label;
    });

    const googleMapLink = `https://maps.google.com/?q=1200 ${address.value.text}`;

    return (
      <div className="itinerary-card">
        {startTime && <div className="card-start-time">{startTime}</div>}
        {link 
          ? <h4 className="card-name"><a href={link.value.text}>{card.name}</a></h4>
          :  <h4 className="card-name">{card.name}</h4>
        }
        {address && 
          <div className="card-address">
            <Link href={googleMapLink} target="_blank">{address.value.text}</Link>
          </div>
        }
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

}

export default ItineraryCard;
