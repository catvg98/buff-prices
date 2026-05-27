module.exports = async (req, res) => {
    const apiKey = process.env.PRICEMPIRE_API_KEY;
    
    const url = `https://api.pricempire.com/v4/trader/items/prices?app_id=730&sources=buff163&currency=USD&avg=false&median=false&inflation_threshold=-1`;
    
    try {
        const response = await fetch(url, {
            headers: { 'Authorization': `Bearer ${apiKey}` }
        });
        
        const data = await response.json();
        
        // Procura o primeiro item que tenha prices não vazio
        const itemWithPrices = data.find(item => item.prices && item.prices.length > 0);
        
        res.status(200).json({
            sample_empty: data[0],
            sample_with_prices: itemWithPrices || "none found"
        });
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
