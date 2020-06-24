import React from 'react';
import './ItineraryCards.css';
import ItineraryCard from'./ItineraryCard';

class ItineraryCards extends React.Component {

  render() {
    const { cards } = this.props;

    return (
      <div>
        <ul className="cards-list">
          {cards.map(card => {
            return (
              <li key={card.id}>
                <span className="cards-start-circle"></span>
                <ItineraryCard card={card} />
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

}

export default ItineraryCards;
