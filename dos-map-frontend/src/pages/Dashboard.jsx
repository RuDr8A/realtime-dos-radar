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
              <span className="font-telemetry-code text-error text-[16px]">{attacks.length > 0 ? 'HIGH' : 'LOW'}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-badge-caps text-on-surface-variant uppercase">Stream Rate</span>
              <span className="font-telemetry-code text-primary text-[16px]">~15 evt/sec</span>
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
                        <span className="text-on-surface">CRITICAL_LEVEL</span><span className="text-error">98% SEV</span>
                      </div>
                      <div className="h-[4px] w-full bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-error w-[98%]"></div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-xs">
                      <div className="flex justify-between items-center font-telemetry-code text-[12px]">
                        <span className="text-on-surface">HIGH_LEVEL</span><span className="text-primary">74% SEV</span>
                      </div>
                      <div className="h-[4px] w-full bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[74%]"></div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-xs">
                      <div className="flex justify-between items-center font-telemetry-code text-[12px]">
                        <span className="text-on-surface">MEDIUM_LEVEL</span><span className="text-surface-tint">42% SEV</span>
                      </div>
                      <div className="h-[4px] w-full bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-surface-tint w-[42%]"></div>
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

            
            <div className="h-48 grid grid-cols-1 xl:grid-cols-3 gap-xl mt-4">
              <div className="bg-surface-container rounded-lg relative overflow-hidden flex flex-col p-md border border-outline-variant/30">
                <div className="flex justify-between items-start mb-sm">
                  <div className="flex flex-col">
                    <span className="font-badge-caps text-outline uppercase">REQ_PER_SEC</span>
                    <span className="font-bold text-on-surface text-[24px]">45,291</span>
                  </div>
                  <span className="text-error font-telemetry-code text-[12px]">+12.4%</span>
                </div>
                <div className="flex-1 w-full relative">
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
                    <path className="text-primary" d="M0 30 Q 10 20, 20 25 T 40 15 T 60 35 T 80 10 T 100 20" fill="none" stroke="currentColor" strokeWidth="2"></path>
                    <path className="text-primary/10" d="M0 30 Q 10 20, 20 25 T 40 15 T 60 35 T 80 10 T 100 20 L 100 40 L 0 40 Z" fill="currentColor"></path>
                  </svg>
                </div>
              </div>

              <div className="bg-surface-container rounded-lg relative overflow-hidden flex flex-col p-md border border-outline-variant/30">
                <div className="flex justify-between items-start mb-sm">
                  <div className="flex flex-col">
                    <span className="font-badge-caps text-outline uppercase">BANDWIDTH_GBPS</span>
                    <span className="font-bold text-on-surface text-[24px]">14.2</span>
                  </div>
                  <span className="text-secondary font-telemetry-code text-[12px]">-2.1%</span>
                </div>
                <div className="flex-1 w-full relative">
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
                    <path className="text-secondary" d="M0 10 Q 15 30, 30 15 T 50 25 T 70 5 T 85 20 T 100 10" fill="none" stroke="currentColor" strokeWidth="2"></path>
                    <path className="text-secondary/10" d="M0 10 Q 15 30, 30 15 T 50 25 T 70 5 T 85 20 T 100 10 L 100 40 L 0 40 Z" fill="currentColor"></path>
                  </svg>
                </div>
              </div>

              <div className="bg-surface-container rounded-lg relative overflow-hidden flex flex-col p-md border border-outline-variant/30">
                <div className="flex justify-between items-start mb-sm">
                  <div className="flex flex-col">
                    <span className="font-badge-caps text-outline uppercase">PKT_DROP_RATE</span>
                    <span className="font-bold text-on-surface text-[24px]">0.04%</span>
                  </div>
                  <span className="text-outline font-telemetry-code text-[12px]">STABLE</span>
                </div>
                <div className="flex-1 w-full relative">
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
                    <path className="text-outline" d="M0 35 L 20 36 L 40 34 L 60 38 L 80 35 L 100 36" fill="none" stroke="currentColor" strokeWidth="2"></path>
                  </svg>
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