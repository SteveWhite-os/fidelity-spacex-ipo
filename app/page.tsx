'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'

type Step = 'hero' | 'amount' | 'details' | 'success'

export default function Home() {
  const [step, setStep] = useState<Step>('hero')
  const [amount, setAmount] = useState('')
  const [email, setEmail] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'bank' | ''>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleEnterLottery = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) < 100) {
      setError('Minimum pledge is $100')
      return
    }
    setError('')
    setStep('details')
  }

  const handleSubmit = async () => {
    if (!email || !paymentMethod) {
      setError('Please fill in all fields')
      return
    }
    setLoading(true)
    setError('')
    try {
      const { error: dbError } = await supabase.from('pledges').insert([
        {
          email,
          amount: Number(amount),
          payment_method: paymentMethod,
        },
      ])
      if (dbError) throw dbError
      setStep('success')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: '#050A14',
      color: '#E8EDF5',
      fontFamily: "'Inter', -apple-system, sans-serif",
      overflowX: 'hidden',
    }}>

      {/* NAV */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 48px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(5,10,20,0.92)',
        backdropFilter: 'blur(12px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: 32, height: 32,
            background: 'linear-gradient(135deg, #1A6B3C, #0D4A2A)',
            borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: 14, color: '#fff',
          }}>F</div>
          <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: '-0.02em' }}>Fidelity</span>
        </div>
        <div style={{ display: 'flex', gap: 32, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
          <span style={{ cursor: 'pointer' }}>IPO Center</span>
          <span style={{ cursor: 'pointer' }}>Research</span>
          <span style={{ cursor: 'pointer' }}>Portfolio</span>
        </div>
        <button style={{
          background: '#1A6B3C',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          padding: '9px 20px',
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
        }}>Sign In</button>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 80,
        overflow: 'hidden',
      }}>
        {/* Background image via Unsplash */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          filter: 'brightness(0.25)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(5,10,20,0.95) 45%, rgba(5,10,20,0.3) 100%)',
        }} />

        <div style={{
          position: 'relative',
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 48px',
          width: '100%',
        }}>

          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(26,107,60,0.2)',
            border: '1px solid rgba(26,107,60,0.5)',
            borderRadius: 100,
            padding: '6px 14px',
            fontSize: 12,
            fontWeight: 600,
            color: '#4ADE80',
            marginBottom: 28,
            letterSpacing: '0.06em',
            textTransform: 'uppercase' as const,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ADE80', display: 'inline-block' }} />
            IPO Allocation Lottery — Now Open
          </div>

          {/* Company */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <div style={{
  width: 52, height: 52,
  background: 'rgba(255,255,255,0.08)',
  borderRadius: 10,
  border: '1px solid rgba(255,255,255,0.12)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  padding: 10,
}}>
  <svg viewBox="0 0 148 19" fill="white" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
    <path d="M6.5 0C2.9 0 0 2.9 0 6.5S2.9 13 6.5 13H8v6h2v-6h1.5C15.1 13 18 10.1 18 6.5S15.1 0 11.5 0h-5zm0 2h5C13.9 2 16 4.1 16 6.5S13.9 11 11.5 11H6.5C4.1 11 2 8.9 2 6.5S4.1 2 6.5 2z"/>
  </svg>
</div>            <div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>NYSE · SPCE-X</div>
              <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>SpaceX</div>
            </div>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            marginBottom: 20,
            maxWidth: 620,
          }}>
            Invest in the<br />
            <span style={{
              background: 'linear-gradient(90deg, #4ADE80, #22C55E)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>next frontier.</span>
          </h1>

          <p style={{
            fontSize: 17,
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.7,
            maxWidth: 480,
            marginBottom: 40,
          }}>
            SpaceX is going public. Due to extraordinary demand, share access will be distributed via a priority lottery. Enter your pledge to secure your position.
          </p>

          {/* Key Stats */}
          <div style={{
            display: 'flex',
            gap: 32,
            marginBottom: 44,
            flexWrap: 'wrap' as const,
          }}>
            {[
              { label: 'Estimated Price Range', value: '$95 – $110' },
              { label: 'Allocation Draw Date', value: 'July 14, 2025' },
              { label: 'Minimum Pledge', value: '$100' },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* PLEDGE BOX */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 16,
            padding: 28,
            maxWidth: 480,
            backdropFilter: 'blur(8px)',
          }}>
            {step === 'hero' || step === 'amount' ? (
              <>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 10, letterSpacing: '0.04em', textTransform: 'uppercase' as const }}>Your Pledge Amount</div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <span style={{
                      position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                      color: 'rgba(255,255,255,0.4)', fontSize: 16, fontWeight: 600,
                    }}>$</span>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      onFocus={() => setStep('amount')}
                      style={{
                        width: '100%',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: 10,
                        padding: '14px 14px 14px 30px',
                        color: '#fff',
                        fontSize: 18,
                        fontWeight: 600,
                        outline: 'none',
                        boxSizing: 'border-box' as const,
                      }}
                    />
                  </div>
                  <button
                    onClick={handleEnterLottery}
                    style={{
                      background: 'linear-gradient(135deg, #1A6B3C, #15803D)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 10,
                      padding: '14px 22px',
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap' as const,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Enter Allocation Lottery →
                  </button>
                </div>
                {error && <div style={{ color: '#F87171', fontSize: 13, marginTop: 10 }}>{error}</div>}
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 12 }}>
                  Pledges are non-binding until allocation confirmation. Minimum $100.
                </div>
              </>
            ) : step === 'details' ? (
              <>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#4ADE80', marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>✓ Pledge: ${Number(amount).toLocaleString()}</div>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Complete your entry</div>

                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 6, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Email Address</div>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: 10,
                      padding: '13px 14px',
                      color: '#fff',
                      fontSize: 15,
                      outline: 'none',
                      boxSizing: 'border-box' as const,
                    }}
                  />
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 10, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Payment Method</div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {(['crypto', 'bank'] as const).map((method) => (
                      <button
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        style={{
                          flex: 1,
                          padding: '12px',
                          borderRadius: 10,
                          border: paymentMethod === method
                            ? '1px solid #4ADE80'
                            : '1px solid rgba(255,255,255,0.12)',
                          background: paymentMethod === method
                            ? 'rgba(74,222,128,0.1)'
                            : 'rgba(255,255,255,0.04)',
                          color: paymentMethod === method ? '#4ADE80' : 'rgba(255,255,255,0.6)',
                          fontSize: 14,
                          fontWeight: 600,
                          cursor: 'pointer',
                          textTransform: 'capitalize' as const,
                        }}
                      >
                        {method === 'crypto' ? '₿ Crypto' : '🏦 Bank Transfer'}
                      </button>
                    ))}
                  </div>
                </div>

                {error && <div style={{ color: '#F87171', fontSize: 13, marginBottom: 12 }}>{error}</div>}

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{
                    width: '100%',
                    background: loading ? 'rgba(26,107,60,0.5)' : 'linear-gradient(135deg, #1A6B3C, #15803D)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 10,
                    padding: '15px',
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {loading ? 'Submitting...' : 'Submit Lottery Entry'}
                </button>
              </>
            ) : (
              <div style={{ textAlign: 'center' as const, padding: '10px 0' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🎯</div>
                <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>You're in the lottery</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                  We'll notify <strong style={{ color: '#fff' }}>{email}</strong> on July 14, 2025 if you receive an allocation.
                </div>
                <div style={{
                  marginTop: 20,
                  padding: '10px 16px',
                  background: 'rgba(74,222,128,0.08)',
                  border: '1px solid rgba(74,222,128,0.2)',
                  borderRadius: 8,
                  fontSize: 13,
                  color: '#4ADE80',
                }}>
                  Pledge of ${Number(amount).toLocaleString()} via {paymentMethod} recorded
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* INFO SECTION */}
      <section style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '100px 48px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {[
            {
              icon: '🛰️',
              title: 'About the Offering',
              body: 'SpaceX is offering shares to the public for the first time. This represents one of the most anticipated IPOs in history, with operations spanning Starlink, Falcon 9, and Starship programs.',
            },
            {
              icon: '🎲',
              title: 'How the Lottery Works',
              body: 'Due to demand exceeding supply, all pledges will enter a weighted allocation draw. Higher pledge amounts receive proportionally more lottery entries. Draw occurs July 14, 2025.',
            },
            {
              icon: '🔒',
              title: 'Pledge Security',
              body: 'Your pledge is non-binding until allocation confirmation. Funds are only requested after you receive confirmation of a successful lottery draw.',
            },
          ].map((card) => (
            <div key={card.title} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 14,
              padding: 28,
            }}>
              <div style={{ fontSize: 28, marginBottom: 14 }}>{card.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{card.title}</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{card.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '32px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: 1200,
        margin: '0 auto',
        fontSize: 12,
        color: 'rgba(255,255,255,0.25)',
        flexWrap: 'wrap' as const,
        gap: 12,
      }}>
        <span>© 2025 Fidelity Investments. All rights reserved.</span>
        <span>This is a simulated IPO experience. Not financial advice.</span>
      </footer>
    </main>
  )
}
