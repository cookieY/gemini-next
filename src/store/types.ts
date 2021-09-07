import { menuStore } from "./module/menu";
import { userStore } from "./module/user";
import { orderStore } from "./module/order"

export interface RootStore {
}


export interface AllStoreTypes extends RootStore {
      menu: menuStore,
      user: userStore,
      order: orderStore
}