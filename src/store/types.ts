import { menuStore } from "./module/menu";

export interface RootStore {
      test: string
}


export interface AllStoreTypes extends RootStore {
      menu: menuStore
}