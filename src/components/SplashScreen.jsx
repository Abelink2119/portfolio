import { useEffect, useState } from 'react'

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('enter') // enter → hold → exit

  useEffect(() => {
    // hold for 1.8s then start exit fade
    const t1 = setTimeout(() => setPhase('exit'), 1800)
    // after exit animation (600ms) notify parent
    const t2 = setTimeout(() => onDone(), 2400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '28px',
        transition: 'opacity 0.6s ease',
        opacity: phase === 'exit' ? 0 : 1,
        pointerEvents: phase === 'exit' ? 'none' : 'all',
      }}
    >
      {/* Name */}
      <div style={{ textAlign: 'center' }}>
        <h1
          style={{
            fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            background: 'linear-gradient(90deg, #a855f7 0%, #818cf8 50%, #38bdf8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'splashFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both',
          }}
        >
          Abel Assefa
        </h1>

        {/* Gradient underline */}
        <div
          style={{
            height: '3px',
            borderRadius: '99px',
            background: 'linear-gradient(90deg, #a855f7, #38bdf8)',
            animation: 'splashLineGrow 0.7s 0.3s cubic-bezier(0.22,1,0.36,1) both',
            transformOrigin: 'left',
          }}
        />
      </div>

      {/* Spinner */}
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '2.5px solid transparent',
          borderTopColor: '#a855f7',
          borderRightColor: '#38bdf8',
          animation: 'splashSpin 0.9s linear infinite, splashFadeUp 0.5s 0.5s ease both',
          opacity: 0,
        }}
      />

      <style>{`
        @keyframes splashFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes splashLineGrow {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }
        @keyframes splashSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
