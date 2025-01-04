<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
  
    interface Square {
      id: number;
      pos: number[];
      opacity: number;  // Add opacity property
      targetOpacity: number;  // Add target opacity for smooth transitions
    }
  
    // ... other props and state variables remain the same ...
  
    function generateSquares(count: number) {
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        pos: getPos(),
        opacity: 0,  // Start invisible
        targetOpacity: maxOpacity  // Will animate to this
      }));
    }
  
    function updateRandomSquares() {
      const numToUpdate = Math.floor(squares.length * 0.3);
      const squaresToUpdate = new Set();
      
      while (squaresToUpdate.size < numToUpdate) {
        squaresToUpdate.add(Math.floor(Math.random() * squares.length));
      }
  
      squares = squares.map((square, index) => {
        if (squaresToUpdate.has(index)) {
          // If square is visible, make it fade out, otherwise fade in
          const newTargetOpacity = square.opacity > 0 ? 0 : maxOpacity;
          return {
            ...square,
            pos: newTargetOpacity === 0 ? square.pos : getPos(), // Only get new position when fading in
            targetOpacity: newTargetOpacity
          };
        }
        return square;
      });
    }
  
    // Add animation frame loop for smooth transitions
    function animateSquares() {
      squares = squares.map(square => {
        const diff = square.targetOpacity - square.opacity;
        const speed = 0.1; // Adjust this to control fade speed
        
        if (Math.abs(diff) < 0.01) {
          return {
            ...square,
            opacity: square.targetOpacity
          };
        }
        
        return {
          ...square,
          opacity: square.opacity + diff * speed
        };
      });
  
      requestAnimationFrame(animateSquares);
    }
  
    onMount(() => {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          dimensions = {
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          };
        }
      });
  
      if (containerRef) {
        resizeObserver.observe(containerRef);
      }
  
      // Start animation loop
      requestAnimationFrame(animateSquares);
  
      // Update squares periodically
      const intervalId = setInterval(() => {
        updateRandomSquares();
      }, 2000);
  
      return () => {
        if (containerRef) {
          resizeObserver.unobserve(containerRef);
        }
        clearInterval(intervalId);
      };
    });
  </script>
  
  <svg
  bind:this={containerRef}
  aria-hidden="true"
  class={classNames(
    'pointer-events-none absolute inset-0 h-full w-full',  // Removed fill and stroke from class
    props.className
  )}
>
  <defs>
    <pattern {id} {width} {height} patternUnits="userSpaceOnUse" {x} {y}>
      <path 
        d={`M ${width} 0 L 0 0 0 ${height}`}  
        fill="none"
        stroke="currentColor" 
        stroke-width="0.5"     
        stroke-opacity="0.2"   
      />
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill={`url(#${id})`} stroke="none" />
  <svg {x} {y} class="overflow-visible">
    {#each squares as { pos: [squareX, squareY], opacity }}
      <rect
        width={width - 1}
        height={height - 1}
        x={squareX * width + 1}
        y={squareY * height + 1}
        fill="currentColor"
        stroke-width="0"
        style="opacity: {opacity};"
      />
    {/each}
  </svg>
</svg>