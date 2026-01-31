/**
 * Спортивный аналитический алгоритм
 * Версия 1.0.0
 */

// Константы для нормализации
const SCALE_CONSTANTS = {
  REACTION_MIN: 150,  // мс (мировой рекорд)
  REACTION_MAX: 500,  // мс (ниже среднего)
  BREATH_MIN: 30,     // секунд
  BREATH_MAX: 300,    // секунд
  WALK_MIN: 4,        // минуты на км
  WALK_MAX: 15,       // минуты на км
  AGE_PEAK: 28,       // пик физической формы
  LIMB_RATIO_IDEAL: 0.46 // идеальное соотношение конечностей
};

// База данных видов спорта с весами характеристик
export const SPORTS_DATABASE = [
  {
    id: 'boxing',
    name: 'Бокс',
    positions: [
      { id: 'flyweight', name: 'Наилегчайший вес', weight: '48-51кг' },
      { id: 'welterweight', name: 'Полусредний вес', weight: '63.5-67кг' },
      { id: 'heavyweight', name: 'Тяжелый вес', weight: '90.7+кг' }
    ],
    requirements: {
      strength: { weight: 0.25, min: 0.6 },
      agility: { weight: 0.30, min: 0.7 },
      intelligence: { weight: 0.15, min: 0.5 },
      endurance: { weight: 0.30, min: 0.8 },
      reaction: { weight: 0.35, min: 0.7 },
      heightImpact: 0.3,
      weightImpact: 0.4,
      limbRatio: 0.25,
      psychotype: ['solo', 'aggressive'],
      idealBMI: [19, 25]
    },
    trainingPlan: {
      frequency: '5 раз в неделю',
      focus: ['Ударная техника', 'Ноги', 'Выносливость', 'Силовая подготовка'],
      duration: '90-120 минут'
    }
  },
  {
    id: 'swimming',
    name: 'Плавание',
    positions: [
      { id: 'sprinter', name: 'Спринтер', distance: '50-100м' },
      { id: 'mid', name: 'Средние дистанции', distance: '200-400м' },
      { id: 'distance', name: 'Стайер', distance: '800-1500м' }
    ],
    requirements: {
      strength: { weight: 0.20, min: 0.5 },
      agility: { weight: 0.25, min: 0.6 },
      intelligence: { weight: 0.15, min: 0.4 },
      endurance: { weight: 0.40, min: 0.85 },
      reaction: { weight: 0.20, min: 0.6 },
      heightImpact: 0.4,
      weightImpact: 0.2,
      limbRatio: 0.35,
      psychotype: ['solo', 'disciplined'],
      idealBMI: [18.5, 24]
    }
  },
  {
    id: 'soccer',
    name: 'Футбол',
    positions: [
      { id: 'goalkeeper', name: 'Вратарь' },
      { id: 'defender', name: 'Защитник' },
      { id: 'midfielder', name: 'Полузащитник' },
      { id: 'forward', name: 'Нападающий' }
    ],
    requirements: {
      strength: { weight: 0.20, min: 0.5 },
      agility: { weight: 0.30, min: 0.65 },
      intelligence: { weight: 0.25, min: 0.6 },
      endurance: { weight: 0.25, min: 0.75 },
      reaction: { weight: 0.25, min: 0.65 },
      heightImpact: 0.2,
      weightImpact: 0.3,
      limbRatio: 0.15,
      psychotype: ['team', 'communicative'],
      idealBMI: [20, 26]
    }
  },
  {
    id: 'basketball',
    name: 'Баскетбол',
    positions: [
      { id: 'point', name: 'Разыгрывающий' },
      { id: 'shooting', name: 'Атакующий защитник' },
      { id: 'small', name: 'Легкий форвард' },
      { id: 'power', name: 'Тяжелый форвард' },
      { id: 'center', name: 'Центровой' }
    ],
    requirements: {
      strength: { weight: 0.25, min: 0.6 },
      agility: { weight: 0.25, min: 0.7 },
      intelligence: { weight: 0.20, min: 0.55 },
      endurance: { weight: 0.20, min: 0.7 },
      reaction: { weight: 0.25, min: 0.65 },
      heightImpact: 0.5,
      weightImpact: 0.25,
      limbRatio: 0.4,
      psychotype: ['team', 'tall'],
      idealBMI: [21, 27]
    }
  },
  {
    id: 'chess',
    name: 'Шахматы',
    positions: [
      { id: 'attacker', name: 'Атакующий стиль' },
      { id: 'defender', name: 'Защитный стиль' },
      { id: 'universal', name: 'Универсал' }
    ],
    requirements: {
      strength: { weight: 0.05, min: 0.1 },
      agility: { weight: 0.10, min: 0.2 },
      intelligence: { weight: 0.70, min: 0.8 },
      endurance: { weight: 0.10, min: 0.4 },
      reaction: { weight: 0.15, min: 0.5 },
      heightImpact: 0,
      weightImpact: 0,
      limbRatio: 0,
      psychotype: ['solo', 'analytical'],
      idealBMI: [18.5, 25]
    }
  },
  {
    id: 'crossfit',
    name: 'Кроссфит',
    positions: [
      { id: 'specialist', name: 'Специалист' },
      { id: 'generalist', name: 'Универсал' }
    ],
    requirements: {
      strength: { weight: 0.35, min: 0.75 },
      agility: { weight: 0.25, min: 0.7 },
      intelligence: { weight: 0.15, min: 0.5 },
      endurance: { weight: 0.25, min: 0.8 },
      reaction: { weight: 0.20, min: 0.6 },
      heightImpact: 0.15,
      weightImpact: 0.35,
      limbRatio: 0.2,
      psychotype: ['solo', 'competitive'],
      idealBMI: [22, 28]
    }
  },
  {
    id: 'tennis',
    name: 'Теннис',
    positions: [
      { id: 'baseline', name: 'Бэккортный игрок' },
      { id: 'serve-volley', name: 'Подача-выход к сетке' },
      { id: 'all-court', name: 'Универсал' }
    ],
    requirements: {
      strength: { weight: 0.20, min: 0.6 },
      agility: { weight: 0.30, min: 0.75 },
      intelligence: { weight: 0.20, min: 0.6 },
      endurance: { weight: 0.20, min: 0.7 },
      reaction: { weight: 0.30, min: 0.8 },
      heightImpact: 0.25,
      weightImpact: 0.2,
      limbRatio: 0.3,
      psychotype: ['solo', 'competitive'],
      idealBMI: [19, 25]
    }
  }
];

/**
 * Нормализация значения в диапазон 0-1
 */
const normalize = (value, min, max, invert = false) => {
  const normalized = (value - min) / (max - min);
  const clamped = Math.max(0, Math.min(1, normalized));
  return invert ? 1 - clamped : clamped;
};

/**
 * Расчет характеристик пользователя
 */
export const calculateTraits = (userData) => {
  const {
    height,      // см
    weight,      // кг
    age,         // лет
    limbLength,  // см (длина руки)
    reactionTime,// мс
    walkingPace, // мин/км
    breathHold,  // секунды
    psychotype   // ['team', 'solo', 'mixed']
  } = userData;

  // 1. Расчет силы (на основе антропометрии)
  const BMI = weight / ((height / 100) ** 2);
  const bmiScore = normalize(BMI, 18.5, 28);
  const ageStrengthFactor = 1 - Math.abs(age - SCALE_CONSTANTS.AGE_PEAK) / 50;
  const strength = (bmiScore * 0.6 + ageStrengthFactor * 0.4) * 0.9;

  // 2. Расчет ловкости (реакция + пропорции)
  const reactionScore = normalize(reactionTime, 
    SCALE_CONSTANTS.REACTION_MIN, 
    SCALE_CONSTANTS.REACTION_MAX, 
    true
  );
  
  let limbRatioScore = 0.5;
  if (limbLength) {
    const limbRatio = limbLength / height;
    limbRatioScore = 1 - Math.abs(limbRatio - SCALE_CONSTANTS.LIMB_RATIO_IDEAL) * 3;
  }
  
  const agility = (reactionScore * 0.7 + limbRatioScore * 0.3) * 0.95;

  // 3. Расчет интеллекта (реакция + возраст + психотип)
  const reactionIntelligence = 1 - normalize(reactionTime, 
    SCALE_CONSTANTS.REACTION_MIN, 
    SCALE_CONSTANTS.REACTION_MAX
  ) * 0.5;
  
  const ageIntelligence = normalize(Math.min(age, 50), 18, 50) * 0.3;
  const psychotypeIntelligence = psychotype === 'analytical' ? 0.2 : 
                                psychotype === 'mixed' ? 0.1 : 0;
  
  const intelligence = (reactionIntelligence + ageIntelligence + psychotypeIntelligence) * 0.85;

  // 4. Расчет выносливости (темп ходьбы + задержка дыхания)
  const walkingScore = normalize(walkingPace, 
    SCALE_CONSTANTS.WALK_MIN, 
    SCALE_CONSTANTS.WALK_MAX, 
    true
  );
  
  const breathScore = normalize(breathHold, 
    SCALE_CONSTANTS.BREATH_MIN, 
    SCALE_CONSTANTS.BREATH_MAX
  );
  
  const bmiEndurance = normalize(BMI, 18.5, 25, true);
  const endurance = (walkingScore * 0.4 + breathScore * 0.4 + bmiEndurance * 0.2) * 0.9;

  return {
    strength: Math.round(strength * 100) / 100,
    agility: Math.round(agility * 100) / 100,
    intelligence: Math.round(intelligence * 100) / 100,
    endurance: Math.round(endurance * 100) / 100,
    raw: { strength, agility, intelligence, endurance }
  };
};

/**
 * Расчет соответствия виду спорта
 */
export const calculateSportMatch = (traits, userData, sport) => {
  const requirements = sport.requirements;
  const userTraits = traits.raw;
  
  // Проверка минимальных требований
  const meetsMinimum = 
    userTraits.strength >= requirements.strength.min &&
    userTraits.agility >= requirements.agility.min &&
    userTraits.intelligence >= requirements.intelligence.min &&
    userTraits.endurance >= requirements.endurance.min;
  
  if (!meetsMinimum) return { score: 0, position: null, details: {} };

  // Расчет общего скора
  const traitScore = 
    userTraits.strength * requirements.strength.weight +
    userTraits.agility * requirements.agility.weight +
    userTraits.intelligence * requirements.intelligence.weight +
    userTraits.endurance * requirements.endurance.weight;
  
  // Антропометрические факторы
  const heightScore = requirements.heightImpact > 0 ? 
    normalize(userData.height, 160, 210) * requirements.heightImpact : 0;
  
  const weightScore = requirements.weightImpact > 0 ? 
    normalize(userData.weight, 50, 120) * requirements.weightImpact : 0;
  
  const bmi = userData.weight / ((userData.height / 100) ** 2);
  const bmiInRange = bmi >= requirements.idealBMI[0] && bmi <= requirements.idealBMI[1];
  const bmiScore = bmiInRange ? 0.1 : 0;
  
  // Психотип соответствие
  const psychotypeMatch = requirements.psychotype.includes(userData.psychotype) ? 0.15 : 0;
  
  // Итоговый скор
  const totalScore = traitScore + heightScore + weightScore + bmiScore + psychotypeMatch;
  
  // Подбор позиции
  let position = sport.positions[0];
  if (sport.id === 'basketball') {
    position = userData.height > 195 ? 
      sport.positions.find(p => p.id === 'center') : 
      sport.positions.find(p => p.id === 'point');
  } else if (sport.id === 'boxing') {
    if (userData.weight < 57) position = sport.positions[0];
    else if (userData.weight < 67) position = sport.positions[1];
    else position = sport.positions[2];
  } else if (sport.id === 'swimming') {
    position = traits.raw.endurance > 0.8 ? 
      sport.positions.find(p => p.id === 'distance') :
      sport.positions.find(p => p.id === 'sprinter');
  }
  
  return {
    score: Math.round(totalScore * 100) / 100,
    position,
    details: {
      traitScore: Math.round(traitScore * 100) / 100,
      heightScore: Math.round(heightScore * 100) / 100,
      weightScore: Math.round(weightScore * 100) / 100,
      bmiScore,
      psychotypeMatch
    }
  };
};

/**
 * Основная функция рекомендации
 */
export const getSportRecommendations = (userData) => {
  const traits = calculateTraits(userData);
  
  const recommendations = SPORTS_DATABASE.map(sport => {
    const match = calculateSportMatch(traits, userData, sport);
    return {
      sport,
      match: match.score,
      position: match.position,
      details: match.details,
      traits: traits
    };
  })
  .filter(rec => rec.match > 0.5)
  .sort((a, b) => b.match - a.match);
  
  return {
    topRecommendation: recommendations[0],
    allRecommendations: recommendations,
    userTraits: traits
  };
};

/**
 * Расчет BMR и макронутриентов
 */
export const calculateNutrition = (userData, activityLevel = 1.55) => {
  const { weight, height, age } = userData;
  
  // Формула Миффлина-Сан Жеора
  const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  const tdee = bmr * activityLevel;
  
  // Распределение макронутриентов (белки, жиры, углеводы)
  const proteinGrams = Math.round(weight * 1.8); // 1.8г/кг для активных
  const proteinCalories = proteinGrams * 4;
  
  const fatCalories = tdee * 0.25; // 25% от калорий
  const fatGrams = Math.round(fatCalories / 9);
  
  const remainingCalories = tdee - proteinCalories - fatCalories;
  const carbGrams = Math.round(remainingCalories / 4);
  
  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    macros: {
      protein: { grams: proteinGrams, calories: proteinCalories },
      fats: { grams: fatGrams, calories: fatCalories },
      carbs: { grams: carbGrams, calories: remainingCalories }
    },
    mealsPerDay: 4,
    waterPerDay: Math.round(weight * 0.035) // литров
  };
};

/**
 * Генерация тренировочного плана
 */
export const generateTrainingPlan = (sport, position, level = 'beginner') => {
  const plans = {
    beginner: {
      frequency: '3 раза в неделю',
      duration: '60 минут',
      focus: ['Базовая техника', 'Общая физическая подготовка', 'Развитие выносливости']
    },
    intermediate: {
      frequency: '4-5 раз в неделю',
      duration: '90 минут',
      focus: ['Специализация', 'Интенсивные тренировки', 'Тактическая подготовка']
    },
    advanced: {
      frequency: '5-6 раз в неделю',
      duration: '120+ минут',
      focus: ['Соревновательная подготовка', 'Пиковая форма', 'Психологическая подготовка']
    }
  };
  
  const basePlan = plans[level];
  
  // Специфичные для спорта упражнения
  const sportSpecific = {
    boxing: ['Работа на груше', 'Спарринги', 'Скакалка', 'Бой с тенью'],
    swimming: ['Техника гребка', 'Дыхание', 'Повороты', 'Старты'],
    soccer: ['Дриблинг', 'Удары по воротам', 'Тактические схемы', 'Игровые ситуации'],
    basketball: ['Броски', 'Дриблинг', 'Пас', 'Игра в защите'],
    chess: ['Тактические задачи', 'Дебюты', 'Эндшпиль', 'Анализ партий'],
    crossfit: ['WOD', 'Олимпийская тяжелая атлетика', 'Гимнастика', 'Кардио'],
    tennis: ['Подача', 'Удар с лета', 'Игра у сетки', 'Работа ног']
  };
  
  return {
    ...basePlan,
    sportSpecific: sportSpecific[sport.id] || [],
    recovery: ['Растяжка', 'Фоам роллинг', 'Массаж', 'Активное восстановление'],
    periodization: level === 'advanced' ? 'Волнообразная' : 'Линейная'
  };
};