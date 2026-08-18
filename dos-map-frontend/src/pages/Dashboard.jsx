import { useMemo } from 'react';
import { useSocket } from '../context/SocketContext';
import ThreatGlobe from '../components/ThreatGlobe';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { isConnected, attacks } = useSocket();

  
  const getThreatColor = (level) => {
    switch (level) {
      case 'CRITICAL': return 'text-error';
      case 'HIGH': return 'text-primary';
      case 'MEDIUM': return 'text-surface-tint';
      case 'LOW': return 'text-secondary';
      default: return 'text-outline';
    }
  };

  
  const stats = useMemo(() => {
    const total = attacks.length || 1; // Prevent division by zero
    const critical = attacks.filter(a => a.threatLevel === 'CRITICAL').length;
    const high = attacks.filter(a => a.threatLevel === 'HIGH').length;
    const medium = attacks.filter(a => a.threatLevel === 'MEDIUM').length;

    return {
      totalRealTime: attacks.length,
      critPct: Math.round((critical / total) * 100),
      highPct: Math.round((high / total) * 100),
      medPct: Math.round((medium / total) * 100),
    };
  }, [attacks]);

  return (
    <div className="bg-background font-body-base text-on-background min-h-screen">
      
      <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-low border-r border-outline-variant z-50 flex flex-col pt-lg">
        <div className="px-lg mb-xl flex items-center gap-sm">
          <span className="material-symbols-outlined text-primary">radar</span>
          <span className="font-title-sm uppercase tracking-widest text-on-surface">DOS.RADAR</span>
        </div>
        
        <nav className="flex-1">
          <Link to="/" className="flex items-center px-lg py-md transition-all font-body-base group bg-primary/10 border-l-4 border-primary text-primary">
            <span className="material-symbols-outlined mr-md">sensors</span>Live Radar
          </Link>
          <Link to="/analytics" className="flex items-center px-lg py-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-base group">
            <span className="material-symbols-outlined mr-md">bar_chart</span>Analytics
          </Link>
        </nav>
        
        <div className="p-lg border-t border-outline-variant">
          <div className="flex items-center justify-between text-telemetry-code text-on-surface-variant">
            <span>SYS.STATUS</span>
            <span className={isConnected ? "text-secondary font-bold" : "text-error font-bold"}>
              {isConnected ? '● ACTIVE' : '○ OFFLINE'}
            </span>
          </div>
        </div>
      </aside>

      
      <div className="pl-64">
        
        
        <header className="fixed top-0 left-64 right-0 h-16 bg-surface/90 backdrop-blur-md border-b border-outline-variant z-40 flex items-center justify-between px-xl">
          <div className="flex items-center gap-xl">
            <div className="flex flex-col">
              <span className="text-badge-caps text-on-surface-variant uppercase">Threat Vol</span>
              <span className="font-telemetry-code text-error text-[16px]">{attacks.length > 0 ? 'LIVE' : 'AWAITING'}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-badge-caps text-on-surface-variant uppercase">Active IOCs</span>
              <span className="font-telemetry-code text-primary text-[16px]">{stats.totalRealTime} Nodes</span>
            </div>
          </div>
          <div className="flex items-center gap-lg">
            <Link to="/analytics" className="text-primary border border-primary px-4 py-1 rounded hover:bg-primary/10 text-sm font-bold">
              View Analytics →
            </Link>
          </div>
        </header>

        <main className="relative pt-24 bg-background min-h-screen p-xl">
          <div className="flex flex-col w-full h-full gap-xl">
            
            <div className="grid grid-cols-12 gap-xl flex-1">
              
              <div className="col-span-12 xl:col-span-4 flex flex-col bg-surface-container rounded-lg relative overflow-hidden min-h-[500px]">
                <div className="absolute inset-0 border border-outline-variant rounded-lg pointer-events-none"></div>
                <div className="p-md border-b border-outline-variant flex items-center justify-between">
                  <h2 className="text-[20px] font-bold text-on-surface">LIVE_INTERCEPT</h2>
                  <span className="material-symbols-outlined text-primary text-[18px]">stream</span>
                </div>
                
                <div className="flex-1 overflow-y-auto p-sm font-telemetry-code flex flex-col gap-1 relative">
                  {attacks.length === 0 ? (
                    <div className="p-4 text-outline">Awaiting telemetry payload...</div>
                  ) : (
                    attacks.map((item, i) => (
                      <div key={i} className="flex flex-col px-sm py-2 border-b border-outline-variant/30 hover:bg-surface-container-high cursor-crosshair">
                        <div className="flex justify-between w-full mb-1">
                          <span className={`${getThreatColor(item.threatLevel)} font-bold`}>
                            [{item.threatLevel}]
                          </span>
                        </div>
                        <div className="flex justify-between text-on-surface text-[11px]">
                          <span>SRC: {item.sourceLat}, {item.sourceLng}</span>
                          <span className="text-secondary ml-4">TGT: {item.targetLat}, {item.targetLng}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              
              <div className="col-span-12 xl:col-span-5 flex flex-col bg-surface-container rounded-lg relative overflow-hidden min-h-[500px] items-center justify-center">
                <div className="absolute inset-0 border border-outline-variant rounded-lg pointer-events-none z-20"></div>
                
                <div className="absolute top-md left-md z-10 flex gap-sm">
                  <div className="px-sm py-[2px] border border-primary text-primary font-badge-caps rounded">● 3D_MODE</div>
                </div>
                
                
                <div className="w-full h-full flex items-center justify-center">
                   <ThreatGlobe attacks={attacks} />
                </div>
              </div>

              
              <div className="col-span-12 xl:col-span-3 flex flex-col gap-md">
                
                <div className="bg-surface-container rounded-lg flex-1 relative overflow-hidden flex flex-col min-h-[300px]">
                  <div className="absolute inset-0 border border-outline-variant rounded-lg pointer-events-none"></div>
                  <div className="p-md border-b border-outline-variant">
                    <h2 className="font-bold text-[20px] text-on-surface">THREAT_VECTORS</h2>
                  </div>
                  <div className="p-md flex flex-col gap-md">
                    
                    
                    <div className="flex flex-col gap-xs">
                      <div className="flex justify-between items-center font-telemetry-code text-[12px]">
                        <span className="text-on-surface">CRITICAL_LEVEL</span>
                        <span className="text-error">{stats.critPct}% SEV</span>
                      </div>
                      <div className="h-[4px] w-full bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-error transition-all duration-500" style={{ width: `${stats.critPct}%` }}></div>
                      </div>
                    </div>

                    
                    <div className="flex flex-col gap-xs">
                      <div className="flex justify-between items-center font-telemetry-code text-[12px]">
                        <span className="text-on-surface">HIGH_LEVEL</span>
                        <span className="text-primary">{stats.highPct}% SEV</span>
                      </div>
                      <div className="h-[4px] w-full bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-primary transition-all duration-500" style={{ width: `${stats.highPct}%` }}></div>
                      </div>
                    </div>

                    
                    <div className="flex flex-col gap-xs">
                      <div className="flex justify-between items-center font-telemetry-code text-[12px]">
                        <span className="text-on-surface">MEDIUM_LEVEL</span>
                        <span className="text-surface-tint">{stats.medPct}% SEV</span>
                      </div>
                      <div className="h-[4px] w-full bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-surface-tint transition-all duration-500" style={{ width: `${stats.medPct}%` }}></div>
                      </div>
                    </div>

                  </div>
                </div>

               
                <div className="bg-surface-container rounded-lg relative overflow-hidden flex flex-col">
                  <div className="absolute inset-0 border border-outline-variant rounded-lg pointer-events-none"></div>
                  <div className="p-md border-b border-outline-variant">
                    <h2 className="font-badge-caps text-outline uppercase tracking-widest">MITIGATION_STATUS</h2>
                  </div>
                  <div className="p-md grid grid-cols-2 gap-sm">
                    <div className="p-sm border border-outline-variant rounded flex flex-col items-center justify-center bg-surface-container-low">
                      <span className="material-symbols-outlined text-primary mb-xs">shield</span>
                      <span className="font-telemetry-code text-[10px] text-on-surface">WAF_RULES</span>
                      <span className="font-telemetry-code text-secondary text-[12px]">ACTIVE</span>
                    </div>
                    <div className="p-sm border border-outline-variant rounded flex flex-col items-center justify-center bg-surface-container-low">
                      <span className="material-symbols-outlined text-outline mb-xs">hub</span>
                      <span className="font-telemetry-code text-[10px] text-on-surface">BGP_ROUTE</span>
                      <span className="font-telemetry-code text-outline text-[12px]">STABLE</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;