chrome.runtime.onInstalled.addListener(async () => {
  

  // Executes ContentScript on all tabs (including already open ones)
  for (const contentScript of chrome.runtime.getManifest().content_scripts) {
    for (const tab of await chrome.tabs.query({url: contentScript.matches})) {
      if (tab.url.includes("webstore")) continue;
      chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: contentScript.js,
      });
    }
  }
});

console.log('The dumb-stats project is successfully loaded!');




console.log('assdsdsds')

var windowCount = 0;
chrome.windows.getAll({}, function(windows) {
    windowCount = windows.length;
    chrome.windows.onCreated.addListener(function() {
        ++windowCount;
        checkWindowCount();
    });
    chrome.windows.onRemoved.addListener(function() {
        if (--windowCount === 0) {
          console.log('close');
        }
    });
    checkWindowCount();
});

// Called when the number of windows have been incremented
function checkWindowCount() {
    if (windowCount === 1) {
      console.log('open');
    }
}