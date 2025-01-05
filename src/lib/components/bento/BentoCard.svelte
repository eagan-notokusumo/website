<!-- lib/components/bento/BentoCard.svelte -->
<script lang="ts">
    import { ArrowRight } from 'lucide-svelte';
  
    export let name: string;
    export let className: string = '';
    export let Icon: any;
    export let description: string;
    export let href: string;
    export let cta: string;
  </script>
  
  <div
    class="group relative flex flex-col justify-between overflow-hidden rounded-xl 
      bg-cream shadow-lg transition-all duration-300
      hover:shadow-xl {className}"
  >
    <div>
      <slot name="background"></slot>
    </div>
    
    <div class="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
      <svelte:component 
        this={Icon} 
        class="h-12 w-12 origin-left transform-gpu text-text transition-all duration-300 ease-in-out group-hover:scale-75" 
      />
      <h3 class="text-xl font-medium text-text font-space">
        {name}
      </h3>
      <p class="max-w-lg text-text/80 font-inter">{description}</p>
    </div>
  
    <div class="pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
      <a {href} class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors hover:text-accent pointer-events-auto font-inter">
        {cta}
        <ArrowRight class="ml-2 h-4 w-4" />
      </a>
    </div>
  
    <div class="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03]"></div>
  </div>