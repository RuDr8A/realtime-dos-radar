import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const BACKEND_URL = "http://localhost:3000";

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [attacks, setAttacks] = useState([]);

  useEffect(() => {
    const socket = io(BACKEND_URL);

    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected:', socket.id);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

   
    socket.on('new-attack', (data) => {
      setAttacks((prev) => [data, ...prev].slice(0, 15)); 
    });

    
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div style={{ backgroundColor: '#0f0f11', color: '#ffffff', minHeight: '100vh', padding: '24px', fontFamily: 'monospace' }}>
      <h1>Cyber Threat Monitoring System</h1>
      
      {/* Network Status Badge */}
      <div style={{ margin: '16px 0' }}>
        Status:{' '}
        <span style={{ color: isConnected ? '#4caf50' : '#f44336', fontWeight: 'bold' }}>
          {isConnected ? '● ACTIVE STREAMING' : '○ DISCONNECTED'}
        </span>
      </div>

      {/* Raw Data List Area */}
      <div style={{ border: '1px solid #333', borderRadius: '6px', padding: '16px', background: '#16161a' }}>
        <h3>Incoming Attack Stream Logs</h3>
        {attacks.length === 0 ? (
          <p style={{ color: '#666' }}>Awaiting payload synchronization...</p>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {attacks.map((item, i) => (
              <li key={i} style={{ borderBottom: '1px solid #222', padding: '8px 0', fontSize: '14px' }}>
                ⚡ [<span style={{ color: '#ff9800' }}>{item.threatLevel}</span>] 
                LAT: {item.sourceLat.toFixed(2)} LNG: {item.sourceLng.toFixed(2)} → 
                TARGET: {item.targetLat.toFixed(2)}, {item.targetLng.toFixed(2)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
