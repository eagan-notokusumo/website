<!-- lib/components/bento/BentoGrid.svelte -->
<script lang="ts">
    let className = '';
    export { className as class };
  </script>
  
  <div class="grid w-full auto-rows-[22rem] grid-cols-1 gap-4 md:grid-cols-3 {className}">
    <slot />
  </div>