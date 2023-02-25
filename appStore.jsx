import create from "zustand";
import {persist} from "zustand/middleware";

let appStore= (set) =>({
    dopend:true,
    rows:[],
    setRows: (rows) => set((state) => ({rows:rows})),
    updateDopon:(dopon) => set((state) => ({dopon:dopon})),
});
appStore =persist(appStore,{name:"cdot_store_api"});
export const useAppStore= create(appStore);
