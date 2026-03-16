import { useEffect, useRef } from 'react'

export default function StarBackground({ theme }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animFrame
    let stars = []
    let meteors = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Generate stars
    for (let i = 0; i < 180; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        alpha: Math.random(),
        speed: Math.random() * 0.02 + 0.005,
        dir: Math.random() > 0.5 ? 1 : -1,
      })
    }

    const spawnMeteor = () => {
      meteors.push({
        x: Math.random() * canvas.width * 0.6,
        y: Math.random() * canvas.height * 0.4,
        len: Math.random() * 120 + 80,
        speed: Math.random() * 6 + 4,
        alpha: 1,
        active: true,
      })
    }

    const meteorInterval = setInterval(spawnMeteor, 2500)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Stars
      stars.forEach(s => {
        s.alpha += s.speed * s.dir
        if (s.alpha >= 1 || s.alpha <= 0.1) s.dir *= -1
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = theme === 'light'
          ? `rgba(100, 80, 180, ${s.alpha * 0.5})`
          : `rgba(255, 255, 255, ${s.alpha})`
        ctx.fill()
      })

      // Meteors
      meteors = meteors.filter(m => m.alpha > 0)
      meteors.forEach(m => {
        ctx.save()
        ctx.globalAlpha = m.alpha
        const grad = ctx.createLinearGradient(m.x, m.y, m.x + m.len, m.y + m.len)
        grad.addColorStop(0, 'rgba(255,255,255,0)')
        grad.addColorStop(1, 'rgba(255,255,255,0.9)')
        ctx.strokeStyle = grad
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(m.x, m.y)
        ctx.lineTo(m.x + m.len, m.y + m.len)
        ctx.stroke()
        ctx.restore()
        m.x += m.speed
        m.y += m.speed
        m.alpha -= 0.018
      })

      animFrame = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animFrame)
      clearInterval(meteorInterval)
      window.removeEventListener('resize', resize)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: theme === 'light' ? 0.4 : 1 }}
    />
  )
}
