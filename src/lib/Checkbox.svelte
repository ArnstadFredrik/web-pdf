<script>
    import { convertAll } from "$lib/handleConvert.js";
    let { setting } = $props();
</script>

<div class={setting.type}>
    <input
        onchange={convertAll}
        type="checkbox"
        id={setting.id}
        bind:checked={setting.state}
    />
    <label for={setting.id}>{setting.label}</label>
</div>
