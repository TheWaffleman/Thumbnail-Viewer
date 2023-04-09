browser.browserAction.onClicked.addListener(openThumbnailInNewTab);

function openThumbnailInNewTab() {
  browser.tabs
    .query({ currentWindow: true, active: true })
    .then((queryInfo) => {
      browser.tabs.get(queryInfo[0].id).then((tab) => {
        if (tab.url.includes("youtube.com", 0)) openTab(getYouTubeID(tab.url));
      });
    });
}

function openTab(youtubeID) {
  const img = new Image();
  let url = "https://i.ytimg.com/vi/" + youtubeID + "/maxresdefault.jpg";
  img.src = url;

  img.addEventListener("load", function () {
    if (img.height >= 120) {
      createTabs(url);
    } else {
      createTabs("https://i.ytimg.com/vi/" + youtubeID + "/hqdefault.jpg");
    }
  });
}

function createTabs(url) {
  browser.tabs.create({
    url: url,
  });
}

function getYouTubeID(url) {
  url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
}
