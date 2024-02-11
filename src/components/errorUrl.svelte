<script lang="ts">
  export let errorValidUrl: boolean;
</script>

<div class="h-12 border border-transparent">
  {#if errorValidUrl}
    <p
      class="text-red-300 border-red-300 w-fit px-1 rounded mt-2 py-1 text-xs font-light"
    >
      Error. No es una url válida. Intenta nuevamente
    </p>
  {/if}
</div>
