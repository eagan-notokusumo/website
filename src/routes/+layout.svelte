<script lang="ts">
	let { children } = $props();
	import '../lib/styles/globals.css';
	import NavBar from '$lib/components/navigation/NavBar.svelte';
</script>

<div class="min-h-screen bg-background">
	<NavBar />
	<main class="pt-20">
	  {@render children()}
	</main>
  </div>
