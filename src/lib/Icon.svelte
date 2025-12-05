<script>
    let { color = "white", mdi, size = 1 } = $props();
    const htmlSize = `${size * 1.5}rem`;
</script>

<svg viewBox="0 0 24 24" width={htmlSize} height={htmlSize}>
    <path fill={color} d={mdi} />
</svg>
