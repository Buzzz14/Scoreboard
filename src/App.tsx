import React, { useState, useEffect } from "react";
import * as LucideIcons from "lucide-react";

interface Score {
  id: string;
  name: string;
  photo: string;
  score: number;
}

interface Game {
  title: string;
  icon: keyof typeof LucideIcons;
  scores: Score[];
}

const initialGames: Game[] = [
  {
    title: "Flappy Bird",
    icon: "Bird",
    scores: [],
  },
  {
    title: "Lane Racer",
    icon: "Car",
    scores: [],
  },
  {
    title: "Tetris",
    icon: "Gamepad2",
    scores: [],
  },
];

const ScoreCard = ({
  score,
  rank,
  onDelete,
  onEdit,
}: {
  score: Score;
  rank: number;
  onDelete: (id: string) => void;
  onEdit: (score: Score) => void;
}) => (
  <div className="flex items-center space-x-4 p-3 rounded-lg bg-white/50 backdrop-blur-sm">
    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center font-bold">
      {rank === 0 ? (
        <LucideIcons.Trophy className="w-6 h-6 text-yellow-500" />
      ) : (
        `#${rank + 1}`
      )}
    </div>
    <img
      src={`${score.photo}?w=100&h=100&fit=crop&crop=faces`}
      alt={score.name}
      className="w-10 h-10 rounded-full object-cover"
    />
    <div className="flex-grow">
      <h3 className="font-medium text-gray-900">{score.name}</h3>
    </div>
    <div className="text-lg font-semibold text-gray-900">
      {score.score.toLocaleString()}
    </div>
    <div className="flex space-x-2">
      <button
        onClick={() => onEdit(score)}
        className="p-1 rounded hover:bg-white/50 transition-colors"
      >
        <LucideIcons.Pencil className="w-4 h-4 text-blue-600" />
      </button>
      <button
        onClick={() => onDelete(score.id)}
        className="p-1 rounded hover:bg-white/50 transition-colors"
      >
        <LucideIcons.Trash2 className="w-4 h-4 text-red-600" />
      </button>
    </div>
  </div>
);

const FirstPlace = ({
  score,
  onDelete,
  onEdit,
}: {
  score: Score;
  onDelete: (id: string) => void;
  onEdit: (score: Score) => void;
}) => (
  <div className="flex flex-col items-center space-y-4 p-6 rounded-xl bg-gradient-to-b from-yellow-100 to-yellow-50 shadow-xl mb-6">
    <LucideIcons.Trophy className="w-12 h-12 text-yellow-500" />
    <img
      src={`${score.photo}?w=200&h=200&fit=crop&crop=faces`}
      alt={score.name}
      className="w-32 h-32 rounded-full object-cover ring-4 ring-yellow-200"
    />
    <div className="text-center">
      <h3 className="text-xl font-bold text-gray-900">{score.name}</h3>
      <div className="text-2xl font-bold text-yellow-600">
        {score.score.toLocaleString()}
      </div>
    </div>
    <div className="flex space-x-3">
      <button
        onClick={() => onEdit(score)}
        className="p-2 rounded-full hover:bg-white/50 transition-colors"
      >
        <LucideIcons.Pencil className="w-5 h-5 text-blue-600" />
      </button>
      <button
        onClick={() => onDelete(score.id)}
        className="p-2 rounded-full hover:bg-white/50 transition-colors"
      >
        <LucideIcons.Trash2 className="w-5 h-5 text-red-600" />
      </button>
    </div>
  </div>
);

const GameSection = ({
  title,
  icon,
  scores,
  onAddScore,
  onUpdateScore,
  onDeleteScore,
}: {
  title: string;
  icon: keyof typeof LucideIcons;
  scores: Score[];
  onAddScore: (score: Score) => void;
  onUpdateScore: (score: Score) => void;
  onDeleteScore: (id: string) => void;
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingScore, setEditingScore] = useState<Score | null>(null);
  const [newScore, setNewScore] = useState({
    id: "",
    name: "",
    photo: "",
    score: 0,
  });

  const Icon =
    (LucideIcons[icon] as React.FC<React.SVGProps<SVGSVGElement>>) ||
    LucideIcons.Gamepad2;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingScore) {
      onUpdateScore({ ...newScore, id: editingScore.id });
    } else {
      onAddScore({ ...newScore, id: crypto.randomUUID() });
    }
    setNewScore({ id: "", name: "", photo: "", score: 0 });
    setEditingScore(null);
    setShowForm(false);
  };

  const handleEdit = (score: Score) => {
    setEditingScore(score);
    setNewScore(score);
    setShowForm(true);
  };

  return (
    <div className="bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-lg rounded-xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingScore(null);
            setNewScore({ id: "", name: "", photo: "", score: 0 });
          }}
          className="p-2 rounded-full hover:bg-white/50 transition-colors"
        >
          <LucideIcons.Plus className="w-5 h-5 text-indigo-600" />
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 space-y-4 bg-white/70 p-4 rounded-lg"
        >
          <div>
            <input
              type="text"
              placeholder="Player Name"
              value={newScore.name}
              onChange={(e) =>
                setNewScore({ ...newScore, name: e.target.value })
              }
              className="w-full p-2 rounded border border-gray-300"
              required
            />
          </div>
          <div>
            <input
              type="url"
              placeholder="Photo URL"
              value={newScore.photo}
              onChange={(e) =>
                setNewScore({ ...newScore, photo: e.target.value })
              }
              className="w-full p-2 rounded border border-gray-300"
              required
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Score"
              value={newScore.score || ""}
              onChange={(e) => {
                const value = e.target.value;
                setNewScore({
                  ...newScore,
                  score: value === "" ? 0 : parseInt(value),
                });
              }}
                className="w-full p-2 rounded border border-gray-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors"
          >
            {editingScore ? "Update Score" : "Add Score"}
          </button>
        </form>
      )}

      {scores.length > 0 && (
        <FirstPlace
          score={scores[0]}
          onDelete={onDeleteScore}
          onEdit={handleEdit}
        />
      )}

      <div className="space-y-3">
        {scores.slice(1).map((score, index) => (
          <ScoreCard
            key={score.id}
            score={score}
            rank={index + 1}
            onDelete={onDeleteScore}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

function App() {
  const [games, setGames] = useState<Game[]>(() => {
    const saved = localStorage.getItem("leaderboards");
    return saved ? JSON.parse(saved) : initialGames;
  });

  useEffect(() => {
    if (games.length > 0) {
      localStorage.setItem("leaderboards", JSON.stringify(games));
    }
  }, [games]);

  const handleAddScore = (gameTitle: string, newScore: Score) => {
    setGames((prevGames) => {
      return prevGames.map((game) => {
        if (game.title === gameTitle) {
          const newScores = [...game.scores, newScore]
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);
          return { ...game, scores: newScores };
        }
        return game;
      });
    });
  };

  const handleUpdateScore = (gameTitle: string, updatedScore: Score) => {
    setGames((prevGames) => {
      return prevGames.map((game) => {
        if (game.title === gameTitle) {
          const newScores = game.scores
            .map((score) =>
              score.id === updatedScore.id ? updatedScore : score
            )
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);
          return { ...game, scores: newScores };
        }
        return game;
      });
    });
  };

  const handleDeleteScore = (gameTitle: string, scoreId: string) => {
    setGames((prevGames) => {
      return prevGames.map((game) => {
        if (game.title === gameTitle) {
          return {
            ...game,
            scores: game.scores.filter((score) => score.id !== scoreId),
          };
        }
        return game;
      });
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Game Leaderboards
          </h1>
          <p className="text-gray-600">Top players across all our games</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <GameSection
              key={game.title}
              {...game}
              onAddScore={(score) => handleAddScore(game.title, score)}
              onUpdateScore={(score) => handleUpdateScore(game.title, score)}
              onDeleteScore={(id) => handleDeleteScore(game.title, id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
