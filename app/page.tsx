import WebApp from "@twa-dev/sdk"
import { useEffect, useState } from "react"
export default function Home() {
    const [userData, setUserData] = useState(null)
    useEffect(() => {
        if (WebApp.initData) {
            setUserData(WebApp.initData as any)
        }
    }, [])
    return <main>{userData ? <>{JSON.stringify(userData)}</> : <>Hello</>}</main>
}
