import React from 'react';
import './ItineraryCards.css';
import ItineraryCard from'../ItineraryCard';
import { Divider } from 'antd';

const ItineraryCards = (props) => {
  const { cards, accentColor } = props;
  const cardsCount = cards.length;
  return (
    <div>
      <ul className="cards-list">
        {cards.map((card, i) => {
          return (
            <li key={card.id}>
              <span className="cards-start-circle"></span>
              <ItineraryCard card={card} accentColor={accentColor} />
              {cardsCount !== i + 1 && <Divider />}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ItineraryCards;
