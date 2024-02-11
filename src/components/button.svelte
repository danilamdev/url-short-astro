<script>
  import { APP_STATUS } from "../const";
  import { app_store } from "../stores/appStore";
  export let handleClick;
</script>

<button
  on:click={() => handleClick()}
  class={`bg-green-300 px-8 rounded font-semibold text-lg relative  py-2.5 text-black duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-1 active:scale-x-110 active:scale-y-90`}
>
  {#if $app_store === APP_STATUS.error}
    <span
      class="absolute -top-2 -right-2 z-10 rounded-full size-5 bg-emerald-600"
    ></span>
    <span
      class=" absolute -top-2 -right-2 animate-ping z-10 size-5 rounded-full bg-emerald-400 opacity-75"
    ></span>
  {/if}
  <slot />
</button>
