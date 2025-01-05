<!-- src/lib/components/sections/Hero.svelte -->
<script lang="ts">
    import TypingAnimation from '../ui/TypingAnimation.svelte';
    import AnimatedGrid from '../ui/AnimatedGrid.svelte';
    import { writable } from 'svelte/store';

    const occupations = ['A SOFTWARE ENGINEER.', 'A FOUNDER.', 'AN INVESTOR.',];
    let currentIndex = writable(0);

    function handleComplete() {
        currentIndex.update(n => {
            const newIndex = (n + 1) % occupations.length;
            console.log(`Current index: ${n}, New index: ${newIndex}`);
            return newIndex;
        });
    }
</script>

<section class="relative bg-background"> <!-- Added relative here -->
    <AnimatedGrid 
        className="absolute inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)] text-gray-500" 
        maxOpacity={0.1}
        numSquares={30}
        duration={3}
        repeatDelay={1}
        width={60}
        height={60}
    />
    
    <!-- Wrap existing content in a relative container to ensure it's above the grid -->
    <div class="relative z-10">
        <div class="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div class="flex flex-col gap-12 md:flex-row md:gap-20">
                <!-- Left section (2/3) -->
                <div class="w-full space-y-6 md:w-3/5">
                    <div class="space-y-4">
                        <p class="px-1 font-inter text-2xl text-accent">HEY, I'M</p>
                        <h1 class="font-space text-6xl font-medium md:text-7xl lg:text-8xl">EAGAN.</h1>
                        <TypingAnimation
                            text={$currentIndex !== undefined ? occupations[$currentIndex] : ''}
                            duration={30} 
                            deleteDuration={20}
                            pauseDuration={1000}
                            customClass="font-space text-3xl md:text-4xl lg:text-5xl text-text/80 font-light pt-6"
                            onComplete={handleComplete}
                        />
                    </div>
                </div>

                <!-- Right section (1/3) -->
                <div class="w-full font-inter md:w-2/5">
                    <h2 class="mb-6 font-space text-2xl text-accent">Some quick things about me.</h2>
                    <ul class="text-text/80 space-y-4 text-lg">
                        <li class="flex items-start gap-3">
                            <span class="text-accent">•</span>
                            <div class="flex-1">
                                B.S./M.S. INDUSTRIAL ENGINEERING & COMPUTER SCIENCE @ <a href="https://northwestern.edu" class="underline hover:text-accent">NORTHWESTERN</a>
                            </div>
                        </li>
                        <li class="flex items-start gap-3">
                            <span class="text-accent">•</span>
                            <div class='flex-1'>
                                INVESTING & PRODUCT @ <a href="https://somacap.com" class="underline hover:text-accent inline">SOMA CAPITAL</a>
                            </div>
                        </li>
                        <li class="flex items-start gap-3">
                            <span class="text-accent">•</span>
                            BUILDING COOL THINGS
                        </li>
                        <li class="flex items-start gap-3">
                            <span class="text-accent">•</span>
                            WRITING ABOUT THE WORLD AND HOW I SEE IT
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    /* Optional: Add any additional styles here */
</style>