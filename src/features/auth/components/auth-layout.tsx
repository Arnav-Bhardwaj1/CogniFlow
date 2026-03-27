import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ChevronLeft } from 'lucide-react'

/* ── Decorative node that mimics the real workflow nodes ── */
function DecoNode({
  label,
  icon,
  x,
  y,
  rounded,
}: {
  label: string
  icon: string
  x: number
  y: number
  rounded?: 'left' | 'none'
}) {
  return (
    <div
      className="absolute flex items-center gap-2 px-3 py-2.5"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: rounded === 'left' ? '16px 6px 6px 16px' : '6px',
        minWidth: 120,
      }}
    >
      {/* icon circle */}
      <div
        className="flex items-center justify-center shrink-0"
        style={{
          width: 22,
          height: 22,
          borderRadius: 4,
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.10)',
        }}
      >
        <span className="text-[10px]">{icon}</span>
      </div>
      <span className="text-[11px] font-medium text-white/70 whitespace-nowrap">{label}</span>
      {/* right handle dot */}
      <div
        className="absolute"
        style={{
          right: -4,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'rgba(249,115,22,0.5)',
          border: '2px solid rgba(249,115,22,0.7)',
        }}
      />
    </div>
  )
}

/* ── SVG connection line between coordinates (percentage based) ── */
function ConnectionLine({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
}) {
  // Bezier mid-point
  const mx = (x1 + x2) / 2
  return (
    <path
      d={`M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`}
      stroke="rgba(255,255,255,0.12)"
      strokeWidth="1.5"
      fill="none"
    />
  )
}

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="h-svh overflow-hidden flex flex-col justify-center items-center gap-3 p-6 pt-10 md:p-10 md:pt-14 relative"
      style={{
        background: 'linear-gradient(160deg, #07070f 0%, #0d0d1a 50%, #0f0f22 100%)',
      }}
    >
      {/* ─── Decorative blurred node canvas ─── */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none select-none"
        style={{ filter: 'blur(6px)', opacity: 0.55 }}
        aria-hidden="true"
      >
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full">
          {/* Row 1: Manual Trigger → Gemini → Slack */}
          <ConnectionLine x1={18} y1={22} x2={38} y2={18} />
          <ConnectionLine x1={48} y1={18} x2={68} y2={24} />
          {/* Row 2: Stripe → OpenAI → Discord */}
          <ConnectionLine x1={8} y1={50} x2={33} y2={52} />
          <ConnectionLine x1={43} y1={52} x2={63} y2={48} />
          {/* Row 3: Google Form → Anthropic → HTTP */}
          <ConnectionLine x1={22} y1={78} x2={45} y2={82} />
          <ConnectionLine x1={55} y1={82} x2={78} y2={76} />
          {/* Cross connections */}
          <ConnectionLine x1={48} y1={18} x2={38} y2={52} />
          <ConnectionLine x1={63} y1={48} x2={55} y2={82} />
          <ConnectionLine x1={18} y1={22} x2={8} y2={50} />
        </svg>

        {/* Row 1 */}
        <DecoNode label="Manual Trigger" icon="🖱" x={5} y={18} rounded="left" />
        <DecoNode label="Gemini" icon="✦" x={35} y={14} />
        <DecoNode label="Slack" icon="💬" x={65} y={20} />

        {/* Row 2 */}
        <DecoNode label="Stripe Trigger" icon="💳" x={-3} y={47} rounded="left" />
        <DecoNode label="OpenAI" icon="⚡" x={30} y={49} />
        <DecoNode label="Discord" icon="🎮" x={60} y={44} />

        {/* Row 3 */}
        <DecoNode label="Google Forms" icon="📋" x={10} y={75} rounded="left" />
        <DecoNode label="Anthropic" icon="🧠" x={42} y={79} />
        <DecoNode label="HTTP Request" icon="🌐" x={72} y={73} />

        {/* Scattered extra nodes for density */}
        <DecoNode label="Razorpay" icon="💰" x={82} y={12} />
        <DecoNode label="Webhook" icon="🔗" x={85} y={55} />
        <DecoNode label="Email" icon="📧" x={78} y={88} />
      </div>

      {/* ─── Ambient glow orbs for color ─── */}
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          top: '-15%',
          right: '10%',
          width: '50vw',
          height: '50vw',
          maxWidth: 700,
          maxHeight: 700,
          background: 'radial-gradient(circle, rgba(99,40,180,0.20) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          bottom: '-10%',
          left: '5%',
          width: '45vw',
          height: '45vw',
          maxWidth: 600,
          maxHeight: 600,
          background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          top: '30%',
          left: '-10%',
          width: '35vw',
          height: '35vw',
          maxWidth: 450,
          maxHeight: 450,
          background: 'radial-gradient(circle, rgba(3,218,197,0.10) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />

      {/* ─── Back to Dashboard Button ─── */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 md:top-10 md:left-10 z-50 flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-white/10 backdrop-blur-sm"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      {/* ─── Glassmorphic foreground content ─── */}
      <div className="flex w-full max-w-sm flex-col gap-6 relative z-10">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
          <Image src="/logos/logo.svg" alt="CogniFlow" width={70} height={100} />
          <h1 className="text-2xl font-semibold text-white">CogniFlow</h1>
        </Link>
      </div>
      <div className="w-full max-w-sm relative z-10">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
