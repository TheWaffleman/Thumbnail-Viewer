browser.pageAction.onClicked.addListener(getURL);

function getURL() {

  browser.tabs.query({currentWindow: true, active:true}).then(queryInfo => {
    browser.tabs.get(queryInfo[0].id).then(tab => {
      var tabUrl = tab.url;
      
      openTab("https://i.ytimg.com/vi/" + YouTubeGetID(tabUrl) +"/maxresdefault.jpg", tabUrl);
         
    });
  });
}

function openTab(url,url1){   
  const img = new Image();
  var urlold = "https://i.ytimg.com/vi/" + YouTubeGetID(url1) +"/hqdefault.jpg";
  img.addEventListener("load", function() {
    if(img.height >= 120){
      createTabs(url);
    } else {
      createTabs(urlold);
    }
  });
  img.src = url;
}

function createTabs(url1){
  browser.tabs.create({
    url: url1
  });
}

function YouTubeGetID(url){
   url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
   return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
}

function checkForValidUrl(tabId, changeInfo, tab) {
  // If the tabs url starts with "http://specificsite.com"...
  if (tab.url.indexOf('https://www.youtube.com') == 0) {
      // ... show the page action.
      browser.pageAction.show(tabId);
  }
};

// Listen for any changes to the URL of any tab.
browser.tabs.onUpdated.addListener(checkForValidUrl);