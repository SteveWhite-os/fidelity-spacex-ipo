'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

type Pledge = {
  id: string
  email: string
  amount: number
  payment_method: string
  created_at: string
}

export default function AdminPage() {
  const [pledges, setPledges] = useState<Pledge[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    async function fetchPledges() {
      const { data } = await supabase
        .from('pledges')
        .select('*')
        .order('created_at', { ascending: false })
      if (data) {
        setPledges(data)
        setTotal(data.reduce((sum, p) => sum + Number(p.amount), 0))
      }
      setLoading(false)
    }
    fetchPledges()
  }, [])

  return (
    <main style={{
      minHeight: '100vh',
      background: '#050A14',
      color: '#E8EDF5',
      fontFamily: "'Inter', sans-serif",
      padding: '40px 48px',
    }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.03em' }}>
        Pledge Dashboard
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 36, fontSize: 14 }}>SpaceX IPO — All submissions</p>

      <div style={{ display: 'flex', gap: 20, marginBottom: 40 }}>
        {[
          { label: 'Total Pledges', value: pledges.length },
          { label: 'Total Amount', value: `$${total.toLocaleString()}` },
        ].map((s) => (
          <div key={s.label} style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12,
            padding: '20px 28px',
            minWidth: 160,
          }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 26, fontWeight: 800 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {loading ? (
        <div style={{ color: 'rgba(255,255,255,0.4)' }}>Loading...</div>
      ) : pledges.length === 0 ? (
        <div style={{ color: 'rgba(255,255,255,0.4)' }}>No pledges yet.</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              {['Email', 'Amount', 'Payment', 'Date'].map((h) => (
                <th key={h} style={{
                  textAlign: 'left',
                  padding: '10px 16px',
                  color: 'rgba(255,255,255,0.35)',
                  fontWeight: 500,
                  fontSize: 12,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pledges.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '14px 16px' }}>{p.email}</td>
                <td style={{ padding: '14px 16px', color: '#4ADE80', fontWeight: 600 }}>${Number(p.amount).toLocaleString()}</td>
                <td style={{ padding: '14px 16px', textTransform: 'capitalize', color: 'rgba(255,255,255,0.6)' }}>{p.payment_method}</td>
                <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.4)' }}>{new Date(p.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  )
}
