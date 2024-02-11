<script lang="ts">
  import { onMount } from "svelte";
  import { signOut } from "auth-astro/client.ts";
  import type { DataToDb, LongURL, Session } from "../types";
  import { APP_STATUS, URLPattern } from "../const.ts";
  import { app_store } from "../stores/appStore.ts";
  import { linkStore } from "../stores/linksStore.ts";

  import Button from "./button.svelte";
  import VerLinksBtn from "./verLinksBtn.svelte";
  import AppStatus from "./appStatus.svelte";
  import ErrorUrl from "./errorUrl.svelte";
  import { getRandomString } from "../utils/getRandomString.ts";
  import PasteBtn from "./pasteBtn.svelte";

  export let session: Session;
  export let links: LongURL[];

  linkStore.set(links);

  let data: DataToDb = {
    longUrl: "",
    hash: "",
    title: "",
    email: "",
  };

  let errorValidUrl: boolean;

  async function HandlePaste() {
    data.longUrl = "";
    const text = await navigator.clipboard.readText();
    data.longUrl = text;
  }

  async function handleClick() {
    const isValidUrl = URLPattern.test(data.longUrl);

    if (data.longUrl == undefined || data.longUrl == "" || !isValidUrl) {
      errorValidUrl = true;
      return;
    }

    errorValidUrl = false;
    data.hash = await getRandomString();
    // $app_store = APP_STATUS.ready;
    app_store.set(APP_STATUS.ready);
  }

  function verLinks() {
    app_store.set(APP_STATUS.idle);
    data.longUrl = "";
  }

  onMount(() => {
    document
      .getElementById("sign-out")
      ?.addEventListener("click", () => signOut());
  });
</script>

<PasteBtn {HandlePaste} />

<div class="flex gap-2">
  <input
    type="text"
    placeholder="https://www.laaaaaaaaargaURL.com"
    bind:value={data.longUrl}
    class="bg-slate-900 text-slate-200 w-full py-3 rounded placeholder:text-gray-600 pl-4 focus:outline focus:outline-emerald-500 focus:outline-2"
  />
  <Button {handleClick}>Acortar!</Button>
</div>

<ErrorUrl {errorValidUrl} />

{#if session}
  <div class="flex justify-between items-center border-b border-gray-900 pb-5">
    <div>
      <p><span class="text-gray-400">Bienvenido</span> {session?.user?.name}</p>

      <small class="text-zinc-600">{session?.user?.email}</small>
    </div>
    <div class="flex flex-col items-end gap-y-2">
      <img
        src={session?.user?.image}
        alt="imagen del usuario"
        class="max-w-full object-cover size-7 rounded-full mr-2"
      />
      <div
        class="text-sm text-slate-500 bg-transparent hover:bg-slate-900 px-2 py-1 rounded transition-colors"
      >
        <button id="sign-out" class="text-gray-500 hover:text-red-300/70"
          >cerrar sesión</button
        >
      </div>
    </div>
  </div>
  <div class="my-6">
    {#if $app_store === APP_STATUS.submitted}
      <VerLinksBtn onClick={() => verLinks()}>Ver tus links</VerLinksBtn>
    {/if}
    <small class="text-zinc-600 block"
      >tienes <span class="text-orange-300 text-lg">{$linkStore.length}</span> short
      links</small
    >
  </div>

  <AppStatus {data} {session}>
    <slot name="stop" />
  </AppStatus>
{/if}
