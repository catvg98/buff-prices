module.exports = async (req, res) => {
    const apiKey = process.env.PRICEMPIRE_API_KEY;
    
    const url = `https://api.pricempire.com/v4/trader/items/prices?app_id=730&sources=buff163&currency=USD&avg=false&median=false&inflation_threshold=-1`;
    
    try {
        const response = await fetch(url, {
            headers: { 'Authorization': `Bearer ${apiKey}` }
        });
        
        const data = await response.json();
        
        // Debug: mostra os primeiros 2 items para vermos a estrutura
        res.status(200).json({
            total: Array.isArray(data) ? data.length : "not array",
            type: typeof data,
            sample: Array.isArray(data) ? data.slice(0, 2) : data
        });
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
