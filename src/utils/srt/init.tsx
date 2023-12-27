import { DAYBREAK } from "./daybreak"
import { Henceforth } from "./henceforth"
import { Surges } from "./surges"

const LyricList = [
    Surges, DAYBREAK, Henceforth
]


export const LyricAssets = (id: number) => {
    console.log(id)
    return LyricList[id]
}