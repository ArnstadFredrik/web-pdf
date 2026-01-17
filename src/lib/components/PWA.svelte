<script>
    import website from "$lib/config/website";
    const { themeColor } = website;
</script>

<svelte:head>
    <link rel="manifest" href="/manifest.json" />
    <meta name="theme-color" content={themeColor} />
    <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
</svelte:head>
