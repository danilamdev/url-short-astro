<script lang="ts">
  export let showModal: boolean; // boolean
  export let removeLink: () => void;
  let dialog: HTMLDialogElement; // HTMLDialogElement

  $: if (dialog && showModal) dialog.showModal();

  function handleClick() {
    removeLink();
    dialog.close();
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  on:close={() => (showModal = false)}
  on:click|self={() => dialog.close()}
  class=""
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click|stopPropagation>
    <div
      class="w-[500px] bg-slate-800 h-60 rounded-lg overflow-hidden flex flex-col"
    >
      <slot />
      <!-- <button on:click={() => dialog.close()}>close modal</button> -->
      <div class="mt-auto border-t border-gray-500/20">
        <div class="flex gap-5 items-end justify-end px-5 bg-slate-900 py-5">
          <button
            on:click={() => dialog.close()}
            class="bg-neutral-800 px-4 font-light rounded py-2 hover:bg-neutral-700 transition-colors"
            >cancelar</button
          >
          <button
            on:click={handleClick}
            class="bg-red-500 px-4 font-light rounded py-2 hover:bg-red-600 transition-colors"
            >eliminar</button
          >
        </div>
      </div>
    </div>
  </div>
</dialog>

<style>
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.452);
  }

  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }
  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
