import { useEffect, useState } from "react"
import { Assets } from "../utils/assets";
import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";

export const MusicComponent = () => {
    const [play_id, SetPI] = useState(0);
    const [playing, SetPlaying] = useState(true);
    let [fade, setFade] = useState('')

    useEffect(() => {
        setTimeout(()=>{ setFade('end') }, 100)
        return ()=>{
            setFade('')
        }
    }, [play_id])
    
    return (
        <div className={"container flex items_center justify_center h_screen start " + fade} style={{
            backgroundImage: `url(/background/${Assets[play_id].name}.${Assets[play_id].type})`
        }}>
            <div className="controlar flex justify_center" style={{flexWrap: "wrap"}}>
                <div className="cd flex items_center justify_center h_screen spin" style={{
                        marginBottom: "10px",
                        backgroundImage: `url(/background/${Assets[play_id].name}.${Assets[play_id].type})`
                    }}>
                    <div className="hole_rai flex items_center justify_center h_screen">
                        <div className="hole" style={{
                            backgroundImage: `url(/background/${Assets[play_id].name}.${Assets[play_id].type})`
                        }}>
                        </div>
                    </div>
                </div>
                <div className="flex flex_col items_center" style={{
                    color: "white",
                    margin: "10px",
                    width: "500px"
                }}>
                    <h1 style={{
                        color: "white",
                        textShadow: "0px 0px 20px black",
                        fontSize: "1.5em",
                        textAlign: "center"
                    }}>{Assets[play_id].title}</h1>
                    <p style={{marginTop: "7px", textShadow: "0px 0px 10px black",}}>Cover. {Assets[play_id].cover}</p>
                    <div className="flex" style={{marginTop: "30%", justifyContent: "space-between", width: "50%"}}>
                        <h1 style={{fontSize: "2.5em", cursor: "pointer", textShadow: "0px 0px 20px black"}} onClick={() => {
                            if (play_id === 0) {
                                SetPI(Assets.length - 1);
                            } else {
                                SetPI(play_id - 1);
                            }
                            SetPlaying(true);
                        }}><IoPlaySkipBack title="이전 곡"/></h1>
                        <h1 style={{fontSize: "2.5em", cursor: "pointer"}} onClick={() => {
                            SetPlaying(!playing)
                        }}>{playing ? <FaCirclePlay/> : <FaCirclePause/>}</h1>
                        <h1 style={{fontSize: "2.5em", cursor: "pointer"}} onClick={() => {
                            if (play_id === Assets.length - 1) {
                                SetPI(0);
                            } else {
                                SetPI(play_id + 1);
                            }
                            SetPlaying(true);
                        }}><IoPlaySkipForward/></h1>
                    </div>
                </div>  
            </div>
        </div>
    )
}