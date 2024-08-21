"use client"

import WebApp from "@twa-dev/sdk"
import { useEffect, useState } from "react"

// Define the interface for user data
interface UserData {
    id: number
    first_name: string
    last_name?: string
    username?: string
    language_code: string
    is_premium?: boolean
}

export default function Home() {
    const [userData, setUserData] = useState<UserData | null>(null)

    useEffect(() => {
        if (WebApp.initData) {
            let data = ""
            data += JSON.stringify(WebApp.initData)
            data += "/n"
            data += JSON.stringify(WebApp.initDataUnsafe)
            setUserData(data as any)
        }
    }, [])

    return (
        <main className='p-4'>
            {userData ? (
                <>
                    <h1 className='text-2xl font-bold mb-4'>User Data</h1>
                    {userData}
                </>
            ) : (
                <div>Loading...</div>
            )}
        </main>
    )
}
