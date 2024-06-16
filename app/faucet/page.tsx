import { WhitelistedTokenAddresses } from '@/constants'
import React from 'react'

export default function Page() {


  const data = WhitelistedTokenAddresses;
  return (
    <div className="w-full">
       <div className="mx-auto mb-4 mt-28 w-[90%] text-[#374950]">
        <div className="rounded-lg bg-white px-4 py-4 text-[14px]">
          <h1 className="text-[20px] font-semibold">Faucet Links</h1>
          <section className='w-full'>
            <div  className='flex justify-between font-bold'>
              <span>Token Name</span>
              <span>Token Address</span>
              <span>Go to Faucet</span>
            </div>
            {Object.keys(data).map((key) => (
              <div key={key}  className='flex justify-between'>
                <span>{data[key].name}</span>
                <span>{data[key].address}</span>
                <span><a className='' href={`/faucet/${key}`}>Click here</a></span>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>

  )
}
