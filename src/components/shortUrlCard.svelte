<script lang="ts">
  import CopyIcon from "../components/icons/copy.svelte";
  import Modal from "../components/modal.svelte";
  import ModalContent from "../components/modalContent.svelte";
  import TrashIcon from "./icons/trash.svelte";
  import GoodIcon from "./icons/good.svelte";
  import ArrowLink from "./icons/arrowLink.svelte";
  import { app_store } from "../stores/appStore";
  import { linkStore } from "../stores/linksStore";
  import { APP_STATUS } from "../const";
  import type { LongURL } from "../types";

  export let shortUrl: LongURL;

  let isCopied = false;
  let showModal = false;

  function CopyUrl() {
    return () => {
      navigator.clipboard.writeText("shortly.io/" + shortUrl.hash);
      isCopied = true;

      setTimeout(() => {
        isCopied = false;
      }, 2000);
    };
  }

  async function handleRemove(hash: LongURL["hash"]) {
    await fetch(`api/shortUrl?hash=${hash}`, { method: "DELETE" });

    // $app_store = APP_STATUS.idle;
    app_store.set(APP_STATUS.idle);
    linkStore.update((links) => links.filter((link) => link.hash !== hash));
  }
</script>

<div
  class="bg-slate-900 border border-gray-800 py-5 rounded-lg max-w-xl mx-auto px-5 relative"
>
  <button
    on:click={() => (showModal = true)}
    class="text-red-300 bg-transparent transition-colors hover:bg-red-300/20 rounded-full p-1 absolute top-2 right-2"
  >
    <TrashIcon classname="size-5" />
  </button>

  <Modal bind:showModal removeLink={() => handleRemove(shortUrl?.hash)}>
    <ModalContent title="¿Estás seguro que quieres eliminar el link?" />
  </Modal>

  <button
    on:click={CopyUrl()}
    title={`copiar shortly.io/${shortUrl?.hash}`}
    class="bg-transparent transition-colors hover:bg-slate-700 rounded-full p-1 absolute top-2 right-11"
  >
    {#if isCopied}
      <span class="text-emerald-400">
        <GoodIcon classnames="size-4" />
      </span>
    {:else}
      <CopyIcon classnames="size-5 text-gray-400 hover:text-gray-200" />
    {/if}
  </button>
  <div class="border-b pb-2 border-slate-700/50 px-2">
    <p class="text-3xl">
      {shortUrl?.title || "Sin título"}
    </p>
    <small class="text-gray-600 max-w-[70%] inline-block truncate"
      >{shortUrl?.longUrl}</small
    >
  </div>
  <div class="flex justify-between pl-2 mt-6 items-center">
    <div class="flex items-center text-lg">
      <p>shorly.io/</p>
      <span class="text-emerald-400">{shortUrl?.hash ?? "sin_hash"}</span>
    </div>
    <a
      href={shortUrl?.longUrl}
      target="_blank"
      rel="noopener noreferrer"
      class="bg-slate-950/50 text-gray-400 px-3 rounded text-sm py-2 inline-flex items-center gap-1 hover:bg-blue-500 hover:text-white transition-colors"
      >ir al sitio <span class="size-4"><ArrowLink /></span></a
    >
  </div>
</div>
