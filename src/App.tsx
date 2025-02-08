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

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
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

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity"></div>
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-4 sm:p-6 transform transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <LucideIcons.X className="w-5 h-5" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

const ScoreForm = ({
  onSubmit,
  onCancel,
  initialData,
  isEditing,
}: {
  onSubmit: (data: Omit<Score, "id">) => void;
  onCancel: () => void;
  initialData?: Score;
  isEditing: boolean;
}) => {
  const [formData, setFormData] = useState<Omit<Score, "id">>({
    name: initialData?.name || "",
    photo: initialData?.photo || "", // Accepts URL now
    score: initialData?.score || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Player Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 rounded border border-gray-300"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image URL
        </label>
        <input
          type="url"
          value={formData.photo}
          onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
          className="w-full p-2 rounded border border-gray-300"
          required
        />
        {formData.photo && (
          <img
            src={formData.photo}
            alt="Preview"
            className="mt-2 w-20 h-20 object-cover rounded-full"
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Score
        </label>
        <input
          type="number"
          value={formData.score || ""}
          onChange={(e) => setFormData({ ...formData, score: parseInt(e.target.value) || 0 })}
          className="w-full p-2 rounded border border-gray-300"
          required
        />
      </div>

      <div className="flex space-x-3 pt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">
          {isEditing ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

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
  <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 p-3 rounded-lg bg-white/50 backdrop-blur-sm">
    <div className="flex items-center space-x-4 w-full sm:w-auto">
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
    </div>
    <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-4">
      <div className="text-lg font-semibold text-gray-900">
        {score.score.toLocaleString()}
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(score)}
          className="p-1 rounded hover:bg-white/50 transition-colors cursor-pointer"
        >
          <LucideIcons.Pencil className="w-4 h-4 text-blue-600" />
        </button>
        <button
          onClick={() => onDelete(score.id)}
          className="p-1 rounded hover:bg-white/50 transition-colors cursor-pointer"
        >
          <LucideIcons.Trash2 className="w-4 h-4 text-red-600" />
        </button>
      </div>
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
  <div className="flex flex-col items-center space-y-4 p-4 sm:p-6 rounded-xl bg-gradient-to-b from-yellow-100 to-yellow-50 shadow-xl mb-6">
    <LucideIcons.Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-500" />
    <img
      src={`${score.photo}?w=200&h=200&fit=crop&crop=faces`}
      alt={score.name}
      className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover ring-4 ring-yellow-200"
    />
    <div className="text-center">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900">{score.name}</h3>
      <div className="text-xl sm:text-2xl font-bold text-yellow-600">
        {score.score.toLocaleString()}
      </div>
    </div>
    <div className="flex space-x-3">
      <button
        onClick={() => onEdit(score)}
        className="p-2 rounded-full hover:bg-white/50 transition-colors cursor-pointer"
      >
        <LucideIcons.Pencil className="w-5 h-5 text-blue-600" />
      </button>
      <button
        onClick={() => onDelete(score.id)}
        className="p-2 rounded-full hover:bg-white/50 transition-colors cursor-pointer"
      >
        <LucideIcons.Trash2 className="w-5 h-5 text-red-600" />
      </button>
    </div>
  </div>
);

function App() {
  const [games, setGames] = useState<Game[]>(() => {
    const saved = localStorage.getItem("leaderboards");
    return saved ? JSON.parse(saved) : initialGames;
  });

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    gameTitle: string;
    editingScore: Score | null;
  }>({
    isOpen: false,
    gameTitle: "",
    editingScore: null,
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

  const openModal = (gameTitle: string, editingScore: Score | null = null) => {
    setModalState({
      isOpen: true,
      gameTitle,
      editingScore,
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      gameTitle: "",
      editingScore: null,
    });
  };

  const handleModalSubmit = (data: Omit<Score, "id">) => {
    if (modalState.editingScore) {
      handleUpdateScore(modalState.gameTitle, {
        ...data,
        id: modalState.editingScore.id,
      });
    } else {
      handleAddScore(modalState.gameTitle, { ...data, id: crypto.randomUUID() });
    }
    closeModal();
  };

  const GameSection = ({ title, icon, scores }: Game) => {
    const Icon =
      (LucideIcons[icon] as React.FC<React.SVGProps<SVGSVGElement>>) ||
      LucideIcons.Gamepad2;

    return (
      <div className="bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-lg rounded-xl p-4 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">{title}</h2>
          </div>
          <button
            onClick={() => openModal(title)}
            className="p-2 rounded-full hover:bg-white/50 transition-colors cursor-pointer"
          >
            <LucideIcons.Plus className="w-5 h-5 text-indigo-600" />
          </button>
        </div>

        {scores.length > 0 && (
          <FirstPlace
            score={scores[0]}
            onDelete={(id) => handleDeleteScore(title, id)}
            onEdit={(score) => openModal(title, score)}
          />
        )}

        <div className="space-y-3">
          {scores.slice(1).map((score, index) => (
            <ScoreCard
              key={score.id}
              score={score}
              rank={index + 1}
              onDelete={(id) => handleDeleteScore(title, id)}
              onEdit={(score) => openModal(title, score)}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Game Leaderboards
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Top players across all our games
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {games.map((game) => (
            <GameSection key={game.title} {...game} />
          ))}
        </div>
      </div>

      <Modal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.editingScore ? "Edit Score" : "Add New Score"}
      >
        <ScoreForm
          onSubmit={handleModalSubmit}
          onCancel={closeModal}
          initialData={modalState.editingScore || undefined}
          isEditing={!!modalState.editingScore}
        />
      </Modal>
    </div>
  );
}

export default App;