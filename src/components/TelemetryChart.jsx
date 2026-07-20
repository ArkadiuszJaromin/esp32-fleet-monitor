import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function TelemetryChart({ data }) {
  return (
    <div className="card" style={{ height: 320 }}>
      <div className="panel-title">
        <span>Telemetria — czujnik ESP32 #A1</span>
        <span>ostatnie 60s</span>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1c242c" />
          <XAxis dataKey="t" stroke="#6f7c88" fontSize={11} fontFamily="JetBrains Mono" />
          <YAxis stroke="#6f7c88" fontSize={11} fontFamily="JetBrains Mono" />
          <Tooltip
            contentStyle={{ background: '#12171c', border: '1px solid #232b32', fontFamily: 'JetBrains Mono', fontSize: 12 }}
            labelStyle={{ color: '#6f7c88' }}
          />
          <Line type="monotone" dataKey="temp" stroke="#ffb454" strokeWidth={2} dot={false} name="Temp (°C)" />
          <Line type="monotone" dataKey="hum" stroke="#4cc9f0" strokeWidth={2} dot={false} name="Wilgotność (%)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
