<!-- src/lib/components/ui/TypingAnimation.svelte -->
<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    
    let { 
      text = '',
      duration = 30,
      deleteDuration = 20,
      delay = 0,
      pauseDuration = 1000,
      startOnView = false,
      customClass = '',
      onComplete = () => {} 
    } = $props();
    
    let displayedText = $state('');
    let started = $state(false);
    let isAnimating = $state(false);
    let elementRef: HTMLElement;
  
    async function animateText() {
      if (isAnimating) return;
      isAnimating = true;
  
      // Type the word
      for (let i = 0; i <= text.length; i++) {
        displayedText = text.substring(0, i);
        await new Promise(resolve => setTimeout(resolve, duration));
      }
  
      await new Promise(resolve => setTimeout(resolve, pauseDuration));
  
      // Delete the word
      for (let i = text.length; i >= 0; i--) {
        displayedText = text.substring(0, i);
        await new Promise(resolve => setTimeout(resolve, deleteDuration));
      }
  
      isAnimating = false;
      onComplete();
    }
  
    $effect(() => {
      if (started && text && !isAnimating) {
        animateText();
      }
    });
  
    onMount(() => {
      if (!startOnView) {
        started = true;
      } else {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              started = true;
              observer.disconnect();
            }
          },
          { threshold: 0.1 }
        );
  
        if (elementRef) observer.observe(elementRef);
        return () => observer.disconnect();
      }
    });
  </script>
  
  <div
    bind:this={elementRef}
    class="text-4xl font-bold leading-[5rem] tracking-[-0.02em] {customClass}"
  >
    {displayedText}
  </div>