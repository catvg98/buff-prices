module.exports = async (req, res) => {
    const apiKey = process.env.PRICEMPIRE_API_KEY;
    
    const url = `https://api.pricempire.com/v4/trader/items/prices?app_id=730&sources=buff163&currency=USD&avg=false&median=false&inflation_threshold=-1`;
    
    try {
        const response = await fetch(url, {
            headers: { 'Authorization': `Bearer ${apiKey}` }
        });
        
        const data = await response.json();
        
        const prices = {};
        for (const item of data) {
            const name = item.market_hash_name;
            if (!name) continue;
            
            const buffEntry = item.prices?.find(p => p.provider_key === "buff163");
            const price = buffEntry?.price;
            
            if (price && price > 0) {
                prices[name] = { price: parseFloat(price) / 100 };
            }
        }
        
        prices.updated_at = new Date().toISOString();
        
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-store');
        res.status(200).json(prices);
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
