(() => {
  const numImages = 102;

  // See whether overlays are even enabled
  chrome.storage.local.get(["overlayEnabled"], (result) => {
    //result is an object that contains the data retrieved from chrome.storage.local.get
    //overlayEnabled is an attribute of result
    const enabled = result.overlayEnabled !== false; // default to true if not set
    const opacity = enabled ? "1" : "0";

    // get all yt thumbnails
    function getThumbnails() {
      let thumbnails = document.querySelectorAll(
        "img[src*='i.ytimg.com/vi/'], " +
          "img[src*='maxresdefault'], " +
          "img[src*='hqdefault'], " +
          "img[src*='mqdefault'], " +
          "img[src*='sddefault']",
      );

      // filter out shorts thumbnails
      thumbnails = Array.from(thumbnails).filter((img) => {
        return !img.classList.contains("shortsLockupViewModelHostThumbnail") &&
          !img.closest("ytm-shorts-lockup-view-model") &&
          !img.closest("ytm-shorts-lockup-view-model-v2");
      });

      console.log(`Found ${thumbnails.length} thumbnails (excluding Shorts)`);

      thumbnails.forEach((thumbnail) => {
        const index = getRandomImageIndex();
        let OverlayUrl = getOverlayUrl(index);
        changeThumbnail(thumbnail, OverlayUrl);
      });
    }

    // Apply new (and improved) thumbnails
    function changeThumbnail(thumbnail, OverlayUrl) {
      if (thumbnail.dataset.overlayApplied) return;

      // Create the overlay image
      const overlay = document.createElement("img");
      overlay.src = OverlayUrl;
      overlay.style.position = "absolute";
      overlay.style.top = overlay.style.left = "0";
      overlay.style.width = overlay.style.height = "100%";
      overlay.style.zIndex = "0";
      overlay.style.opacity = opacity; // Apply the opacity here
      // Overlay is appended as a child of the original image's parent element (the thing we did query select), making it go on top
      thumbnail.parentElement.appendChild(overlay);
      thumbnail.dataset.overlayApplied = "true";
    }

    // Get random image index
    function getRandomImageIndex() {
      return Math.floor(Math.random() * numImages + 1);
    }

    // Get URL of the overlay image
    function getOverlayUrl(index) {
      return chrome.runtime.getURL(`assets/images/${index}.png`);
    }

    // Observe the entire body of the document for changes
    const observer = new MutationObserver(() => {
      getThumbnails();
    });
    observer.observe(document.body, {
      // Types of mutations to observe
      childList: true,
      subtree: true,
    });

    // Initial call to set thumbnails on page load
    getThumbnails();
  });
})();
