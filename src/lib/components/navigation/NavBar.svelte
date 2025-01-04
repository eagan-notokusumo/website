<!-- src/lib/components/navigation/Navbar.svelte -->
<script lang="ts">
    import { Menu, X } from 'lucide-svelte';
    import { browser } from '$app/environment';
    
    let isMenuOpen = false;
    let currentPath = '';
  
    // Update current path when on client
    if (browser) {
      currentPath = window.location.pathname;
    }
  
    const navItems = [
      { label: 'Projects', href: '/projects' },
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ];
  </script>
  
  <nav class="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <a 
          href="/" 
          class="font-space text-2xl font-medium text-text hover:text-accent transition-colors"
        >
          Your Name
        </a>
  
        <!-- Desktop Navigation -->
        <div class="hidden md:flex gap-8">
          {#each navItems as item}
            <a
              href={item.href}
              class="font-inter text-text/80 hover:text-accent transition-colors"
              aria-current={currentPath === item.href ? 'page' : undefined}
            >
              {item.label}
            </a>
          {/each}
        </div>
  
        <!-- Mobile Menu Button -->
        <button
          class="md:hidden text-text hover:text-accent"
          on:click={() => isMenuOpen = !isMenuOpen}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {#if isMenuOpen}
            <X size={24} />
          {:else}
            <Menu size={24} />
          {/if}
        </button>
      </div>
  
      <!-- Mobile Menu -->
      {#if isMenuOpen}
        <div 
          class="md:hidden py-4 px-4 bg-background/95 backdrop-blur-sm"
        >
          <div class="flex flex-col gap-4">
            {#each navItems as item}
              <a
                href={item.href}
                class="font-inter text-text/80 hover:text-accent transition-colors py-2"
                aria-current={currentPath === item.href ? 'page' : undefined}
                on:click={() => isMenuOpen = false}
              >
                {item.label}
              </a>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </nav>
  
  <style>
    /* Optional: Add styles for the current page indicator */
    a[aria-current="page"] {
      @apply text-accent;
    }
  </style>