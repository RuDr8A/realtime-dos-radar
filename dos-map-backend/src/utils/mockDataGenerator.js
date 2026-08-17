const axios = require('axios');
const geoip = require('geoip-lite');


let maliciousIPs = [];

const fetchThreatIntelligence = async () => {
    try {
        console.log("[THREAT ENGINE] Fetching live IOCs from Abuse.ch...");
        const response = await axios.get('https://feodotracker.abuse.ch/downloads/ipblocklist.txt');

        const lines = response.data.split('\n');
        const ips = lines.filter(line => line && !line.startsWith('#'));
        
        maliciousIPs = ips;
        console.log(`[THREAT ENGINE] Successfully ingested ${ips.length} malicious IPs.`);
    } catch (error) {
        console.error("[THREAT ENGINE] Failed to fetch threat feed. Using local fallbacks.");
        maliciousIPs = ['8.8.8.8', '1.1.1.1', '9.9.9.9', '8.8.4.4']; 
    }
};

fetchThreatIntelligence();
setInterval(fetchThreatIntelligence, 12 * 60 * 60 * 1000);

const getRandomAttackerIP = () => {
    if (maliciousIPs.length === 0) return '192.168.1.1';
    return maliciousIPs[Math.floor(Math.random() * maliciousIPs.length)];
};

const generateTargetIP = () => {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
};


module.exports = () => {
    const sourceIP = getRandomAttackerIP();
    const targetIP = generateTargetIP();
    const sourceGeo = geoip.lookup(sourceIP);
    const targetGeo = geoip.lookup(targetIP);
    const srcLat = sourceGeo ? sourceGeo.ll[0] : (Math.random() * 180 - 90);
    const srcLng = sourceGeo ? sourceGeo.ll[1] : (Math.random() * 360 - 180);
    const tgtLat = targetGeo ? targetGeo.ll[0] : (Math.random() * 180 - 90);
    const tgtLng = targetGeo ? targetGeo.ll[1] : (Math.random() * 360 - 180);

    const randomRisk = Math.random();
    let threatLevel = 'LOW';
    if (randomRisk > 0.85) threatLevel = 'CRITICAL';
    else if (randomRisk > 0.6) threatLevel = 'HIGH';
    else if (randomRisk > 0.3) threatLevel = 'MEDIUM';

    return {
        sourceLat: Number(srcLat.toFixed(4)),
        sourceLng: Number(srcLng.toFixed(4)),
        targetLat: Number(tgtLat.toFixed(4)),
        targetLng: Number(tgtLng.toFixed(4)),
        threatLevel: threatLevel,
        timestamp: new Date()
    };
};