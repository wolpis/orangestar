import { useEffect, useMemo, useRef, useState } from "react"
import { Assets } from "../utils/assets";
import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { Playhandle, handlePlay, handleSTOP } from "../utils/music";
import { LyricAssets } from "../utils/srt/init";

export const MusicComponent = () => {
    const [play_id, SetPI] = useState(0);
    const [playing, SetPlaying] = useState(true);
    const [fade, setFade] = useState('');

    const audioElement = useRef<any>();
    const [time, SetTime] = useState(0);
    const [audio_, SetAudio] = useState<AudioContext>();
    const [lyric_, SetLyric] = useState({ time: 0, ko_msg: "", jp_msg: "" });
    const [lyricdatas, SetLD] = useState([{ time: 0, ko_msg: "", jp_msg: "" }]);

    useEffect(() => {
        setTimeout(() => setFade('end'), 100);

        const audio = Playhandle(audioElement, Assets[play_id].name);
        SetAudio(audio);
        SetLD(LyricAssets(play_id))
        setTimeout(() => {
            SetTime(audio.currentTime * 1000);
        }, 500);

        return () => {
            setFade('');
        };
    }, [play_id]);

    useMemo(() => {
        console.log(time)
        if (audio_) {
            if (playing) {
                const currentLyric = lyricdatas.find((lyric, index) => {
                    const nextLyricTime = lyricdatas[index + 1] ? lyricdatas[index + 1].time : Infinity;
                    return lyric.time <= time && time < nextLyricTime;
                });

                if (currentLyric) {
                    SetLyric(currentLyric);
                }

                setTimeout(() => {
                    if (playing) {SetTime(audioElement.current.currentTime * 1000);}
                }, 100);
            }
        }
    }, [audio_, playing, time]);


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
                <div className="flex flex_col items_center itembetween" style={{
                    color: "white",
                    margin: "10px",
                    width: "500px"
                }}>
                    <div style={{textAlign: "center"}}>
                        <h1 style={{
                            color: "white",
                            textShadow: "0px 0px 20px black",
                            fontSize: "1.5em",
                            textAlign: "center"
                        }}>{Assets[play_id].title}</h1>
                        <p style={{marginTop: "7px", textShadow: "0px 0px 10px black",}}>Cover. {Assets[play_id].cover}</p>
                    </div>
                    
                    


                    <div style={{textAlign: "center", marginTop: "10px", marginBottom: "20px", textShadow: "0px 0px 10px black"}}>
                        <h3>{lyric_?.jp_msg}</h3>
                        <p>{lyric_?.ko_msg}</p>
                    </div>
                    

                    <div className="flex" style={{justifyContent: "space-between", width: "50%"}}>
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
                            if (!playing) {
                                handlePlay(audioElement);
                                
                            } else {
                                audioElement.current.pause();
                                handleSTOP(audioElement);
                            }
                        }}>{playing ? <FaCirclePause/> : <FaCirclePlay/>}</h1>
                        <h1 style={{fontSize: "2.5em", cursor: "pointer"}} onClick={() => {
                            if (play_id === Assets.length - 1) {
                                SetPI(0);
                            } else {
                                SetPI(play_id + 1);
                            }
                            SetPlaying(true);
                        }}><IoPlaySkipForward title="다음 곡"/></h1>
                    </div>
                </div>  
            </div>
        </div>
    )
}