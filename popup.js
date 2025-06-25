document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("kumify");

  chrome.storage.local.get(["overlayEnabled"], (result) => {
    const enabled = result.overlayEnabled !== false;
    checkbox.checked = enabled;
  });

  checkbox.addEventListener("change", () => {
    const newState = checkbox.checked;

    chrome.storage.local.set({ overlayEnabled: newState }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.reload(tabs[0].id);
      });
    });
  });
});
