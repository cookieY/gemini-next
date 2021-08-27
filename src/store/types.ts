import { menuStore } from "./module/menu";
import { userStore } from "./module/user";

export interface RootStore {
}


export interface AllStoreTypes extends RootStore {
      menu: menuStore,
      user: userStore
}