<script>
    import Checkbox from "$lib/Checkbox.svelte";
    import { data } from "$lib/data.svelte.js";
</script>

<div class="options content">
    <h2>Valg</h2>
    {#each data.settings as setting (setting.id)}
        <Checkbox bind:setting />
    {/each}
</div>
