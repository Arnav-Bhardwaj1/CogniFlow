'use client'

import React, { useEffect, useState } from 'react'

/* ── SVG connection line ── */
function ConnectionLine({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const mx = (x1 + x2) / 2
  return (
    <path
      d={`M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`}
      stroke="rgba(255,255,255,0.08)"
      strokeWidth="1.5"
      fill="none"
      className="dash-animate"
    />
  )
}

/* ── Decorative node ── */
function DecoNode({ label, icon, x, y, rounded, delay = 0 }: { label: string; icon: React.ReactNode; x: number; y: number; rounded?: 'left' | 'none', delay?: number }) {
  return (
    <div
      className="absolute flex items-center gap-2 px-3 py-2.5 animate-float hover:scale-105 transition-transform duration-300 backdrop-blur-md"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: rounded === 'left' ? '16px 6px 6px 16px' : '6px',
        minWidth: 120,
        animationDelay: `${delay}s`,
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
      }}
    >
      <div
        className="flex items-center justify-center shrink-0"
        style={{
          width: 24,
          height: 24,
          borderRadius: 6,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.10)',
        }}
      >
        <span className="text-[12px]">{icon}</span>
      </div>
      <span className="text-xs font-medium text-white/80 whitespace-nowrap">{label}</span>
      <div
        className="absolute animate-pulse-glow"
        style={{
          right: -4,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'rgba(249,115,22,0.6)',
          border: '2px solid rgba(249,115,22,0.8)',
        }}
      />
    </div>
  )
}

export function FloatingNodes() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Container for zooming/blurring the background elements */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ filter: 'blur(3px)', opacity: 0.6, transform: 'scale(1.1)' }}
      >
        {/* Animated Lines SVG */}
        <svg className="absolute inset-0 w-full h-full">
          <style>
            {`
              .dash-animate {
                stroke-dasharray: 8 8;
                animation: dash 20s linear infinite;
              }
              @keyframes dash {
                to {
                  stroke-dashoffset: -100;
                }
              }
            `}
          </style>
          {/* Central main flow */}
          <ConnectionLine x1={20} y1={30} x2={40} y2={45} />
          <ConnectionLine x1={40} y1={45} x2={65} y2={40} />
          <ConnectionLine x1={65} y1={40} x2={85} y2={55} />

          {/* Top side flow */}
          <ConnectionLine x1={15} y1={60} x2={35} y2={70} />
          <ConnectionLine x1={35} y1={70} x2={60} y2={85} />

          {/* Cross connections */}
          <ConnectionLine x1={40} y1={45} x2={35} y2={70} />
          <ConnectionLine x1={65} y1={40} x2={60} y2={85} />
        </svg>

        {/* Nodes */}
        <DecoNode label="Webhook Trigger" icon="🔗" x={10} y={26} rounded="left" delay={0} />
        <DecoNode label="OpenAI GPT-4" icon="⚡" x={34} y={41} delay={1.2} />
        <DecoNode label="Discord Notification" icon="🎮" x={63} y={36} delay={2.4} />
        <DecoNode label="PostgreSQL" icon="🗄️" x={82} y={51} delay={3.6} />

        <DecoNode label="Stripe Event" icon="💳" x={5} y={56} rounded="left" delay={0.5} />
        <DecoNode label="Anthropic Claude" icon="🧠" x={29} y={66} delay={1.7} />
        <DecoNode label="Email Alert" icon="📧" x={58} y={81} delay={2.9} />

        {/* Distant background nodes */}
        <div style={{ filter: 'blur(8px)', opacity: 0.4, transform: 'scale(0.8)' }}>
          <DecoNode label="Google Sheets" icon="📊" x={80} y={15} delay={1} />
          <DecoNode label="Slack Message" icon="💬" x={25} y={10} delay={2.2} />
          <DecoNode label="HTTP Request" icon="🌐" x={75} y={80} delay={0.8} />
        </div>
      </div>
    </div>
  )
}
