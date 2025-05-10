import { CheckCircle } from 'lucide-react'
import React from 'react'

export const ConfirmationPage = () => {
    return (
        <div className='h-[100dvh] px-5 md:px-0 flex items-center justify-center'>
            <div className="flex flex-col">

                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl mb-8 border border-white/50 text-center">
                    <div className="bg-white/80  text-center">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">Booking Successful</h1>
                    </div>
                    <div className="mx-auto mb-6 text-green-500">
                        <CheckCircle size={80} className="mx-auto" />
                    </div>
                </div>
            </div>
        </div>
    )
}
