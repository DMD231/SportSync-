import { useState, useEffect, useCallback, useRef } from 'react';

export const useReactionTest = (onComplete) => {
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'waiting' | 'ready' | 'finished'
  const [reactionTimes, setReactionTimes] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [startTime, setStartTime] = useState(null);
  
  const totalRounds = 5;
  const timerRef = useRef(null);
  const containerRef = useRef(null);

  const startRound = useCallback(() => {
    if (currentRound >= totalRounds) {
      const averageTime = reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length;
      onComplete(Math.round(averageTime));
      return;
    }

    setGameState('waiting');
    
    // Случайная задержка перед появлением цели
    const waitTime = Math.random() * 2000 + 1000; // 1-3 секунды
    
    timerRef.current = setTimeout(() => {
      if (containerRef.current) {
        const container = containerRef.current.getBoundingClientRect();
        const padding = 40;
        
        const x = Math.random() * (container.width - padding * 2) + padding;
        const y = Math.random() * (container.height - padding * 2) + padding;
        
        setTargetPosition({ x, y });
        setGameState('ready');
        setStartTime(performance.now());
      }
    }, waitTime);
  }, [currentRound, onComplete, reactionTimes, totalRounds]);

  const handleTargetClick = useCallback(() => {
    if (gameState !== 'ready' || !startTime) return;
    
    const reactionTime = performance.now() - startTime;
    const newTimes = [...reactionTimes, reactionTime];
    
    setReactionTimes(newTimes);
    setGameState('finished');
    
    // Переход к следующему раунду
    setTimeout(() => {
      setCurrentRound(prev => prev + 1);
    }, 500);
  }, [gameState, reactionTimes, startTime]);

  useEffect(() => {
    if (currentRound < totalRounds && gameState === 'finished') {
      const timeout = setTimeout(() => {
        startRound();
      }, 1000);
      
      return () => clearTimeout(timeout);
    }
  }, [currentRound, gameState, startRound, totalRounds]);

  useEffect(() => {
    if (gameState === 'idle') {
      startRound();
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [gameState, startRound]);

  return {
    gameState,
    currentRound,
    totalRounds,
    targetPosition,
    reactionTimes,
    containerRef,
    handleTargetClick,
    averageTime: reactionTimes.length > 0 
      ? reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length 
      : null
  };
};