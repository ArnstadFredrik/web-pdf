export let data = $state({
  files: [],
  upload: [],
  download: [],
  settingsMenu: false,
  preview: null,
  settings: [
    {
      state: false,
      label: "Brett langs kortside",
      id: "short_edge",
      type: "checkbox",
    },
  ],
});
