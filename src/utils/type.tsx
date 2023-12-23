import { Dispatch } from "react";

export interface ReadyComponentType {
    SetReady: Dispatch<React.SetStateAction<boolean>>;
}