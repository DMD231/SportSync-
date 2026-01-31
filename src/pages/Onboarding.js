import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Ruler, Weight, Calendar, Arm } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Onboarding = () => {
  const navigate = useNavigate();
  const setAnthropometry = useStore((state) => state.setAnthropometry);
  
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    age: '',
    limbLength: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!formData.height || formData.height < 100 || formData.height > 250) {
      newErrors.height = 'Рост должен быть от 100 до 250 см';
    }
    
    if (!formData.weight || formData.weight < 30 || formData.weight > 200) {
      newErrors.weight = 'Вес должен быть от 30 до 200 кг';
    }
    
    if (!formData.age || formData.age < 10 || formData.age > 100) {
      newErrors.age = 'Возраст должен быть от 10 до 100 лет';
    }
    
    if (formData.limbLength && (formData.limbLength < 30 || formData.limbLength > 100)) {
      newErrors.limbLength = 'Длина руки должна быть от 30 до 100 см';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      setAnthropometry({
        height: parseInt(formData.height),
        weight: parseInt(formData.weight),
        age: parseInt(formData.age),
        limbLength: formData.limbLength ? parseInt(formData.limbLength) : null
      });
      navigate('/assessment');
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const InputField = ({ icon: Icon, label, field, type = 'number', placeholder }) => (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium">
        <Icon className="w-4 h-4" />
        {label}
      </label>
      <input
        type={type}
        value={formData[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border-2 rounded-lg font-mono text-lg transition-all
          ${errors[field] 
            ? 'border-red-500 bg-red-50' 
            : 'border-black focus:border-black focus:ring-2 focus:ring-black'
          }`}
      />
      {errors[field] && (
        <p className="text-sm text-red-500">{errors[field]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white p-6 max-w-md mx-auto">
      <div className="animate-fade-in">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 tracking-tight">
            СПОРТИВНЫЙ АНАЛИТИК
          </h1>
          <p className="text-gray-600">
            Научный подход к выбору спортивной специализации
          </p>
        </header>

        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Антропометрия</h2>
            <span className="text-sm text-gray-500">Шаг 1 из 4</span>
          </div>
          
          <p className="text-gray-600 mb-8">
            Точные измерения — основа объективного анализа. 
            Все расчеты основаны на научных исследованиях в области спортивной физиологии.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            icon={Ruler}
            label="Рост (см)"
            field="height"
            placeholder="175"
          />
          
          <InputField
            icon={Weight}
            label="Вес (кг)"
            field="weight"
            placeholder="70"
          />
          
          <InputField
            icon={Calendar}
            label="Возраст"
            field="age"
            placeholder="25"
          />
          
          <InputField
            icon={Arm}
            label="Длина руки (см, опционально)"
            field="limbLength"
            placeholder="75"
          />

          <div className="pt-4">
            <button
              type="submit"
              className="w-full group relative py-4 px-6 bg-black text-white rounded-lg font-bold text-lg
                       transition-all hover:bg-gray-900 active:scale-95"
            >
              <span className="flex items-center justify-center gap-2">
                Продолжить
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <p className="text-xs text-gray-500 text-center mt-4">
              Данные хранятся локально и не передаются на сервер
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};