import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./components/Spinner";
const App = () => {
  
    // states 
    const [coins,setCoins]= useState([]);
    const [loading,setLoading]= useState(true);

    //useEffect
    useEffect(()=>{
      const fetchData=async()=>{
        try{
          const res=await axios.get(
            "https://api.coingecko.com/api/v3/coins/markets",
            {
              params:{
                vs_currency:"usd",
                order:"market_cap_desc",
                par_page:10,
                page:1,
                sparkline:false,
              },
            }
          );

          setCoins(res.data);
        } catch (error){
          console.log("Error fetching data",error);
        } finally{
          setLoading(false);
        }
      };

      fetchData();
    },[]);

    return(
    <div className='min-h-screen bg-gray-900 text-white flex items-center justify-center px-6 py-10 '>
      <div className='w-full max-w-5xl'>
        <h1 className='text-x1 tracking-[3px] mb-8 uppercase text-gray-300'>
          <span className='text-5xl'>C</span>ryptocurrencies market
        </h1>

        {loading?(
          <Spinner/>
        ):(
<div className='overflow-x-auto'>
          <table className='min-w-full border-white/20 rounded-lg overflow-hidden'>
            {/* Table Header */}
            <thead className='bg-gradient-to-r from indigo-500 to-pink-500'>
              <tr>
                <th className='px-4 py-2 text-left'>#9:56/31:08</th>
                <th className='px-4 py-2 text-left'>Name</th>
                <th className='px-4 py-2 text-left'>Price(USD)</th>
                <th className='px-4 py-2 text-left'>Market Cap</th>
                <th className='px-4 py-2 text-left'>24h Change</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {coins.map((coin,index)=>(
              <tr key={coin.id} className='border-t border-gray-600 bg-gray-800 hover:bg-white/10'>
                <td className='px-4 py-2'>{index+1}</td>
                <td className='px-4 py-2 flex items-center gap-2'>
                  <img src={coin.image} className="w-6 h-6" alt="coin.name" 
                  />
                  {coin.name } ({coin.symbol.toUpperCase()})
                </td>
                <td className='px-4 py-2'>${coin.current_price.toLocaleString()}</td>
                <td className='px-4 py-2'>${coin.market_cap.toLocaleString()}</td>
                <td className={`px-4 py-2 ${coin.price_change_percentage_24h>0?"text-green-400":"text-red-400"}`}>{coin.price_change_percentage_24h}</td>
              </tr>
            ))}
            </tbody>
          </table>

        </div>
        )}
        
      </div>
   </div>
  )
}

export default App