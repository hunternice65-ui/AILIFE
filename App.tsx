
import React, { useState } from 'react';
import { getFortune } from './services/geminiService';
import type { Prediction } from './types';
import PredictionCard from './components/PredictionCard';
import MoneyIcon from './components/icons/MoneyIcon';
import BriefcaseIcon from './components/icons/BriefcaseIcon';
import HeartIcon from './components/icons/HeartIcon';
import StarIcon from './components/icons/StarIcon';
import LoadingSpinner from './components/icons/LoadingSpinner';
import HealthIcon from './components/icons/HealthIcon';
import PaletteIcon from './components/icons/PaletteIcon';
import TagIcon from './components/icons/TagIcon';
import ZodiacIcon from './components/icons/ZodiacIcon';
import LightBulbIcon from './components/icons/LightBulbIcon';

const App: React.FC = () => {
  const [dob, setDob] = useState<string>('');
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDob(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!dob) {
      setError('กรุณาเลือกวันเดือนปีเกิดของคุณ');
      return;
    }
    setIsLoading(true);
    setError(null);
    setPrediction(null);
    try {
      const result = await getFortune(dob);
      setPrediction(result);
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการทำนายดวงชะตา กรุณาลองใหม่อีกครั้ง');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white p-4 sm:p-6 md:p-8 flex flex-col items-center">
      <main className="w-full max-w-4xl mx-auto">
        <header className="text-center my-8">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
            ดูดวงชะตา AI
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            กรอกวันเดือนปีเกิดของคุณ แล้วให้ AI ทำนายอนาคตของคุณในทุกๆ ด้าน
          </p>
        </header>

        <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/20">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full">
              <label htmlFor="dob" className="sr-only">วันเดือนปีเกิด</label>
              <input
                type="date"
                id="dob"
                value={dob}
                onChange={handleDateChange}
                className="w-full p-4 bg-gray-800/50 text-white placeholder-gray-400 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto flex-shrink-0 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
            >
              {isLoading && <LoadingSpinner />}
              {isLoading ? 'กำลังทำนาย...' : 'ทำนายดวงชะตา'}
            </button>
          </form>
          {error && <p className="mt-4 text-center text-red-400">{error}</p>}
        </div>

        {prediction && (
          <div className="mt-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-8">คำทำนายสำหรับคุณ</h2>
            
            <div className="mb-8 flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 text-lg">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-lg p-3 px-5 rounded-full border border-white/20">
                    <ZodiacIcon />
                    <span className="font-bold">ราศี:</span>
                    <span className="text-purple-300 font-semibold">{prediction.zodiac}</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-lg p-3 px-5 rounded-full border border-white/20">
                    <PaletteIcon />
                    <span className="font-bold">สีมงคล:</span>
                    <span className="text-purple-300 font-semibold">{prediction.luckyColor}</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-lg p-3 px-5 rounded-full border border-white/20">
                    <TagIcon />
                    <span className="font-bold">เลขนำโชค:</span>
                    <span className="text-purple-300 font-semibold">{prediction.luckyNumber}</span>
                </div>
            </div>

            <div className="mb-6">
                <PredictionCard
                    icon={<LightBulbIcon />}
                    title="คำแนะนำประจำวัน"
                    prediction={prediction.dailyAdvice}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PredictionCard
                icon={<MoneyIcon />}
                title="การเงิน"
                prediction={prediction.finance}
              />
              <PredictionCard
                icon={<BriefcaseIcon />}
                title="การงาน"
                prediction={prediction.work}
              />
              <PredictionCard
                icon={<HeartIcon />}
                title="ความรัก"
                prediction={prediction.love}
              />
              <PredictionCard
                icon={<StarIcon />}
                title="โชคลาภ"
                prediction={prediction.luck}
              />
              <PredictionCard
                icon={<HealthIcon />}
                title="สุขภาพ"
                prediction={prediction.health}
              />
            </div>
          </div>
        )}
      </main>
       <footer className="w-full max-w-4xl mx-auto text-center py-6 mt-8 text-gray-400 text-sm">
        <p>คำทำนายนี้สร้างโดยปัญญาประดิษฐ์ โปรดใช้วิจารณญาณในการรับข้อมูล</p>
      </footer>
    </div>
  );
};

export default App;
