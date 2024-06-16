"use client"

import React, { useContext, useEffect, useState } from 'react';
import { BlockChainContext } from "@/context/BlockChainContext";


interface FormConfig {
  name: string;
  symbol: string;
  maturationdate: number;
  debtinterestrate: string;
  strikeprice: string;
  lendinterestrate: string;
  overcollateralizationfactor: string;
  asset: string;
  collateral: string;
}

interface FormState {
  config: FormConfig;
}

const init: FormState = {
  config: {
    name: "Test Pool",
    symbol: "TP",
    maturationdate: 1749773599,
    debtinterestrate: "17",
    strikeprice: "2",
    lendinterestrate: "10",
    overcollateralizationfactor: "3",
    asset: "mantra1c0wehfltspqczqmgv86nn0asf5jstld0yvqzzjtsavsn7pgzakusqa77lj", 
    collateral: "mantra15cxyuljght67pazn72kggeqa6ejj7f6gpeypa8yw6tzm95qr0cksq7css2", 
  },
};

const PoolForm: React.FC = () => {

  const [form, setForm] = useState<FormState>(init);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      config: {
        ...prevForm.config,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res =  await fetch("/api/uploadContract",{
      method: 'POST',
      body: JSON.stringify({ 
        init:init,
        label:"heloo"
      })
    })

    console.log(res.json())

  };

  return (
    <div className="bg-white p-8 rounded-lg w-[70%]  shadow-lg">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 font-medium text-[#374950]">Name</label>
          <input 
            type="text" 
            name="name" 
            value={form.config.name} 
            onChange={handleChange} 
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-[#374950]">Symbol</label>
          <input 
            type="text" 
            name="symbol" 
            value={form.config.symbol} 
            onChange={handleChange} 
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-[#374950]">Maturation Date</label>
          <input 
            type="number" 
            name="maturationdate" 
            value={form.config.maturationdate} 
            onChange={handleChange} 
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-[#374950]">Debt Interest Rate</label>
          <input 
            type="text" 
            name="debtinterestrate" 
            value={form.config.debtinterestrate} 
            onChange={handleChange} 
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-[#374950]">Strike Price</label>
          <input 
            type="text" 
            name="strikeprice" 
            value={form.config.strikeprice} 
            onChange={handleChange} 
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-[#374950]">Lend Interest Rate</label>
          <input 
            type="text" 
            name="lendinterestrate" 
            value={form.config.lendinterestrate} 
            onChange={handleChange} 
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-[#374950]">Over-collateralization Factor</label>
          <input 
            type="text" 
            name="overcollateralizationfactor" 
            value={form.config.overcollateralizationfactor} 
            onChange={handleChange} 
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-[#374950]">Asset Address</label>
          <input 
            type="text" 
            name="asset" 
            value={form.config.asset} 
            onChange={handleChange} 
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-[#374950]">Collateral Address</label>
          <input 
            type="text" 
            name="collateral" 
            value={form.config.collateral} 
            onChange={handleChange} 
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Borrow</button>
        </div>
      </form>
    </div>
  );
};

export default PoolForm;
