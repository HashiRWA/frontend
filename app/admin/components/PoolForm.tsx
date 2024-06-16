"use client"

import React, { useState } from 'react';

interface FormConfig {
  name: string;
  symbol: string;
  maturationdate: number;
  debtinterestrate: string;
  strikeprice: string;
  lendinterestrate: string;
  lockInPeriod: string;
  overcollateralizationfactor: string;
  asset: string;
  collateral: string;
}

interface FormState {
  config: FormConfig;
}

const init: FormState = {
  config: {
    name: "",
    symbol: "",
    maturationdate: 0,
    debtinterestrate: "",
    strikeprice: "",
    lendinterestrate: "",
    lockInPeriod: "",
    overcollateralizationfactor: "",
    asset: "", 
    collateral: "", 
  },
};


const PoolForm: React.FC = () => {

  const [form, setForm] = useState<FormState>(init);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if(name=="maturationdate"){
      setForm((prevForm) => ({
        ...prevForm,
        config: {
          ...prevForm.config,
          [name]: Math.floor(new Date(value).getTime() / 1000),
        },
      }));
      return

    }

    else{
      setForm((prevForm) => ({
        ...prevForm,
        config: {
          ...prevForm.config,
          [name]: value,
        },
      }));
      return
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form, "form dataaaaaaa")
    const res =  await fetch("/api/uploadContract",{
      method: 'POST',
      body: JSON.stringify({ 
        init:form,
        label:`Deploying pool ${form.config.name} with symbol ${form.config.symbol}`
      })
    })

    res.json().then((res)=>{
      let data = localStorage.getItem("admin-pools")
      if(!data){
        localStorage.setItem("admin-pools",JSON.stringify([res.data]))
        return
      }
      else{
        localStorage.setItem("admin-pools",JSON.stringify([...JSON.parse(data),res.data]))
        return
      }
    })
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
            type="date" 
            name="maturationdate" 
            value={new Date(
              form.config.maturationdate * 1000
            ).toDateString()} 
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
          <label className="block mb-2 font-medium text-[#374950]">Lock In Factor</label>
          <input 
            type="text" 
            name="lockInPeriod" 
            value={form.config.lockInPeriod} 
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
          <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Create Pool</button>
        </div>
      </form>
    </div>
  );
};

export default PoolForm;
