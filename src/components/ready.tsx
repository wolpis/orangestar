import React from "react"
import "../css/music.css"
import { ReadyComponentType } from "../utils/type"

export const ReadyComponent: React.FunctionComponent<ReadyComponentType> = ({ SetReady } ) => {
    return (
        <div className="flex flex_col items_center justify_center hscreen" style={{color: "white"}}>
            <img src={"/img/headset.png"} width={"150px"}/>
            <h2 style={{fontSize: "1.3em"}}>이어폰 또는 헤드셋 착용을 권장드립니다.</h2>
            <div style={{
                marginTop: "20px"
            }}>
                <button className="ok_btn" onClick={() => { SetReady(true) }}>확인</button>
            </div>
        </div>
    )
}