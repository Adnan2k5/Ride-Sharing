import React from 'react'
import wallet from "../assets/Icons/wallet.png"
import cab from "../assets/Icons/cab.png"
import earn from "../assets/Icons/earn.png"
export const UserWallet = ({user}) => {
  const Info = [
    {
      title: "Your Balance",
      ico: wallet,
      data: user.wallet
    },
    {
      title: "Total Rides",
      ico: cab,
      data: user.ride
    },
    {
      title: "Weekly Earnings",
      ico: earn,
      data: user.earns
    },
    {
      title: "Today's Booking",
      ico: cab,
      data: user.daily_book
    },
    {
      title: "Total Bookings",
      ico: cab,
      per: user.per,
      total: user.total_book
    }
  ]
  return (
    <div className='w-full lg:px-24 lg:py-12 px-10 py-10'>

        <section className='driver-info  flex items-center justify-around'>
        <div className="info flex w-fit items-end justify-around gap-10">
            {Info.map((info,idx)=>(
              <div key={idx} className="card hover:bg-gradient-to-tl hover:from-black hover:to-gray-600   hover:text-white h-48 shadow-xl hover:scale-105 duration-700 shadow-slate-500 bg-[#D0E0E9] rounded-3xl  w-48 items-center justify-center">
             <div className="content h-full flex flex-col gap-2 px-8 py-10">
                <img src={info.ico} className='w-10 h-10' />
                <h1 className='text-xl font-bold'>{info.data ? info.data : info.total} <span className={`ml-8 text-xl font-bold ${info.per >0 ? `text-green-600` : `text-red-600` }`}>{info.per? info.per : ''}</span></h1>
                <p className='text-sm font-extralight'>{info.title}</p>
              </div>
              </div>
            ))}
        </div>
        </section>
    </div>
  )
}
