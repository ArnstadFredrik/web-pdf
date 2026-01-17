<script>
    import { convertAll } from "$js/handleFunctions.js";
    let { setting = $bindable() } = $props();
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
