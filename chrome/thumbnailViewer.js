chrome.action.onClicked.addListener(openThumbnailInNewTab);

function openThumbnailInNewTab() {
  chrome.tabs.query({ currentWindow: true, active: true }).then((queryInfo) => {
    chrome.tabs.get(queryInfo[0].id).then((tab) => {
      if (tab.url.includes("youtube.com", 0)) openTab(getYouTubeID(tab.url));
    });
  });
}

function openTab(youtubeID) {
  let url = "https://i.ytimg.com/vi/" + youtubeID + "/maxresdefault.jpg";

  fetchAndCheckImageHeight(url)
    .then((height) => {
      if (height >= 120) {
        createTabs(url);
      } else {
        createTabs("https://i.ytimg.com/vi/" + youtubeID + "/hqdefault.jpg");
      }
    })
    .catch((error) => {
      console.error("Failed to fetch the image or get its height:", error);
    });
}

function fetchAndCheckImageHeight(imageUrl) {
  return new Promise((resolve, reject) => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        createImageBitmap(blob)
          .then((bitmap) => {
            const height = bitmap.height;
            resolve(height);
          })
          .catch((error) => reject(error));
      })
      .catch((error) => reject(error));
  });
}

function createTabs(url) {
  chrome.tabs.create({
    url: url,
  });
}

function getYouTubeID(url) {
  url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
}
