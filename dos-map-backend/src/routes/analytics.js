
const express = require('express');
const router = express.Router();
const Attack = require('../models/Attack');


router.get('/summary', async (req, res) => {
    try {
        const summary = await Attack.aggregate([
            { $group: { _id: "$threatLevel", count: { $sum: 1 } } },
            { $sort: { count: -1 } } 
        ]);
        res.json(summary);
    } catch (error) {
        console.error("Aggregation Error:", error);
        res.status(500).json({ error: "Failed to fetch analytics" });
    }
});

router.get('/recent', async (req, res) => {
    try {
        const recentAttacks = await Attack.find()
            .sort({ timestamp: -1 }) 
            .limit(50); 
        res.json(recentAttacks);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch recent data" });
    }
});

module.exports = router;