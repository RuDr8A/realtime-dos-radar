import { useSocket } from '../context/SocketContext';
import ThreatGlobe from '../components/ThreatGlobe';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { isConnected, attacks } = useSocket();

  return (
    <div style={{ backgroundColor: '#0f0f11', color: '#ffffff', minHeight: '100vh', padding: '32px', fontFamily: 'monospace' }}>
      
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1>Global Threat Map</h1>
        
        
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Link to="/analytics" style={{ color: '#ff9800', textDecoration: 'none', border: '1px solid #ff9800', padding: '8px 16px', borderRadius: '4px' }}>
            View Analytics →
          </Link>
          
          <div style={{ color: isConnected ? '#4caf50' : '#f44336', fontWeight: 'bold', padding: '8px 16px', border: `1px solid ${isConnected ? '#4caf50' : '#f44336'}`, borderRadius: '4px' }}>
            {isConnected ? '● ACTIVE STREAMING' : '○ DISCONNECTED'}
          </div>
        </div>

      </div>

      
      <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
        
        
        <div style={{ flex: '2', background: '#16161a', borderRadius: '8px', border: '1px solid #333', overflow: 'hidden' }}>
          <ThreatGlobe attacks={attacks} />
        </div>

        
        <div style={{ flex: '1', border: '1px solid #333', borderRadius: '8px', padding: '24px', background: '#16161a', minHeight: '700px', maxHeight: '700px', overflowY: 'auto' }}>
          <h3 style={{ marginTop: 0, borderBottom: '1px solid #333', paddingBottom: '12px' }}>Live Intercept Logs</h3>
          
          {attacks.length === 0 ? (
            <p style={{ color: '#666' }}>Awaiting payload synchronization...</p>
          ) : (
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
              {attacks.map((item, i) => (
                <li key={i} style={{ borderBottom: '1px solid #222', padding: '12px 0', fontSize: '13px' }}>
                  <div style={{ marginBottom: '4px' }}>
                    ⚡ Threat: <span style={{ color: item.threatLevel === 'CRITICAL' ? '#ff0000' : '#ff9800', fontWeight: 'bold' }}>[{item.threatLevel}]</span>
                  </div>
                  <div style={{ color: '#aaa' }}>
                    SRC: {item.sourceLat}, {item.sourceLng}
                  </div>
                  <div style={{ color: '#aaa' }}>
                    TGT: {item.targetLat}, {item.targetLng}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;