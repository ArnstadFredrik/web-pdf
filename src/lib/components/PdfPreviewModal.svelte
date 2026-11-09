<script>
    // Fullskjerm-modal som viser en PDF (blob-URL) i en iframe.
    // Bruker nettleserens/Chromiums innebygde PDF-visning, så den fungerer
    // likt i Electron-appen og i nettleseren — uten ny fane.
    import { data } from "$data";
    import Icon from "$component/Icon.svelte";
    import { mdiClose } from "@mdi/js";

    const close = () => (data.preview = null);
</script>

{#if data.preview}
    <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
    <div
        class="fixed inset-0 z-50 bg-black/80 flex flex-col p-4 gap-3"
        onclick={(e) => {
            if (e.target === e.currentTarget) close();
        }}
        role="dialog"
        aria-label="Forhåndsvisning"
    >
        <div class="flex items-center justify-between text-white">
            <p class="truncate">{data.preview.name}-hefte.pdf</p>
            <button
                class="button-red shrink-0"
                onclick={close}
                aria-label="Lukk forhåndsvisning"
            >
                <Icon mdi={mdiClose} />
            </button>
        </div>
        <iframe
            src={data.preview.url}
            title="PDF-forhåndsvisning"
            class="flex-1 w-full rounded-md bg-white"
        ></iframe>
    </div>
{/if}
