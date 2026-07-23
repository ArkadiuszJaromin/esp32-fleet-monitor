export default function DeviceList({ devices, onToggle, filterActive, setFilterActive }) {

  const visibleDevices = filterActive ? devices.filter(d => d.on) : devices

  return (
    <div className="card" style={{ height: 360, overflowY: 'hidden' }}>
      <div className="panel-title">
        <span>Devices</span>
        

        <span>{devices.filter(d => d.on).length}/{devices.length} active</span>
        
      </div>
      <div className="panel-title">
        
          <span>Show only active devices</span>
          <div
            className={`toggle ${filterActive ? 'active' : ''}`}
            role="switch"
            tabIndex={0}
            onClick={() => setFilterActive(!filterActive)}
          >

            <div className="knob" />
          
        </div>
        
      </div>
      
      <div className="device-list">
        {visibleDevices.map(d => (
          
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