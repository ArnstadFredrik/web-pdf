<script>
    import Icon from "$lib/Icon.svelte";
    import { mdiFileDownload, mdiPrinter, mdiEye, mdiDelete } from "@mdi/js";
    import { data } from "$lib/data.svelte.js";
    import { browser } from "$app/environment";
    import { onMount } from "svelte";
    import { handleConvert } from "$lib/handleConvert.js";
    import Loader from "./Loader.svelte";

    let { file, i } = $props();

    let printJS;

    onMount(async () => {
        const p = await import("print-js");
        printJS = p.default;
    });

    const handlePrint = (e) => {
        if (browser && file.download) {
            printJS(file.download.url);
        }
    };
    const handlePreview = (e) => {
        console.log(e);
    };
    const handleDelete = (e) => {
        data.files = data.files.filter((e) => e.key != file.key);
    };
</script>

<div class="list_row" data-key={file.key}>
    <p class="fileName">{file.name}</p>
    {#if file.process == "working"}
        <Loader />
    {:else if file.process == "done"}
        <a
            href={file.download.url}
            download={`${file.fileName}-hefte.pdf`}
            class="download_button"
        >
            <button class="color-green">
                <Icon mdi={mdiFileDownload} />
            </button>
        </a>
        <button onclick={handlePrint} class="color-green print_button">
            <Icon mdi={mdiPrinter} />
        </button>
        <a href={file.download.url} target="_blank" class="preview_button">
            <button onclick={handlePreview} class="color-blue">
                <Icon mdi={mdiEye} />
            </button>
        </a>
        <button onclick={handleDelete} data-key={file.key} class="color-red">
            <Icon mdi={mdiDelete} />
        </button>
    {/if}
</div>

<style>
    .list_row {
        --padding: 1rem;
        padding: var(--padding);
        background-color: var(--color-highlight);
        border-radius: var(--radius);
        gap: 1rem;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(
            2,
            calc(var(--fs-md) + var(--padding) + var(--padding))
        );
        justify-items: center;
        align-items: center;
    }
</style>
