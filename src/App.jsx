import { useEffect, useState } from 'react';
import data, { shuffle } from './data.jsx';
import './App.css';
import Card from './components/Card.jsx';

function App() {
  const [cards, setCards] = useState(data);
  const [selectedCards, setSelectedCards] = useState({ first: null, second: null });
  const [turns, setTurns] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [winMessage, setWinMessage] = useState(false)

  useEffect(() => {
    if (selectedCards.first && selectedCards.second) {
      handleCardSelection(selectedCards.first, selectedCards.second);
    }
  }, [selectedCards]);

  const handleCardSelection = (firstCard, secondCard) => {
    setDisabled(true);
    const isMatch = firstCard.image === secondCard.image;

    if (isMatch) {
      console.log("match");
      markAsMatched(firstCard.image);
    } else {
      console.log("not match");
    }
    setTimeout(resetSelection, 1000);
  };

  const markAsMatched = (image) => {
    setCards(prevCards => {
      const updatedCards = prevCards.map(card =>
        card.image === image ? { ...card, isMatched: true } : card
      );
      checkWinCondition(updatedCards);
      return updatedCards;
    });
  };

  const resetSelection = () => {
    setSelectedCards({ first: null, second: null });
    setTurns(prev => prev + 1);
    setDisabled(false);
  };

  const handleClick = (item) => {
    if (!disabled && item !== selectedCards.first && !item.isMatched) {
      setSelectedCards(prev => ({
        ...prev,
        [prev.first ? 'second' : 'first']: item,
      }));
    }
  };

  const startNewGame = () => {
    cards.map(card => {
      console.log(card.isMatched)
    })
    console.log(selectedCards)
    console.log(cards)
    const newCards = shuffle([...data]);
    resetSelection();
    setCards(newCards);
    setWinMessage(false)
    setTurns(0)
  };

  const checkWinCondition = (updatedCards) => {
    const allMatched = updatedCards.every(card => card.isMatched);
    if (allMatched) {
      setWinMessage(true)
    }
  };



  return (
    <div className='app'>
      <div className="space">
        {cards.map(item => (
          <Card 
            key={item.id} 
            card={item} 
            onClick={() => handleClick(item)} 
            flipped={item.isMatched || item === selectedCards.first || item === selectedCards.second}
          />
        ))}
      </div>
      <div className="menu">
        <div className="title">
          <p>Memory game</p>
        </div>
        <div className='turn'>
          <p>Turns: {turns}</p>
        </div>
        <div className="new-game">
          <button onClick={startNewGame}>New Game</button>
        </div>

        {winMessage && <div className="win-message">
          <p>Skibidi sigma toilet!🔥😈</p>
          <img src="/images/sigma.jpg" alt="" />
        </div>}
        

        <div className="footer">
          <p>Created by Daniyar from KBTU</p>
          <p>Copyright © {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
