document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-overlay');

    // Initialize button text based on stored state
    browser.storage.local.get(['overlayEnabled']).then((result) => {
        const enabled = result.overlayEnabled !== false; // default to true if not set
        toggleButton.textContent = enabled ? 'Disable Overlays' : 'Enable Overlays';
    });

    // Add click event listener to the toggle button
    toggleButton.addEventListener('click', () => {
        browser.storage.local.get(['overlayEnabled']).then((result) => {
            const enabled = result.overlayEnabled !== false; // default to true if not set
            const newEnabledState = !enabled;

            // Store the new state
            browser.storage.local.set({ overlayEnabled: newEnabledState }).then(() => {
                toggleButton.textContent = newEnabledState ? 'Disable Overlays' : 'Enable Overlays';

                // Reload the YouTube page to apply changes
                browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
                    if (tabs.length > 0) {
                        browser.tabs.reload(tabs[0].id);
                    }
                });
            });
        });
    });
});