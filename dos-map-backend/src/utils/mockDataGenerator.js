function mockGenerator() {

    
    const sourceLat = Number((Math.random() * 180 - 90).toFixed(4));
    const targetLat = Number((Math.random() * 180 - 90).toFixed(4));

    
    const sourceLng = Number((Math.random() * 360 - 180).toFixed(4));
    const targetLng = Number((Math.random() * 360 - 180).toFixed(4));

    const threatLevels = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
    const threatLevelIndex = Math.floor(Math.random() * threatLevels.length);

    return {
        "sourceLat": sourceLat,
        "sourceLng": sourceLng,
        "targetLat": targetLat,
        "targetLng": targetLng,
        "threatLevel": threatLevels[threatLevelIndex]
    };
}


module.exports = mockGenerator;