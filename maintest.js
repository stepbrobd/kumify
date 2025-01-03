const numImages = 93;
//result is an object that contains the data retrieved from chrome.storage.local.get
//overlayEnabled is an attribute of result
const enabled = result.overlayEnabled !== false; // default to true if not set
const opacity = enabled ? '1' : '0';

// get all yt thumbnails
function getThumbnails() {
    const thumbnails = document.querySelectorAll("ytd-thumbnail:not(.ytd-video-preview, .ytd-rich-grid-slim-media) a > yt-image > img.yt-core-image:only-child:not(.yt-core-attributed-string__image-element),.ytp-videowall-still-image:not([style*='extension:'])");
    const channels = document.querySelectorAll('.yt-spec-avatar-shape__image')    
    const titles = document.querySelectorAll("#video-title");
    const sidebars = document.querySelectorAll('.title');
    const channelnames = document.querySelectorAll('.yt-simple-endpoint.style-scope.yt-formatted-string');
    const channelPlaylistNames = document.querySelectorAll('#byline');
    const attributedStrings = document.querySelectorAll('.yt-core-attributed-string');
    const textall = [...document.querySelectorAll('#text'), ...channelPlaylistNames, ...channelnames, ...sidebars, ...titles, ...attributedStrings];
    const shorts = document.querySelectorAll('.shortsLockupViewModelHostThumbnail');

    
    textall.forEach((textC) => {
        textC.textContent ="XD";
    })

    // For each image in the thumbnails array (which is thumbnail), get its image index, its base url, and then send it to 
    // apply thumbnails for a merge
    channels.forEach((channel) => {
        channel.src = chrome.runtime.getURL(`assets/images/1.PNG`)
    });
    thumbnails.forEach((Thumbnail) => {
        changeThumbnail(Thumbnail, chrome.runtime.getURL(`assets/images/1.78.PNG`))
    })
    shorts.forEach((short) => {
        changeThumbnail(short, chrome.runtime.getURL(`assets/images/0.56.PNG`))
    })
}

// Apply new (and improved) thumbnails
function changeThumbnail(thumbnail, OverlayUrl) {
    // Create the overlay image
    thumbnail.src= OverlayUrl;
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
document.addEventListener('DOMContentLoaded', () => {
    getThumbnails();
});
