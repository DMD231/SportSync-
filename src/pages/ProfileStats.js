import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Target, 
  Activity, 
  Brain, 
  Zap,
  Calculator
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { RadarChart, TraitBar } from '../components/charts/RadarChart';
import { 
  getSportRecommendations, 
  calculateNutrition,
  generateTrainingPlan 
} from '../utils/algorithm';

export const ProfileStats = () => {
  const navigate = useNavigate();
  const { getUserData, setCalculations } = useStore();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = getUserData();
    
    // Проверяем, что все данные собраны
    if (!userData.height || !userData.weight || !userData.age || 
        !userData.reactionTime || !userData.walkingPace || 
        !userData.breathHold || !userData.psychotype) {
      navigate('/');
      return;
    }

    // Выполняем расчеты
    setTimeout(() => {
      const recommendations = getSportRecommendations(userData);
      const nutrition = calculateNutrition(userData);
      const trainingPlan = generateTrainingPlan(
        recommendations.topRecommendation?.sport,
        recommendations.topRecommendation?.position,
        'beginner'
      );

      const analysisData = {
        traits: recommendations.userTraits,
        recommendations,
        nutrition,
        trainingPlan,
        userData
      };

      setAnalysis(analysisData);
      setCalculations(analysisData);
      setLoading(false);
    }, 1000);
  }, [getUserData, navigate, setCalculations]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-6 max-w-md mx-auto flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black mb-4"></div>
          <p className="text-gray-600">Анализируем данные...</p>
        </div>
      </div>
    );
  }

  const { traits, recommendations, nutrition } = analysis;
  const topSport = recommendations.topRecommendation;

  return (
    <div className="min-h-screen bg-white p-6 max-w-md mx-auto">
      <div className="animate-fade-in">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Ваш профиль</h1>
          <p className="text-gray-600">
            Научный анализ физических и когнитивных характеристик
          </p>
        </header>

        <div className="space-y-8">
          {/* Радар-диаграмма */}
          <section className="border-2 border-black rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-6 h-6" />
              <h2 className="text-xl font-bold">Профиль характеристик</h2>
            </div>
            <RadarChart data={traits} />
          </section>

          {/* Детализированные показатели */}
          <section className="border-2 border-black rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-6 h-6" />
              <h2 className="text-xl font-bold">Детальный анализ</h2>
            </div>
            
            <div className="space-y-4">
              <TraitBar label="Сила" value={traits.strength} />
              <TraitBar label="Ловкость" value={traits.agility} />
              <TraitBar label="Интеллект" value={traits.intelligence} />
              <TraitBar label="Выносливость" value={traits.endurance} />
              <TraitBar 
                label="Реакция" 
                value={1 - (analysis.userData.reactionTime / 500)} 
              />
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Интерпретация:</strong> {traits.intelligence > 0.8 
                  ? 'Высокие когнитивные способности. Рекомендуются стратегические виды спорта.'
                  : traits.strength > 0.7
                  ? 'Отличные силовые показатели. Подойдут силовые и контактные виды спорта.'
                  : 'Сбалансированный профиль. Подходят многоборья и универсальные виды спорта.'
                }
              </p>
            </div>
          </section>

          {/* Рекомендация */}
          {topSport && (
            <section className="border-2 border-black rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-6 h-6" />
                <h2 className="text-xl font-bold">Предварительная рекомендация</h2>
              </div>
              
              <div className="mb-4">
                <div className="text-4xl font-bold mb-2">{topSport.sport.name}</div>
                <div className="text-gray-600">
                  Совпадение: <span className="font-bold text-black">
                    {Math.round(topSport.match * 100)}%
                  </span>
                </div>
              </div>

              {topSport.position && (
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-1">Рекомендуемая позиция</div>
                  <div className="text-lg font-bold">{topSport.position.name}</div>
                </div>
              )}

              <div className="text-sm text-gray-600">
                {topSport.match > 0.8 
                  ? 'Идеальное соответствие характеристикам'
                  : topSport.match > 0.6
                  ? 'Хорошее соответствие, высокий потенциал'
                  : 'Подходящий вариант для развития'
                }
              </div>
            </section>
          )}

          {/* Питание */}
          <section className="border-2 border-black rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Calculator className="w-6 h-6" />
              <h2 className="text-xl font-bold">Базовый расчет питания</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">BMR</div>
                <div className="text-2xl font-bold font-mono">{nutrition.bmr}</div>
                <div className="text-xs text-gray-500">ккал/день</div>
              </div>
              
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">TDEE</div>
                <div className="text-2xl font-bold font-mono">{nutrition.tdee}</div>
                <div className="text-xs text-gray-500">ккал/день</div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Белки</span>
                <span className="font-mono">{nutrition.macros.protein.grams}г</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Жиры</span>
                <span className="font-mono">{nutrition.macros.fats.grams}г</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Углеводы</span>
                <span className="font-mono">{nutrition.macros.carbs.grams}г</span>
              </div>
            </div>
          </section>

          {/* Навигация */}
          <button
            onClick={() => navigate('/recommendation')}
            className="w-full py-4 bg-black text-white font-bold rounded-lg
                     hover:bg-gray-900 active:scale-95 transition-all"
          >
            Получить полные рекомендации
          </button>
        </div>
      </div>
    </div>
  );
};