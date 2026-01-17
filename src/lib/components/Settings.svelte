<script module>
    let shortEdge = $state(false);
    export const shortEdgeState = () => shortEdge;
</script>

<script>
    import { convertAll } from "$lib/js/handleFunctions.js";
    import { mdiClose, mdiCog } from "@mdi/js";
    import Icon from "./Icon.svelte";
    import { fade, fly } from "svelte/transition";
    let menuState = $state(false);

    const handleMenu = () => {
        menuState ? (menuState = false) : (menuState = true);
    };
</script>

<button class="fixed top-5 right-5" onclick={handleMenu}>
    <Icon
        mdi={mdiCog}
        size={1.5}
        color="fill-neutral-800 dark:fill-neutral-100"
    />
</button>

{#if menuState}
    <div class="absolute">
        <div
            transition:fade
            class="fixed inset-0 bg-neutral-900 opacity-50 z-10"
        >
            <button
                type="button"
                aria-label="close menu"
                class="w-full h-full"
                onclick={handleMenu}
            ></button>
        </div>

        <div
            transition:fly={{ x: 100 }}
            class="menu z-20 flex flex-col gap-5
            fixed right-0 top-0 h-full bg-neutral-200 dark:bg-neutral-700 m-0 p-5 max-w-dvw"
        >
            <h2>Valg</h2>
            <div class="dark:bg-neutral-600 bg-neutral-300 p-3 rounded-md">
                <input
                    onchange={convertAll}
                    type="checkbox"
                    id="short_edge"
                    bind:checked={shortEdge}
                />
                <label for="short_edge" class="p-2">Brett langs kortside</label>
            </div>

            <button
                type="button"
                class="absolute right-5 bottom-5 p-2 bg-neutral-300 dark:bg-neutral-600"
                onclick={handleMenu}
            >
                <Icon
                    mdi={mdiClose}
                    size={1.5}
                    color="fill-neutral-900 dark:fill-neutral-100"
                />
            </button>
        </div>
    </div>
{/if}
