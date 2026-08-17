import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { useSocket } from '../context/SocketContext'; // Import socket for the sidebar status

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Analytics = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isConnected } = useSocket(); // Pull connection status

  useEffect(() => {
    fetch('http://localhost:3000/api/analytics/summary')
      .then((res) => res.json())
      .then((data) => {
        const labels = data.map(item => item._id);
        const counts = data.map(item => item.count);

        // Dynamically color the bars to match your exact Tailwind theme
        const backgroundColors = labels.map(label => {
            if (label === 'CRITICAL') return '#ffb4ab'; // Tailwind text-error
            if (label === 'HIGH') return '#ffc081';     // Tailwind text-primary
            if (label === 'MEDIUM') return '#ffb870';   // Tailwind text-surface-tint
            if (label === 'LOW') return '#78dc77';      // Tailwind text-secondary
            return '#a38d7a';
        });

        setChartData({
          labels,
          datasets: [
            {
              label: 'Total Attacks Recorded',
              data: counts,
              backgroundColor: backgroundColors,
              borderColor: '#201f21', // Matches surface-container
              borderWidth: 2,
            },
          ],
        });
        setLoading(false);
      })
      .catch((err) => console.error("Failed to load analytics:", err));
  }, []);

  return (
    <div className="bg-background font-body-base text-on-background min-h-screen">
      
      {/* Sidebar - Identical to Dashboard, but Analytics is Active */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-low border-r border-outline-variant z-50 flex flex-col pt-lg">
        <div className="px-lg mb-xl flex items-center gap-sm">
          <span className="material-symbols-outlined text-primary">radar</span>
          <span className="font-title-sm uppercase tracking-widest text-on-surface">DOS.RADAR</span>
        </div>
        
        <nav className="flex-1">
          {/* Dashboard Link (Inactive) */}
          <Link to="/" className="flex items-center px-lg py-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-base group">
            <span className="material-symbols-outlined mr-md">sensors</span>Live Radar
          </Link>
          {/* Analytics Link (Active) */}
          <Link to="/analytics" className="flex items-center px-lg py-md transition-all font-body-base group bg-primary/10 border-l-4 border-primary text-primary">
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

      {/* Main Content Area */}
      <div className="pl-64">
        
        {/* Top Header */}
        <header className="fixed top-0 left-64 right-0 h-16 bg-surface/90 backdrop-blur-md border-b border-outline-variant z-40 flex items-center justify-between px-xl">
          <div className="flex items-center gap-xl">
             <h1 className="text-[20px] font-bold text-on-surface">Historical Threat Analytics</h1>
          </div>
          <div className="flex items-center gap-lg">
            <Link to="/" className="text-outline border border-outline px-4 py-1 rounded hover:bg-surface-container-high text-sm font-bold transition-all">
              ← Back to Radar
            </Link>
          </div>
        </header>

        {/* Analytics Content Grid */}
        <main className="relative pt-24 bg-background min-h-screen p-xl">
          <div className="flex flex-col w-full h-full gap-xl">
            
            {/* Styled Chart Container */}
            <div className="bg-surface-container rounded-lg relative overflow-hidden flex flex-col min-h-[600px] border border-outline-variant/30 p-xl">
              
              <div className="flex items-center justify-between mb-lg border-b border-outline-variant/30 pb-4">
                 <h2 className="text-[20px] font-bold text-on-surface font-telemetry-code">THREAT_DISTRIBUTION (DB_STORAGE)</h2>
                 <span className="material-symbols-outlined text-outline">storage</span>
              </div>

              <div className="flex-1 w-full max-w-4xl mx-auto flex items-center justify-center">
                {loading ? (
                  <p className="text-outline font-telemetry-code animate-pulse">Querying MongoDB cluster...</p>
                ) : (
                  <Bar 
                    data={chartData} 
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { labels: { color: '#e5e1e4', font: { family: 'JetBrains Mono' } } }, // text-on-surface
                        title: { display: false }
                      },
                      scales: {
                        x: { ticks: { color: '#dbc2ad', font: { family: 'JetBrains Mono' } }, grid: { color: '#353437' } }, // text-on-surface-variant & surface-variant
                        y: { ticks: { color: '#dbc2ad', font: { family: 'JetBrains Mono' } }, grid: { color: '#353437' } }
                      }
                    }} 
                  />
                )}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;