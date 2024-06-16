import { WhitelistedTokenAddresses } from '@/constants'
import React from 'react'

export default function Page() {


  const data = WhitelistedTokenAddresses;
  return (
    <div className="w-full">
       <div className="mx-auto mb-4 mt-28 w-[90%] text-[#374950]">
        <div className="rounded-lg bg-white px-4 py-4 text-[14px]">
          <h1 className="text-[20px] font-semibold">Faucet Links</h1>
          <table className='w-full'>
            <tr  className='flex justify-between'>
              <th>Token Name</th>
              <th>Token Address</th>
              <th>Go to Faucet</th>
            </tr>
            {Object.keys(data).map((key) => (
              <tr key={key}  className='flex justify-between'>
                <td>{data[key].name}</td>
                <td>{data[key].address}</td>
                <td><a className='' href={`/faucet/${key}`}>Click here</a></td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>

  )
}
