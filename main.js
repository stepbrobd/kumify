(() => {
  const numImages = 102;

  // check if overlay is enabled
  chrome.storage.local.get(["overlayEnabled"], (result) => {
    // result is an object that contains the data retrieved from chrome.storage.local.get
    // `overlayEnabled` is an attribute of result
    const enabled = result.overlayEnabled !== false; // default to true if not set
    const opacity = enabled ? "1" : "0";

    // get all thumbnails
    function getThumbnails() {
      let thumbnails = document.querySelectorAll(
        "img[src*='i.ytimg.com/vi/'], " +
          "img[src*='maxresdefault'], " +
          "img[src*='hqdefault'], " +
          "img[src*='mqdefault'], " +
          "img[src*='sddefault']",
      );

      // filter out shorts
      thumbnails = Array.from(thumbnails).filter((img) => {
        return !img.classList.contains("shortsLockupViewModelHostThumbnail") &&
          !img.closest("ytm-shorts-lockup-view-model") &&
          !img.closest("ytm-shorts-lockup-view-model-v2");
      });

      thumbnails.forEach((thumbnail) => {
        const index = getRandomImageIndex();
        let OverlayUrl = getOverlayUrl(index);
        changeThumbnail(thumbnail, OverlayUrl);
      });
    }

    // apply thumbnails
    function changeThumbnail(thumbnail, OverlayUrl) {
      if (thumbnail.dataset.overlayApplied) return;

      // Create overlay
      const overlay = document.createElement("img");
      overlay.src = OverlayUrl;
      overlay.style.position = "absolute";
      overlay.style.top = overlay.style.left = "0";
      overlay.style.width = overlay.style.height = "100%";
      overlay.style.zIndex = "0";
      overlay.style.opacity = opacity;

      // overlay is appended as a child of the original image's parent element
      // i.e. query select result
      // making it go on top
      thumbnail.parentElement.appendChild(overlay);
      thumbnail.dataset.overlayApplied = "true";
    }

    // get random image index
    function getRandomImageIndex() {
      return Math.floor(Math.random() * numImages + 1);
    }

    // get URL of the overlay image
    function getOverlayUrl(index) {
      return chrome.runtime.getURL(`assets/images/${index}.png`);
    }

    // observe the entire body of the document for changes
    const observer = new MutationObserver(() => {
      getThumbnails();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // initial call to set thumbnails on page load
    getThumbnails();
  });
})();
