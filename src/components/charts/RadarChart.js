import React from 'react';
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';

export const RadarChart = ({ data }) => {
  const chartData = [
    { subject: 'Сила', value: data.strength, fullMark: 1 },
    { subject: 'Ловкость', value: data.agility, fullMark: 1 },
    { subject: 'Интеллект', value: data.intelligence, fullMark: 1 },
    { subject: 'Выносливость', value: data.endurance, fullMark: 1 },
    { subject: 'Реакция', value: data.reaction || 0.5, fullMark: 1 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsRadarChart data={chartData}>
        <PolarGrid 
          stroke="#e5e7eb" 
          strokeWidth={1}
        />
        <PolarAngleAxis 
          dataKey="subject" 
          tick={{ fill: '#000', fontSize: 12, fontWeight: 500 }}
        />
        <PolarRadiusAxis 
          angle={90} 
          domain={[0, 1]}
          tick={{ fill: '#666', fontSize: 10 }}
          tickCount={6}
        />
        <Radar
          name="Характеристики"
          dataKey="value"
          stroke="#000"
          fill="#000"
          fillOpacity={0.3}
          strokeWidth={2}
        />
      </RechartsRadarChart>
    </ResponsiveContainer>
  );
};

export const TraitBar = ({ label, value, max = 1 }) => {
  const percentage = (value / max) * 100;
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="font-mono">{Math.round(value * 100)}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-black rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};