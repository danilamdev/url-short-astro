  import { writable } from "svelte/store";
  import { APP_STATUS } from "../const";
  import type { App_Status } from "../types";

  export const app_store = writable<App_Status>(APP_STATUS.idle)


