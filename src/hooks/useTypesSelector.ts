import {useSelector as _useSelector,TypedUseSelectorHook} from "react-redux"
import { Rootstate } from "../redux/reducer/root-reducer"

export const useSelector:TypedUseSelectorHook<Rootstate>=_useSelector