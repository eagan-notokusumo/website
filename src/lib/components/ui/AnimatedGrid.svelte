<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
 
  interface Square {
    id: number;
    pos: number[];
    opacity: number;
    targetOpacity: number;
  }
 
  let props = $props<{
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    'stroke-dasharray'?: any;
    numSquares?: number;
    className?: string;
    maxOpacity?: number;
    duration?: number;
    repeatDelay?: number;
  }>();
 
  let containerRef: SVGSVGElement;
  
  let width = $state(props.width ?? 40);
  let height = $state(props.height ?? 40);
  let x = $state(props.x ?? -1);
  let y = $state(props.y ?? -1);
  let strokeDasharray = $state(props['stroke-dasharray'] ?? 0);
  let numSquares = $state(props.numSquares ?? 50);
  let maxOpacity = $state(props.maxOpacity ?? 0.5);
  let duration = $state(props.duration ?? 4);
  let repeatDelay = $state(props.repeatDelay ?? 0.5);
  let dimensions = $state({ width: 0, height: 0 });
  let squares = $state<Square[]>([]);
  
  const id = crypto.randomUUID();
 
  function classNames(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(' ');
  }
 
  function getPos() {
    return [
      Math.floor((Math.random() * dimensions.width) / width),
      Math.floor((Math.random() * dimensions.height) / height),
    ];
  }
 
  function generateSquares(count: number) {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      pos: getPos(),
      opacity: 0,
      targetOpacity: maxOpacity
    }));
  }
 
  function updateRandomSquares() {
    const numToUpdate = Math.floor(squares.length * 0.3); // Update 30% of squares
    const squaresToUpdate = new Set();
    
    while (squaresToUpdate.size < numToUpdate) {
      squaresToUpdate.add(Math.floor(Math.random() * squares.length));
    }
 
    squares = squares.map((square, index) => 
      squaresToUpdate.has(index) 
        ? {
            ...square,
            pos: getPos(),
            targetOpacity: square.targetOpacity === 0 ? maxOpacity : 0
          }
        : square
    );
  }
 
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
 
  $effect(() => {
    if (dimensions.width && dimensions.height) {
      squares = generateSquares(numSquares);
    }
  });
 
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
    'pointer-events-none absolute inset-0 h-full w-full',
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