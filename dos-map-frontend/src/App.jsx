import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SocketProvider } from './context/SocketContext';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics'; 

const App = () => {
  return (
    <SocketProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} /> 
        </Routes>
      </Router>
    </SocketProvider>
  );
};

export default App;