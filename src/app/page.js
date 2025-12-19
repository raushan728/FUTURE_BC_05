'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false'
    )
      .then((res) => res.json())
      .then((data) => setCoins(data))
      .catch((error) => console.log(error));
  }, []);
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">

      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
          Crypto Portfolio Tracker
        </h1>
        <p className="text-slate-400 mb-8">Live Prices by CoinGecko API</p>


        <input
          type="text"
          placeholder="Search Bitcoin, Ethereum..."
          className="w-full max-w-md p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-cyan-400 transition-colors text-white"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>


      <div className="max-w-4xl mx-auto bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-950 text-slate-400 uppercase text-sm">
              <tr>
                <th className="p-4">Coin</th>
                <th className="p-4">Price</th>
                <th className="p-4">24h Change</th>
                <th className="p-4">Market Cap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filteredCoins.map((coin) => (
                <tr key={coin.id} className="hover:bg-slate-700/50 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                    <div>
                      <p className="font-bold">{coin.name}</p>
                      <span className="text-xs text-slate-400 uppercase">{coin.symbol}</span>
                    </div>
                  </td>
                  <td className="p-4 font-mono">
                    ${coin.current_price.toLocaleString()}
                  </td>
                  <td className={`p-4 font-bold ${coin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td className="p-4 text-slate-400">
                    ${coin.market_cap.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center mt-10 text-slate-500 text-sm">
        Built with Next.js & Tailwind CSS by Raushan
      </div>
    </main>
  );
}