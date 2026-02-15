import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Battery, Car, Zap, Globe, IndianRupee } from 'lucide-react';

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  category: 'automaker' | 'battery' | 'charging' | 'component';
}

const EVStockInfo: React.FC = () => {
  const stockData: StockData[] = [
    {
      symbol: 'TATAMOTORS',
      name: 'Tata Motors',
      price: 675.80,
      change: 12.45,
      changePercent: 1.88,
      volume: '2.3M',
      marketCap: '₹2.3L Cr',
      category: 'automaker'
    },
    {
      symbol: 'M&M',
      name: 'Mahindra & Mahindra',
      price: 1425.60,
      change: -8.20,
      changePercent: -0.57,
      volume: '1.8M',
      marketCap: '₹1.8L Cr',
      category: 'automaker'
    },
    {
      symbol: 'EXIDEIND',
      name: 'Exide Industries',
      price: 198.45,
      change: 5.67,
      changePercent: 2.94,
      volume: '4.2M',
      marketCap: '₹45K Cr',
      category: 'battery'
    },
    {
      symbol: 'AMARAJABAT',
      name: 'Amara Raja Batteries',
      price: 156.30,
      change: 3.25,
      changePercent: 2.12,
      volume: '3.1M',
      marketCap: '₹12K Cr',
      category: 'battery'
    },
    {
      symbol: 'TATACONSUM',
      name: 'Tata Consumer',
      price: 845.20,
      change: 15.80,
      changePercent: 1.91,
      volume: '1.5M',
      marketCap: '₹85K Cr',
      category: 'component'
    },
    {
      symbol: 'BOSCHLTD',
      name: 'Bosch Limited',
      price: 19250.00,
      change: -125.50,
      changePercent: -0.65,
      volume: '0.8M',
      marketCap: '₹58K Cr',
      category: 'component'
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'automaker':
        return <Car className="w-5 h-5" />;
      case 'battery':
        return <Battery className="w-5 h-5" />;
      case 'charging':
        return <Zap className="w-5 h-5" />;
      case 'component':
        return <Globe className="w-5 h-5" />;
      default:
        return <TrendingUp className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'automaker':
        return 'bg-blue-100 text-blue-600';
      case 'battery':
        return 'bg-green-100 text-green-600';
      case 'charging':
        return 'bg-purple-100 text-purple-600';
      case 'component':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const formatChange = (change: number, changePercent: number) => {
    const isPositive = change >= 0;
    return {
      color: isPositive ? 'text-green-600' : 'text-red-600',
      bgColor: isPositive ? 'bg-green-100' : 'bg-red-100',
      icon: isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />,
      text: `${isPositive ? '+' : ''}${change.toFixed(2)} (${isPositive ? '+' : ''}${changePercent.toFixed(2)}%)`
    };
  };

  return (
    <section className="py-8 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-[#0F3D2E] mb-4">
            EV Stock Market Live
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track real-time performance of top EV and related stocks in Indian market
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-500">Live Market Data</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stockData.map((stock, index) => {
            const changeData = formatChange(stock.change, stock.changePercent);
            return (
              <motion.div
                key={stock.symbol}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-gray-500">{stock.symbol}</span>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${getCategoryColor(stock.category)}`}>
                        {getCategoryIcon(stock.category)}
                      </div>
                    </div>
                    <h3 className="font-semibold text-[#0F3D2E]">{stock.name}</h3>
                  </div>
                  <div className={`px-2 py-1 rounded-full flex items-center gap-1 ${changeData.bgColor}`}>
                    {changeData.icon}
                    <span className={`text-xs font-semibold ${changeData.color}`}>
                      {changeData.text}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-baseline gap-2">
                    <IndianRupee className="w-4 h-4 text-gray-400" />
                    <span className="text-2xl font-bold text-[#0F3D2E]">
                      {stock.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Volume</span>
                      <p className="font-semibold text-gray-700">{stock.volume}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Market Cap</span>
                      <p className="font-semibold text-gray-700">{stock.marketCap}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gradient-to-r from-[#0F3D2E] to-[#1DB954] rounded-2xl p-6 text-white mb-8"
        >
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <h3 className="text-lg font-semibold mb-2">Market Cap</h3>
              <p className="text-3xl font-bold">₹12.5L Cr</p>
              <p className="text-sm text-white/80 mt-1">Total EV Sector</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Daily Volume</h3>
              <p className="text-3xl font-bold">₹8.2K Cr</p>
              <p className="text-sm text-white/80 mt-1">Trading Volume</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Top Gainer</h3>
              <p className="text-3xl font-bold">+5.8%</p>
              <p className="text-sm text-white/80 mt-1">Exide Industries</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Active Stocks</h3>
              <p className="text-3xl font-bold">24</p>
              <p className="text-sm text-white/80 mt-1">EV Companies</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center mt-6"
        >
          <p className="text-sm text-gray-500 mb-4">
            * Stock data is for informational purposes only. Please consult with financial advisors before making investment decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#1DB954] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#17a045] transition-colors">
              View Detailed Analysis
            </button>
            <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
              Set Price Alerts
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EVStockInfo;
