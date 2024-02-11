import { writable } from "svelte/store";
import type { LongURL } from "../types";

export const linkStore = writable<LongURL[]>([])