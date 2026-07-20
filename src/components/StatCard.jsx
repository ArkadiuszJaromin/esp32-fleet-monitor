export default function StatCard({ label, value, unit, trend, trendDir }) {
  return (
    <div className="card stat-card">
      <div className="label">
        <span>{label}</span>
        {trend && <span className={`trend ${trendDir}`}>{trend}</span>}
      </div>
      <div className="value">
        {value}
        {unit && <span className="unit">{unit}</span>}
      </div>
    </div>
  )
}
