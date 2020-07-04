import React from 'react';
import './ItineraryCards.css';
import ItineraryCard from'./ItineraryCard';
import { Divider } from 'antd';

class ItineraryCards extends React.Component {

  render() {
    const { cards } = this.props;
    const cardsCount = cards.length;
    return (
      <div>
        <ul className="cards-list">
          {cards.map((card, i) => {
            return (
              <li key={card.id}>
                <span className="cards-start-circle"></span>
                <ItineraryCard card={card} />
                {cardsCount !== i + 1 && <Divider />}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

}

export default ItineraryCards;
