
import { useState, type FormEvent } from 'react';
import {
  LayoutDashboard,
  Heart,
  Target,
  CalendarDays,
  ChartNoAxesCombined,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  Check,
  Plus,
  Trash2,
} from 'lucide-react';
import './App.css';

type Habit = {
  id: number;
  name: string;
  description: string;
  completed: boolean;
};

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [habits, setHabits] = useState<Habit[]>([
    {
      id: 1,
      name: 'Drink water',
      description: 'Drink 8 glasses of water',
      completed: false,
    },
    {
      id: 2,
      name: 'Read for 20 minutes',
      description: 'Spend some time reading',
      completed: false,
    },
    {
      id: 3,
      name: 'Exercise',
      description: 'Move your body today',
      completed: false,
    },
  ]);

  const [newHabitName, setNewHabitName] = useState('');
  const [habitError, setHabitError] = useState('');

  const completedCount = habits.filter(
    (habit) => habit.completed
  ).length;

  const totalHabits = habits.length;

  const progressPercentage =
    totalHabits === 0
      ? 0
      : (completedCount / totalHabits) * 100;

  function toggleHabit(id: number) {
    setHabits((currentHabits) =>
      currentHabits.map((habit) =>
        habit.id === id
          ? { ...habit, completed: !habit.completed }
          : habit
      )
    );
  }

  function addHabit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = newHabitName.trim();

    if (!trimmedName) {
      setHabitError('Please enter a habit name.');
      return;
    }

    const newHabit: Habit = {
      id: Date.now(),
      name: trimmedName,
      description: 'Your new daily habit',
      completed: false,
    };

    setHabits((currentHabits) => [
      ...currentHabits,
      newHabit,
    ]);

    setNewHabitName('');
    setHabitError('');
  }

  function deleteHabit(id: number) {
    setHabits((currentHabits) =>
      currentHabits.filter((habit) => habit.id !== id)
    );
  }

  return (
    <div className="app-layout">
      <aside
        className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}
      >
        <div className="brand">
          <span className="brand-icon">✿</span>
          <span className="brand-name">Ethos</span>

          <button
            className="sidebar-toggle"
            type="button"
            onClick={() =>
              setIsSidebarCollapsed((current) => !current)
            }
            aria-label="Toggle sidebar"
            aria-expanded={!isSidebarCollapsed}
            title="Toggle sidebar"
          >
            {isSidebarCollapsed ? (
              <PanelLeftOpen size={20} />
            ) : (
              <PanelLeftClose size={20} />
            )}
          </button>
        </div>

        <nav className="sidebar-nav">
          <a className="active" href="#overview" title="Overview">
            <LayoutDashboard size={20} />
            <span className="nav-label">Overview</span>
          </a>

          <a href="#habits" title="My Habits">
            <Heart size={20} />
            <span className="nav-label">My Habits</span>
          </a>

          <a href="#goals" title="Goals">
            <Target size={20} />
            <span className="nav-label">Goals</span>
          </a>

          <a href="#calendar" title="Calendar">
            <CalendarDays size={20} />
            <span className="nav-label">Calendar</span>
          </a>

          <a href="#analytics" title="Analytics">
            <ChartNoAxesCombined size={20} />
            <span className="nav-label">Analytics</span>
          </a>
        </nav>

        <div className="sidebar-bottom">
          <a href="#settings" title="Settings">
            <Settings size={20} />
            <span className="nav-label">Settings</span>
          </a>
        </div>
      </aside>

      <main className="dashboard" id="overview">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">YOUR PERSONAL SPACE</p>
            <h1>Good morning!</h1>
            <p>Let's make today count.</p>
          </div>

          <div className="profile-placeholder">SP</div>
        </header>

        <section className="summary-grid">
          <div className="summary-card">
            <p>Habits completed</p>
            <h2>
              {completedCount} / {totalHabits}
            </h2>
          </div>

          <div className="summary-card">
            <p>Current streak</p>
            <h2>0 days</h2>
          </div>

          <div className="summary-card">
            <p>Active goals</p>
            <h2>0</h2>
          </div>
        </section>

        <section className="content-grid">
          <div className="panel" id="habits">
            <div className="panel-header">
              <div>
                <h2>Today's habits</h2>
                <p>Small steps make a big difference.</p>
              </div>

              <span className="habit-count">
                {completedCount}/{totalHabits}
              </span>
            </div>

            <div className="progress-container">
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              <p>{Math.round(progressPercentage)}% completed</p>
            </div>

            <form className="habit-form" onSubmit={addHabit}>
              <input
                type="text"
                value={newHabitName}
                onChange={(event) => {
                  setNewHabitName(event.target.value);
                  setHabitError('');
                }}
                placeholder="Add a new habit..."
                aria-label="New habit name"
                aria-invalid={Boolean(habitError)}
                aria-describedby={
                  habitError ? 'habit-error' : undefined
                }
              />

              <button type="submit" className="add-habit-button">
                <Plus size={17} />
                Add habit
              </button>
            </form>

            {habitError && (
              <p className="habit-error" id="habit-error">
                {habitError}
              </p>
            )}

            <div className="habit-list">
              {habits.length === 0 ? (
                <div className="habit-empty-state">
                  <Heart size={30} />
                  <h3>No habits yet</h3>
                  <p>Add your first habit to get started.</p>
                </div>
              ) : (
                habits.map((habit) => (
                  <div
                    className={`habit-item ${
                      habit.completed ? 'completed' : ''
                    }`}
                    key={habit.id}
                  >
                    <button
                      className="habit-checkbox"
                      type="button"
                      onClick={() => toggleHabit(habit.id)}
                      aria-label={
                        habit.completed
                          ? `Mark ${habit.name} incomplete`
                          : `Mark ${habit.name} complete`
                      }
                      aria-pressed={habit.completed}
                    >
                      {habit.completed && <Check size={16} />}
                    </button>

                    <div className="habit-info">
                      <h3>{habit.name}</h3>
                      <p>{habit.description}</p>
                    </div>

                    {habit.completed && (
                      <span className="completed-label">
                        Completed
                      </span>
                    )}

                    <button
                      className="delete-habit-button"
                      type="button"
                      onClick={() => deleteHabit(habit.id)}
                      aria-label={`Delete ${habit.name}`}
                      title={`Delete ${habit.name}`}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="panel" id="goals">
            <h2>Your goals</h2>
            <p>Keep track of what you're working toward.</p>

            <div className="empty-state">
              <Target size={32} />
              <p>Your goals will appear here.</p>
              <button className="add-goal-button" type="button">
                <Plus size={16} />
                Add a goal
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
