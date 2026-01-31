import React from 'react';
import { Target, Zap, Timer } from 'lucide-react';
import { useReactionTest } from '../../hooks/useReactionTest';

export const ReactionTest = ({ onComplete }) => {
  const {
    gameState,
    currentRound,
    totalRounds,
    targetPosition,
    reactionTimes,
    containerRef,
    handleTargetClick,
    averageTime
  } = useReactionTest(onComplete);

  const getInstruction = () => {
    switch (gameState) {
      case 'waiting':
        return 'Ждите появления цели...';
      case 'ready':
        return 'НАЖМИТЕ СЕЙЧАС!';
      case 'finished':
        return 'Отличная реакция!';
      default:
        return 'Нажмите на круг как можно быстрее';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <Zap className="w-6 h-6" />
          Тест на реакцию
        </h2>
        <p className="text-gray-600 mb-4">Раунд {currentRound + 1} из {totalRounds}</p>
        
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="text-center">
            <div className="text-sm text-gray-500">Среднее время</div>
            <div className="text-2xl font-mono">
              {averageTime ? `${averageTime.toFixed(0)}мс` : '—'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Лучший результат</div>
            <div className="text-2xl font-mono">
              {reactionTimes.length > 0 
                ? `${Math.min(...reactionTimes).toFixed(0)}мс` 
                : '—'
              }
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div
          ref={containerRef}
          className="relative w-full h-[400px] border-2 border-black rounded-lg bg-white overflow-hidden"
        >
          {gameState === 'ready' && (
            <button
              onClick={handleTargetClick}
              className="absolute w-16 h-16 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-150 hover:scale-110 active:scale-95"
              style={{
                left: `${targetPosition.x}px`,
                top: `${targetPosition.y}px`,
              }}
              aria-label="Цель для реакции"
            >
              <Target className="w-8 h-8 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </button>
          )}
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className={`text-xl font-bold mb-2 ${
                gameState === 'ready' ? 'text-black animate-pulse' : 'text-gray-500'
              }`}>
                {getInstruction()}
              </p>
              {gameState === 'ready' && (
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Timer className="w-4 h-4" />
                  <span>Время реакции фиксируется</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: totalRounds }).map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index < currentRound
                ? reactionTimes[index] < 200
                  ? 'bg-black'
                  : reactionTimes[index] < 300
                  ? 'bg-gray-800'
                  : 'bg-gray-400'
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
};