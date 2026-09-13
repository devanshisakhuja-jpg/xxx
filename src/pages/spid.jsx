import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { ChevronLeft, ChevronRight, CheckCircle2, Clock, Calendar as CalendarIcon, Zap } from 'lucide-react';

// Replace this with your actual image path or import (e.g., import spideyImg from './spiderman.jpg')
const SPIDERMAN_IMAGE_URL = '/SPID (1).png';

// ==========================================
// 🎨 JSS STYLES CONFIGURATION
// ==========================================
const useStyles = createUseStyles({
  '@global': {
    '*': { boxSizing: 'border-box' },
    'body': {
      margin: 0,
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#0a0a0c',
      color: '#111827',
      // Low transparency Spider-Man background with subtle dark overlay
      backgroundImage: ` url("${SPIDERMAN_IMAGE_URL}")`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
    }
  },
  container: {
    maxWidth: 1100,
    margin: '0 auto',
    padding: '40px 20px',
  },
  header: {
    marginBottom: 30,
    '& h1': { 
      margin: 0, 
      fontSize: 42, 
      fontWeight: 900, 
      color: '#ffffff',
      fontFamily: 'Impact, Arial Black, Arial, sans-serif',
      letterSpacing: '1.5px',
      textTransform: 'uppercase',
      textShadow: '0 4px 12px rgba(0, 0, 0, 0.6)'
    },
    '& p': { 
      color: '#d1d5db', 
      marginTop: 8, 
      fontSize: 15,
      fontWeight: '500' 
    }
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 1fr',
    gap: 20,
    '@media(max-width:850px)': { gridTemplateColumns: '1fr' }
  },
  card: {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: 14,
    padding: 22,
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)',
    marginBottom: 20,
    '& h2': { fontSize: 17, margin: '0 0 16px', color: '#111827', fontWeight: 'bold' }
  },
  
  // Level & XP Bar
  levelBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  levelNum: { fontSize: 26, fontWeight: 'bold', color: '#111827' },
  xpText: { fontSize: 14, fontWeight: 'bold', color: '#374151' },
  progressWrap: { margin: '12px 0 8px' },
  bar: { height: 12, background: '#e5e7eb', borderRadius: 6, overflow: 'hidden' },
  barInner: { height: '100%', background: '#2563eb', borderRadius: 6, transition: '0.35s ease' },
  levelUpAlert: {
    marginTop: 12,
    padding: '10px 14px',
    background: '#eff6ff',
    border: '1px solid #bfdbfe',
    color: '#1d4ed8',
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: 8
  },

  // Metric Boxes (Completed, Pending, Upcoming)
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 15,
    marginBottom: 24,
    '@media(max-width:500px)': { gridTemplateColumns: '1fr' }
  },
  metricCard: {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: 14,
    padding: 18,
    textAlign: 'center',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
    '& strong': { display: 'block', fontSize: 28, fontWeight: 'bold', color: '#111827', marginTop: 6 },
    '& span': { fontSize: 12, color: '#6b7280', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }
  },

  // Streak & XP Restore
  streakCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15,
    flexWrap: 'wrap'
  },
  streakLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 12
  },
  fireIcon: { fontSize: 32 },
  streakVal: { fontSize: 22, fontWeight: 'bold', color: '#111827' },
  streakSub: { fontSize: 12, color: '#6b7280' },
  restoreBtn: {
    border: 0,
    background: '#2563eb',
    color: '#ffffff',
    borderRadius: 8,
    padding: '10px 16px',
    fontWeight: 'bold',
    fontSize: 13,
    cursor: 'pointer',
    fontFamily: 'Arial, sans-serif',
    transition: 'background 0.2s ease',
    '&:hover': { background: '#1d4ed8' },
    '&:disabled': { background: '#9ca3af', cursor: 'not-allowed' }
  },

  // Bar Graph
  chartContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 160,
    paddingTop: 20,
    borderBottom: '1px solid #e5e7eb'
  },
  barCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end'
  },
  barTrack: {
    width: 24,
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    background: '#f3f4f6',
    borderRadius: '4px 4px 0 0'
  },
  barFill: {
    width: '100%',
    background: '#111827',
    borderRadius: '4px 4px 0 0',
    transition: 'height 0.3s ease'
  },
  barLabel: { fontSize: 11, color: '#6b7280', marginTop: 8 },
  barVal: { fontSize: 10, color: '#374151', marginBottom: 4, fontWeight: 'bold' },

  // Calendar
  month: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 13,
    '& button': { border: '1px solid #e5e7eb', background: '#ffffff', width: 28, height: 28, borderRadius: 6, cursor: 'pointer', display: 'grid', placeItems: 'center' }
  },
  week: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, textAlign: 'center', fontSize: 11, color: '#6b7280', marginBottom: 6, fontWeight: 'bold' },
  days: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, textAlign: 'center' },
  day: {
    height: 32,
    borderRadius: 6,
    display: 'grid',
    placeItems: 'center',
    fontSize: 12,
    color: '#111827',
    border: '1px solid transparent'
  },
  dayToday: {
    background: '#111827',
    color: '#ffffff',
    fontWeight: 'bold'
  },
  dayHasTask: {
    position: 'relative',
    '&::after': { content: '""', position: 'absolute', bottom: 3, width: 4, height: 4, borderRadius: '50%', background: '#2563eb' }
  }
});

// ==========================================
// 🚀 STATISTICS PAGE COMPONENT
// ==========================================
export default function QuestStats() {
  const classes = useStyles();

  // Hero State
  const [heroStats, setHeroStats] = useState({
    level: 3,
    currentXp: 145,
    xpNeeded: 200,
    streak: 0,
    isStreakBroken: true
  });

  // Task Counts
  const [questCounts] = useState({
    completed: 18,
    pending: 4,
    upcoming: 7
  });

  // Weekly XP Bar Graph Data
  const [weeklyXp] = useState([
    { day: 'Mon', xp: 35 },
    { day: 'Tue', xp: 50 },
    { day: 'Wed', xp: 20 },
    { day: 'Thu', xp: 65 },
    { day: 'Fri', xp: 40 },
    { day: 'Sat', xp: 15 },
    { day: 'Sun', xp: 45 }
  ]);

  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());

  // Restore Streak using 100 XP
  const restoreStreakWithXp = () => {
    const cost = 100;
    if (heroStats.currentXp >= cost && heroStats.isStreakBroken) {
      setHeroStats(prev => ({
        ...prev,
        currentXp: prev.currentXp - cost,
        streak: prev.streak + 1,
        isStreakBroken: false
      }));
    }
  };

  const xpPercentage = Math.min((heroStats.currentXp / heroStats.xpNeeded) * 100, 100);
  const maxXpInChart = Math.max(...weeklyXp.map(d => d.xp), 1);

  return (
    <div className={classes.container}>
      {/* Prominent Page Header */}
      <div className={classes.header}>
        <h1>PERFORMANCE STATISTICS</h1>
        <p>Track your daily XP gains, maintain your quest streaks, and analyze completion metrics.</p>
      </div>

      {/* Metric Cards Row */}
      <div className={classes.metricsGrid}>
        <div className={classes.metricCard}>
          <CheckCircle2 size={20} color="#16a34a" style={{ margin: '0 auto' }} />
          <strong>{questCounts.completed}</strong>
          <span>Completed Quests</span>
        </div>
        <div className={classes.metricCard}>
          <Clock size={20} color="#d97706" style={{ margin: '0 auto' }} />
          <strong>{questCounts.pending}</strong>
          <span>Pending Quests</span>
        </div>
        <div className={classes.metricCard}>
          <CalendarIcon size={20} color="#2563eb" style={{ margin: '0 auto' }} />
          <strong>{questCounts.upcoming}</strong>
          <span>Upcoming Quests</span>
        </div>
      </div>

      <div className={classes.grid}>
        {/* Left Column */}
        <div>
          {/* Level & XP Card */}
          <div className={classes.card}>
            <h2>Hero Level Progress</h2>
            <div className={classes.levelBox}>
              <div>
                <span className={classes.levelNum}>Level {heroStats.level}</span>
              </div>
              <div className={classes.xpText}>{heroStats.currentXp} / {heroStats.xpNeeded} XP</div>
            </div>
            
            <div className={classes.progressWrap}>
              <div className={classes.bar}>
                <div className={classes.barInner} style={{ width: `${xpPercentage}%` }} />
              </div>
            </div>

            {xpPercentage >= 100 && (
              <div className={classes.levelUpAlert}>
                <Zap size={16} /> Level Up Ready! Complete active tasks to step into the next tier.
              </div>
            )}
          </div>

          {/* XP Bar Graph Card */}
          <div className={classes.card}>
            <h2>Weekly XP Earnings</h2>
            <div className={classes.chartContainer}>
              {weeklyXp.map((item, index) => {
                const heightPercent = (item.xp / maxXpInChart) * 100;
                return (
                  <div key={index} className={classes.barCol}>
                    <span className={classes.barVal}>{item.xp}</span>
                    <div className={classes.barTrack}>
                      <div className={classes.barFill} style={{ height: `${heightPercent}%` }} />
                    </div>
                    <span className={classes.barLabel}>{item.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* Streak & XP Repair Card */}
          <div className={`${classes.card} ${classes.streakCard}`}>
            <div className={classes.streakLeft}>
              <div className={classes.fireIcon}>🔥</div>
              <div>
                <div className={classes.streakVal}>{heroStats.streak} Day Streak</div>
                <div className={classes.streakSub}>
                  {heroStats.isStreakBroken ? 'Streak lost! Restore it using your XP.' : 'Streak active! Keep going.'}
                </div>
              </div>
            </div>

            <button 
              className={classes.restoreBtn}
              disabled={!heroStats.isStreakBroken || heroStats.currentXp < 100}
              onClick={restoreStreakWithXp}
            >
              Restore (100 XP)
            </button>
          </div>

          {/* Calendar Widget */}
          <div className={classes.card}>
            <div className={classes.month}>
              <strong>{currentCalendarDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</strong>
              <div>
                <button onClick={() => setCurrentCalendarDate(new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() - 1))}>
                  <ChevronLeft size={16} />
                </button>
                <button onClick={() => setCurrentCalendarDate(new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() + 1))}>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
            
            <div className={classes.week}>
              <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
            </div>
            
            <div className={classes.days}>
              {[...Array(new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() + 1, 0).getDate())].map((_, i) => {
                const isToday = i + 1 === new Date().getDate() && currentCalendarDate.getMonth() === new Date().getMonth();
                const hasTask = (i + 1) % 4 === 0;
                return (
                  <div 
                    key={i} 
                    className={`${classes.day} ${isToday ? classes.dayToday : ''} ${hasTask ? classes.dayHasTask : ''}`}
                  >
                    {i + 1}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}