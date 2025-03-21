import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { Heart } from 'lucide-react';
import './App.css';

function App() {
  const [isConfettiActive, setConfettiActive] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: null, y: null });
  const [viewportSize, setViewportSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [animationStep, setAnimationStep] = useState(0);
  const [showHearts, setShowHearts] = useState(false);

  // Update viewport size on window resize
  useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize button position
  useEffect(() => {
    setButtonPosition({
      x: viewportSize.width / 2 + 110,
      y: 0
    });
  }, [viewportSize.width]);

  const handleNoButtonHover = () => {
    // Calculate safe boundaries (ensuring button stays fully visible)
    const buttonWidth = 150;
    const buttonHeight = 50;
    const maxX = viewportSize.width - buttonWidth - 20;
    const maxY = viewportSize.height - buttonHeight - 20;
    
    // Generate new random position within visible boundaries
    const x = Math.max(20, Math.min(maxX, Math.random() * maxX));
    const y = Math.max(20, Math.min(maxY, Math.random() * maxY));
    
    setButtonPosition({ x, y });
  };

  const handleYesButtonClick = () => {
    setConfettiActive(true);
    setAnimationStep(1);
    setShowHearts(true);
    
    // Schedule animation sequence
    setTimeout(() => setAnimationStep(2), 2000);
    setTimeout(() => setConfettiActive(false), 8000);
  };

  return (
    <div className="app-container">
      <div className={`floating-hearts ${showHearts ? 'active' : ''}`}>
        {Array(20).fill().map((_, i) => (
          <Heart 
            key={i}
            className="heart-icon"
            color="#ff4d6d"
            size={20 + Math.random() * 30}
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 7}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {isConfettiActive && (
        <Confetti
          width={viewportSize.width}
          height={viewportSize.height}
          recycle={false}
          numberOfPieces={500}
          colors={['#ff4d6d', '#ff8fa3', '#ffb3c1', '#FFC7D0', '#ffccd5']}
        />
      )}
      
      <div className={`app ${animationStep > 0 ? 'accepted' : ''}`}>
        <div className="card">
          <div className="message-content">
            <h1 className="title">Özür Dilerim Aşkım</h1>
            
            <div className={`message-section ${animationStep === 0 ? 'active' : ''}`}>
              <p className="message">Seni çok seviyorum ve yaptığım için özür dilerim. Lütfen beni affet!</p>
              <div className="buttons-container">
                <button
                  onClick={handleYesButtonClick}
                  className="yes-button"
                >
                  Fatmanur'un Affetme Butonu
                </button>
                <button
                  onMouseEnter={handleNoButtonHover}
                  className="no-button"
                  style={{ 
                    position: 'absolute',
                    left: buttonPosition.x,
                    top: buttonPosition.y,
                  }}
                >
                  Hayır
                </button>
              </div>
            </div>
            
            <div className={`message-section thank-you ${animationStep >= 1 ? 'active' : ''}`}>
              <div className="heart-container">
                <div className="heart"></div>
              </div>
              <h2 className="thank-you-text">Teşekkür ederim!</h2>
              <p className="follow-up-message">Seni her zaman seveceğim...</p>
              
              {animationStep >= 2 && (
                <div className="final-message">
                  <p>Birlikte nice güzel günlere B∞F...</p>
                  
                  
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;