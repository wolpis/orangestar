import { useState } from "react"
import { ReadyComponent } from "../components/ready";
import { MusicComponent } from "../components/music";

export const HomePage = () => {
    const [ready, SetReady] = useState(false);
    return (
        <>
        {
            ready ? <MusicComponent/> : <ReadyComponent SetReady={SetReady}/>
        }
        </>
    )
}

export default HomePage;