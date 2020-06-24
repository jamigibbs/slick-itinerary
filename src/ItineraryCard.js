import React from 'react';
import './ItineraryCard.css';

class ItineraryCard extends React.Component {

  render() {
    const { card } = this.props;
    const link = card.customFieldItems.find((field) => {
      return field.name === 'Link';
    })

    return (
      <span>
        {link 
          ? <a href={link.value.text}>{card.name}</a>
          :  card.name
        }
      </span>
    )
  }

}

export default ItineraryCard;
