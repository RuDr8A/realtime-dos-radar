import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';


ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Analytics = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/analytics/summary')
      .then((res) => res.json())
      .then((data) => {
        
        const labels = data.map(item => item._id);
        const counts = data.map(item => item.count);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Total Attacks Recorded',
              data: counts,
              backgroundColor: ['#ff9800', '#ff0000', '#4caf50', '#ffeb3b'],
              borderColor: '#16161a',
              borderWidth: 2,
            },
          ],
        });
        setLoading(false);
      })
      .catch((err) => console.error("Failed to load analytics:", err));
  }, []);

  return (
    <div style={{ backgroundColor: '#0f0f11', color: '#ffffff', minHeight: '100vh', padding: '32px', fontFamily: 'monospace' }}>
      
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1>Historical Threat Analytics</h1>
        <Link to="/" style={{ color: '#4caf50', textDecoration: 'none', border: '1px solid #4caf50', padding: '8px 16px', borderRadius: '4px' }}>
          ← Back to Live Map
        </Link>
      </div>

      
      <div style={{ maxWidth: '800px', margin: '0 auto', background: '#16161a', border: '1px solid #333', borderRadius: '8px', padding: '32px' }}>
        {loading ? (
          <p style={{ color: '#666', textAlign: 'center' }}>Querying MongoDB storage...</p>
        ) : (
          <Bar 
            data={chartData} 
            options={{
              responsive: true,
              plugins: {
                legend: { labels: { color: '#ffffff' } },
                title: { display: true, text: 'Threat Distribution Breakdown (Persistent DB)', color: '#ffffff' }
              },
              scales: {
                x: { ticks: { color: '#aaa' }, grid: { color: '#222' } },
                y: { ticks: { color: '#aaa' }, grid: { color: '#222' } }
              }
            }} 
          />
        )}
      </div>
    </div>
  );
};

export default Analytics;