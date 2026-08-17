import { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

const ThreatGlobe = ({ attacks }) => {
  const globeRef = useRef();

  
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.8;
    }
  }, []);

  
  const arcsData = attacks.map((attack) => {
    let arcColor = '#4caf50'; 
    if (attack.threatLevel === 'CRITICAL') arcColor = '#ff0000'; 
    else if (attack.threatLevel === 'HIGH') arcColor = '#ff9800'; 
    else if (attack.threatLevel === 'MEDIUM') arcColor = '#ffeb3b'; 

    return {
      startLat: attack.sourceLat,
      startLng: attack.sourceLng,
      endLat: attack.targetLat,
      endLng: attack.targetLng,
      color: arcColor
    };
  });

  return (
    <div style={{ cursor: 'grab', display: 'flex', justifyContent: 'center' }}>
      <Globe
        ref={globeRef}
        
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        backgroundColor="rgba(0,0,0,0)" 
        
        
        arcsData={arcsData}
        arcStartLat={(d) => d.startLat}
        arcStartLng={(d) => d.startLng}
        arcEndLat={(d) => d.endLat}
        arcEndLng={(d) => d.endLng}
        arcColor={(d) => d.color}
        
        
        arcDashLength={0.5}
        arcDashGap={0.2}
        arcDashAnimateTime={1200}
        arcsTransitionDuration={0} 
        
        
        width={700}
        height={700}
      />
    </div>
  );
};

export default ThreatGlobe;