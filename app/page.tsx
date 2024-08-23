"use client"

import WebApp from "@twa-dev/sdk"
import axios from "axios"
import { useEffect, useState } from "react"

interface UserData {
    _id: string
    deletedAt: null
    createdAt: Date
    updatedAt: Date
    id: string
    isTelegramPremiumUser: boolean
    email: string
    name: string
    exp: number
    lastLoginDate: Date
    refCode: string
    refCodeUpdateTime: Date
    refTime: Date
    referralPoint: number
    premiumReferralPoint: number
    sessionId: string
    countryCode: string
    lastLoginIP: string
    avatar: string
    playTime: number
}

export default function Home() {
    const [userData, setUserData] = useState<UserData | null>(null)

    useEffect(() => {
        // Client-side only code can go here
    }, []) // Empty dependency array ensures this runs once after mount

    const login = async () => {
        if (typeof window !== "undefined" && WebApp.initData) {
            const baseUrl = "https://hammerhead-app-bi7qz.ondigitalocean.app"
            const token = JSON.stringify(WebApp.initData)
            const data = await axios.post(
                "auth/login",
                {},
                {
                    baseURL: baseUrl,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token
                    }
                }
            )
            setUserData(data.data.data)
        } else {
            const baseUrl = "http://localhost:3000"
            const token = "query_id=AAFSUlFTAgAAAFJSUVNomVpk&user=%7B%22id%22%3A5692805714%2C%22first_name%22%3A%22Tr%E1%BA%A7n%22%2C%22last_name%22%3A%22Nam%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1724396229&hash=ee057ccdc14e677bc2acd7c9d7f04e2710c182105b11fefbba4ab02985b27137"
            const data = await axios.post(
                "auth/login",
                {},
                {
                    baseURL: baseUrl,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token
                    }
                }
            )
            setUserData(data.data.data)
        }
    }

    return (
        <main>
            {userData ? (
                <div className='user-profile max-w-md mx-auto bg-white rounded-lg shadow-md p-6 mt-6'>
                    <h1 className='text-2xl font-bold mb-4 text-gray-800'>User Profile</h1>
                    <p className='mb-2'>
                        <strong className='text-gray-700'>ID:</strong> {userData.id}
                    </p>
                    <p className='mb-2'>
                        <strong className='text-gray-700'>Name:</strong> {userData.name}
                    </p>
                    <p className='mb-2'>
                        <strong className='text-gray-700'>Email:</strong> {userData.email || "N/A"}
                    </p>
                    <p className='mb-2'>
                        <strong className='text-gray-700'>Telegram Premium User:</strong> {userData.isTelegramPremiumUser ? "Yes" : "No"}
                    </p>
                    <p className='mb-2'>
                        <strong className='text-gray-700'>Experience Points:</strong> {userData.exp}
                    </p>
                    <p className='mb-2'>
                        <strong className='text-gray-700'>Last Login Date:</strong> {new Date(userData.lastLoginDate).toLocaleString()}
                    </p>
                    <p className='mb-2'>
                        <strong className='text-gray-700'>Referral Code:</strong> {userData.refCode}
                    </p>
                    <p className='mb-2'>
                        <strong className='text-gray-700'>Referral Points:</strong> {userData.referralPoint}
                    </p>
                    <p className='mb-2'>
                        <strong className='text-gray-700'>Premium Referral Points:</strong> {userData.premiumReferralPoint}
                    </p>
                    <p className='mb-2'>
                        <strong className='text-gray-700'>Session ID:</strong> {userData.sessionId}
                    </p>
                    <p className='mb-2'>
                        <strong className='text-gray-700'>Country Code:</strong> {userData.countryCode || "N/A"}
                    </p>
                    <p className='mb-2'>
                        <strong className='text-gray-700'>Last Login IP:</strong> {userData.lastLoginIP || "N/A"}
                    </p>
                    <p className='mb-4'>
                        <strong className='text-gray-700'>Avatar:</strong>
                        {userData.avatar ? <img src={userData.avatar} alt='User Avatar' className='w-16 h-16 rounded-full mt-2' /> : "No Avatar"}
                    </p>
                    <p className='mb-2'>
                        <strong className='text-gray-700'>Play Time:</strong> {userData.playTime} hours
                    </p>
                </div>
            ) : (
                <div className='p-4 flex items-center justify-center flex-col'>
                    <h1>Hi, please login to see your profile</h1>
                    <button onClick={login} type='button' className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2'>
                        Login
                    </button>
                </div>
            )}
        </main>
    )
}
