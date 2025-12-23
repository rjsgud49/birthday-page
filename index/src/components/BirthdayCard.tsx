import React, { useState, useEffect } from 'react'
import './BirthdayCard.css'

interface Firework {
  id: number
  x: number
  y: number
  color: string
}

const BirthdayCard: React.FC = () => {
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([])
  const [showMessage, setShowMessage] = useState(false)
  const [isCelebrating, setIsCelebrating] = useState(false)
  const [fireworks, setFireworks] = useState<Firework[]>([])
  const [showSpecialMessage, setShowSpecialMessage] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  useEffect(() => {
    // 컨페티 생성
    const confettiArray = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3
    }))
    setConfetti(confettiArray)

    // 메시지 애니메이션
    setTimeout(() => setShowMessage(true), 500)
  }, [])

  const handleCelebrate = () => {
    setIsCelebrating(true)
    setClickCount(prev => prev + 1)
    setShowSpecialMessage(true)

    // 대량의 컨페티 생성
    const newConfetti = Array.from({ length: 100 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      delay: Math.random() * 1,
      duration: 1 + Math.random() * 2
    }))
    setConfetti(prev => [...prev, ...newConfetti])

    // 폭죽 생성
    const newFireworks: Firework[] = []
    for (let i = 0; i < 8; i++) {
      newFireworks.push({
        id: Date.now() + i * 1000,
        x: 10 + (i % 4) * 30,
        y: 20 + Math.floor(i / 4) * 40,
        color: ['#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#f38181', '#aa96da', '#fcbad3', '#ffffd2'][i]
      })
    }
    setFireworks(newFireworks)

    // 카드 애니메이션 리셋
    setTimeout(() => {
      setIsCelebrating(false)
      setTimeout(() => {
        setFireworks([])
      }, 2000)
    }, 1000)

    // 특별 메시지 숨김
    setTimeout(() => {
      setShowSpecialMessage(false)
    }, 3000)
  }

  return (
    <div className="birthday-container">
      {/* 배경 컨페티 */}
      <div className="confetti-container">
        {confetti.map((item) => (
          <div
            key={item.id}
            className="confetti"
            style={{
              left: `${item.left}%`,
              animationDelay: `${item.delay}s`,
              animationDuration: `${item.duration}s`
            }}
          />
        ))}
      </div>

      {/* 폭죽 효과 */}
      <div className="fireworks-container">
        {fireworks.map((firework) => (
          <div
            key={firework.id}
            className="firework"
            style={{
              left: `${firework.x}%`,
              top: `${firework.y}%`
            }}
          >
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="firework-spark"
                style={{
                  '--firework-color': firework.color,
                  '--rotation': `${i * 30}deg`
                } as React.CSSProperties}
              ></div>
            ))}
          </div>
        ))}
      </div>

      {/* 특별 축하 메시지 */}
      {showSpecialMessage && (
        <div className="special-message">
          <div className="special-message-content">
            <h2>🎉 WOW! 🎉</h2>
            <p>축하가 {clickCount}번이나!</p>
            <div className="explosion-emoji">💥✨🎊🎉💫</div>
          </div>
        </div>
      )}

      {/* 메인 카드 */}
      <div className="card">
        <div className={`card-inner ${isCelebrating ? 'celebrating' : ''}`}>
          {/* 상단 장식 */}
          <div className="top-decoration">
            <div className="balloon balloon-1">🎈</div>
            <div className="balloon balloon-2">🎈</div>
            <div className="balloon balloon-3">🎈</div>
          </div>

          {/* 메인 메시지 */}
          <div className={`message-container ${showMessage ? 'show' : ''}`}>
            <h1 className="birthday-title">생신 축하드립니다! </h1>
            <h2 className="name-title">효림쌤</h2>
            <div className={`cake ${isCelebrating ? 'celebrating' : ''}`}>🎂</div>
            <p className="birthday-message">
              오늘 특별한 날,<br />
              행복과 기쁨이 가득한<br />
              한 해가 되기를 바랍니다!(2일 뒤에) <br />
              <span className="hearts">💖 💖 💖</span>
            </p>
          </div>

          {/* 축하 버튼 */}
          <button 
            className={`celebrate-button ${isCelebrating ? 'clicked' : ''}`}
            onClick={handleCelebrate}
          >
            <span className="button-text">🎉 더 축하하기 🎉</span>
            <span className="button-glow"></span>
          </button>

          {/* 하단 장식 */}
          <div className="bottom-decoration">
            <div className="sparkle sparkle-1">✨</div>
            <div className="sparkle sparkle-2">✨</div>
            <div className="sparkle sparkle-3">✨</div>
            <div className="sparkle sparkle-4">✨</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BirthdayCard
