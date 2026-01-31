import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, 
  Footprints, 
  Wind, 
  Brain, 
  ChevronRight,
  CheckCircle
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { ReactionTest } from '../components/tests/ReactionTest';

export const AssessmentHub = () => {
  const navigate = useNavigate();
  const [currentTest, setCurrentTest] = useState(0);
  const [testResults, setTestResults] = useState({
    reactionTime: null,
    walkingPace: null,
    breathHold: null,
    psychotype: null
  });
  
  const setTestResultsToStore = useStore((state) => state.setTestResults);

  const tests = [
    {
      id: 'reaction',
      title: 'Тест на реакцию',
      icon: Zap,
      description: 'Измерение времени реакции в миллисекундах',
      component: (
        <ReactionTest 
          onComplete={(time) => {
            setTestResults(prev => ({ ...prev, reactionTime: time }));
            setCurrentTest(1);
          }}
        />
      )
    },
    {
      id: 'endurance',
      title: 'Тест на выносливость',
      icon: Footprints,
      description: 'Оценка кардиореспираторной системы',
      component: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold mb-4">
            За сколько минут вы проходите 1 км быстрым шагом?
          </h3>
          <div className="space-y-4">
            {[
              { value: 8, label: '8 мин — Отличная форма' },
              { value: 10, label: '10 мин — Хорошая форма' },
              { value: 12, label: '12 мин — Средняя форма' },
              { value: 15, label: '15 мин — Нужна тренировка' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setTestResults(prev => ({ ...prev, walkingPace: option.value }));
                  setCurrentTest(2);
                }}
                className="w-full p-4 border-2 border-black rounded-lg text-left
                         hover:bg-black hover:text-white transition-all"
              >
                <div className="flex justify-between items-center">
                  <span>{option.label}</span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'breath',
      title: 'Тест на дыхание',
      icon: Wind,
      description: 'Измерение гипоксической устойчивости',
      component: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold mb-4">
            Сколько секунд вы можете задерживать дыхание?
          </h3>
          <div className="space-y-4">
            {[
              { value: 45, label: '45+ сек — Отличный результат' },
              { value: 30, label: '30 сек — Хороший результат' },
              { value: 20, label: '20 сек — Средний результат' },
              { value: 10, label: '10 сек — Требует улучшения' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setTestResults(prev => ({ ...prev, breathHold: option.value }));
                  setCurrentTest(3);
                }}
                className="w-full p-4 border-2 border-black rounded-lg text-left
                         hover:bg-black hover:text-white transition-all"
              >
                <div className="flex justify-between items-center">
                  <span>{option.label}</span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'psychotype',
      title: 'Психологический профиль',
      icon: Brain,
      description: 'Определение оптимального стиля взаимодействия',
      component: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold mb-4">
            Какой стиль взаимодействия вам ближе?
          </h3>
          <div className="space-y-4">
            {[
              { 
                value: 'team', 
                label: 'Командный игрок',
                description: 'Эффективен в коллективе, хороший коммуникатор'
              },
              { 
                value: 'solo', 
                label: 'Индивидуалист',
                description: 'Предпочитаю самостоятельную работу, самодостаточный'
              },
              { 
                value: 'analytical', 
                label: 'Аналитик',
                description: 'Стратегическое мышление, анализ ситуации'
              },
              { 
                value: 'competitive', 
                label: 'Соревновательный',
                description: 'Мотивирован конкуренцией, стремление к победе'
              }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setTestResults(prev => ({ ...prev, psychotype: option.value }));
                  // Сохраняем все результаты и переходим дальше
                  const finalResults = {
                    ...testResults,
                    psychotype: option.value
                  };
                  setTestResultsToStore(finalResults);
                  
                  // Расчеты будут произведены на следующем экране
                  setTimeout(() => navigate('/profile'), 300);
                }}
                className="w-full p-4 border-2 border-black rounded-lg text-left
                         hover:bg-black hover:text-white transition-all"
              >
                <div>
                  <div className="font-bold mb-1">{option.label}</div>
                  <div className="text-sm opacity-75">{option.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )
    }
  ];

  const currentTestData = tests[currentTest];
  const Icon = currentTestData.icon;

  return (
    <div className="min-h-screen bg-white p-6 max-w-md mx-auto">
      <div className="animate-slide-in">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Icon className="w-6 h-6" />
              {currentTestData.title}
            </h1>
            <span className="text-sm text-gray-500">
              Шаг {currentTest + 2} из 4
            </span>
          </div>
          
          <p className="text-gray-600 mb-6">
            {currentTestData.description}
          </p>
        </header>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Прогресс тестов</span>
            <span className="text-sm text-gray-500">
              {Object.values(testResults).filter(Boolean).length} из 4
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {tests.map((test, index) => (
              <div
                key={test.id}
                className={`h-2 rounded-full transition-all ${
                  index < currentTest || testResults[test.id]
                    ? 'bg-black'
                    : index === currentTest
                    ? 'bg-gray-800'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            {tests.map((test) => (
              <div
                key={test.id}
                className={`flex items-center gap-1 ${
                  testResults[test.id] ? 'text-black' : ''
                }`}
              >
                {testResults[test.id] && (
                  <CheckCircle className="w-3 h-3" />
                )}
                {test.id === 'reaction' && 'Реакция'}
                {test.id === 'endurance' && 'Выносливость'}
                {test.id === 'breath' && 'Дыхание'}
                {test.id === 'psychotype' && 'Психотип'}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10">
          {currentTestData.component}
        </div>

        {currentTest > 0 && (
          <button
            onClick={() => setCurrentTest(prev => prev - 1)}
            className="w-full py-3 border-2 border-black rounded-lg font-medium
                     hover:bg-gray-50 transition-colors mb-4"
          >
            Назад
          </button>
        )}
      </div>
    </div>
  );
};