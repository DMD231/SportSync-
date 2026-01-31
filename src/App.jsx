import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Onboarding } from './pages/Onboarding';
import { AssessmentHub } from './pages/AssessmentHub';
import { ProfileStats } from './pages/ProfileStats';
import { RecommendationEngine } from './pages/RecommendationEngine';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans">
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/assessment" element={<AssessmentHub />} />
          <Route path="/profile" element={<ProfileStats />} />
          <Route path="/recommendation" element={<RecommendationEngine />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;