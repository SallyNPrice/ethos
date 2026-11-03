import { useState } from 'react';
import './App.css';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  return (
    <div className="app-layout">

      {/* Sidebar navigation */}
      <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
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
            aria-expanded={isSidebarCollapsed}
            title="Toggle sidebar"
          >
            ☰
          </button>
        </div>


        <nav className="sidebar-nav">
          <a className="active" href="#overview">
            <span className="nav-icon">⌂</span>
            <span className="nav-label">Overview</span>
          </a>

          <a href="#habits">
            <span className="nav-icon">♡</span>
            <span className="nav-label">My Habits</span>
          </a>

          <a href="#goals">
            <span className="nav-icon">◎</span>
            <span className="nav-label">Goals</span>
          </a>

          <a href="#calendar">
            <span className="nav-icon">▦</span>
            <span className="nav-label">Calendar</span>
          </a>

          <a href="#analytics">
            <span className="nav-icon">↗</span>
            <span className="nav-label">Analytics</span>
          </a>
        </nav>

        <div className="sidebar-bottom">
          <a href="#settings">Settings</a>
        </div>
      </aside>

      {/* Main dashboard */}
      <main className="dashboard" id="overview">

        <header className="dashboard-header">
          <div>
            <p className="eyebrow">YOUR PERSONAL SPACE</p>
            <h1>Good morning!</h1>
            <p>Let's make today count.</p>
          </div>

          <div className="profile-placeholder">SP</div>
        </header>

        {/* Summary cards */}
        <section className="summary-grid">
          <div className="summary-card">
            <p>Habits completed</p>
            <h2>0 / 3</h2>
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

        {/* Dashboard content */}
        <section className="content-grid">

          <div className="panel" id="habits">
            <h2>Today's habits</h2>
            <p>Your daily activities will appear here.</p>
          </div>

          <div className="panel" id="goals">
            <h2>Your goals</h2>
            <p>Keep track of what you're working toward.</p>
          </div>

        </section>

      </main>
    </div>
  );
}

export default App;
