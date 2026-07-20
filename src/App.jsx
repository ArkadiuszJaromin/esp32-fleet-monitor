import { useState, useEffect, useRef } from 'react'
import StatCard from './components/StatCard.jsx'
import TelemetryChart from './components/TelemetryChart.jsx'
import DeviceList from './components/DeviceList.jsx'



export default function App() {

  const [upTime, setUpTime] = useState(0);
  const INITIAL_DEVICES = [
    { id: 'ESP32-A1', name: 'Production hall sensor', on: true, upTime: upTime },
    { id: 'ESP32-B2', name: 'Conveyor controller', on: true, upTime: upTime },
    { id: 'ESP32-C3', name: 'Drone Wi-Fi control module', on: false, upTime: upTime },
    { id: 'ESP32-D4', name: 'HMI panel — workstation 2', on: true, upTime: upTime },
  ]

  function genPoint(t, prevTemp, prevHum) {
    const temp = Math.max(18, Math.min(32, prevTemp + (Math.random() - 0.5) * 1.4))
    const hum = Math.max(30, Math.min(70, prevHum + (Math.random() - 0.5) * 2.2))
    return { t, temp: Number(temp.toFixed(1)), hum: Number(hum.toFixed(1)) }
  }



  const [data, setData] = useState(() => {
    let temp = 23, hum = 48
    return Array.from({ length: 30 }, (_, i) => {
      const p = genPoint(i * 2, temp, hum)
      temp = p.temp; hum = p.hum
      return p
    })
  })
  const [devices, setDevices] = useState(INITIAL_DEVICES)
  const [now, setNow] = useState(new Date())
  const tRef = useRef(60)

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const last = prev[prev.length - 1]
        const next = genPoint(tRef.current, last.temp, last.hum)
        tRef.current += 2
        return [...prev.slice(1), next]
      })
      setNow(new Date())
      setDevices(prev =>
        prev.map(d => ({
          ...d,
          upTime: d.on ? d.upTime + 1 : 0
        }))
      )

    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const toggleDevice = (id) => {
    setDevices(prev => prev.map(d => d.id === id ?
      {
        ...d,
        on: !d.on,
        upTime: 0
      } : d))
  }

  const last = data[data.length - 1]
  const first = data[0]
  const tempTrend = last.temp >= first.temp ? 'up' : 'down'
  const humTrend = last.hum >= first.hum ? 'up' : 'down'

  return (
    <div className="dashboard">
      <div className="topbar">
        <div className="brand">
          <span className="eyebrow">Test Application · Internal Dashboard</span>
          <h1>ESP32 Fleet Monitor</h1>
        </div>
        <div className="brand" style={{ alignItems: 'flex-end' }}>
          <div className="clock">{now.toLocaleTimeString('pl-PL')}</div>
          <div className="conn-status">
            <span className="pulse-dot" />
            MQTT broker connected
          </div>
        </div>
      </div>

      <div className="grid">
        <StatCard
          label="Temperature"
          value={last.temp}
          unit="°C"
          trend={tempTrend === 'up' ? '▲ increasing' : '▼ decreasing'}
          trendDir={tempTrend}
        />

        <StatCard
          label="Humidity"
          value={last.hum}
          unit="%"
          trend={humTrend === 'up' ? '▲ increasing' : '▼ decreasing'}
          trendDir={humTrend}
        />
        <StatCard
          label="Online devices"
          value={devices.filter(d => d.on).length}
          unit={`/ ${devices.length}`}
        />
      </div>

      <div className="main-grid">
        <TelemetryChart data={data} />
        <DeviceList devices={devices} onToggle={toggleDevice} />
      </div>

      <div className="footer-note">
        // simulated telemetry data — structure prepared for real ESP32 integration via MQTT or REST (e.g. Node-RED)
      </div>
    </div>
  )
}
