
import React from 'react';

interface PredictionCardProps {
  icon: React.ReactNode;
  title: string;
  prediction: string;
}

const PredictionCard: React.FC<PredictionCardProps> = ({ icon, title, prediction }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
      <div className="flex items-center mb-4">
        <div className="bg-purple-500/20 text-purple-300 p-3 rounded-full mr-4">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-gray-300 leading-relaxed">{prediction}</p>
    </div>
  );
};

export default PredictionCard;
