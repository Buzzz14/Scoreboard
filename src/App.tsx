import React from 'react';
import { Trophy, Bird, Car, Gamepad2 } from 'lucide-react';

interface Score {
  name: string;
  photo: string;
  score: number;
}

const games = [
  {
    title: 'Flappy Bird',
    icon: Bird,
    scores: [
      { name: 'Sarah Chen', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330', score: 156 },
      { name: 'Mike Ross', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e', score: 143 },
      { name: 'Emma Wilson', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80', score: 128 }
    ]
  },
  {
    title: 'Lane Racer',
    icon: Car,
    scores: [
      { name: 'John Doe', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e', score: 2345 },
      { name: 'Lisa Wang', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2', score: 2156 },
      { name: 'Tom Baker', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d', score: 1987 }
    ]
  },
  {
    title: 'Tetris',
    icon: Gamepad2,
    scores: [
      { name: 'Alex Kim', photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6', score: 45670 },
      { name: 'Rachel Green', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9', score: 42350 },
      { name: 'David Zhang', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d', score: 39980 }
    ]
  }
];

const ScoreCard = ({ score, rank }: { score: Score; rank: number }) => (
  <div className="flex items-center space-x-4 p-3 rounded-lg bg-white/50 backdrop-blur-sm">
    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center font-bold">
      {rank === 0 ? <Trophy className="w-6 h-6 text-yellow-500" /> : `#${rank + 1}`}
    </div>
    <img
      src={`${score.photo}?w=100&h=100&fit=crop&crop=faces`}
      alt={score.name}
      className="w-10 h-10 rounded-full object-cover"
    />
    <div className="flex-grow">
      <h3 className="font-medium text-gray-900">{score.name}</h3>
    </div>
    <div className="text-lg font-semibold text-gray-900">{score.score.toLocaleString()}</div>
  </div>
);

const GameSection = ({ title, icon: Icon, scores }: { title: string; icon: any; scores: Score[] }) => (
  <div className="bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-lg rounded-xl p-6 shadow-xl">
    <div className="flex items-center space-x-3 mb-6">
      <Icon className="w-6 h-6 text-indigo-600" />
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
    </div>
    <div className="space-y-3">
      {scores.map((score, index) => (
        <ScoreCard key={score.name} score={score} rank={index} />
      ))}
    </div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Game Leaderboards</h1>
          <p className="text-gray-600">Top players across all our games</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <GameSection key={game.title} {...game} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;