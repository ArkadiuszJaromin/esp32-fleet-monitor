export default function DeviceList({ devices, onToggle }) {
  return (
    <div className="card" style={{ height: 320, overflowY: 'hidden' }}>
      <div className="panel-title">
        <span>Urządzenia</span>
        <span>{devices.filter(d => d.on).length}/{devices.length} aktywne</span>
      </div>
      <div className="device-list">
        {devices.map(d => (
          <div className="device-row" key={d.id}>
            <div className="device-info">
              <span className={`led ${d.on ? 'on' : 'off'}`} />
              <div>
                <div className="device-name">{d.name}</div>
                <div className="device-meta">{d.id} · {d.on ? 'online' : 'offline'} · {d.upTime}s</div>
              </div>
            </div>
            <div
              className={`toggle ${d.on ? 'active' : ''}`}
              onClick={() => onToggle(d.id)}
              role="switch"
              aria-checked={d.on}
              tabIndex={0}
            >
              <div className="knob" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
