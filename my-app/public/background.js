
async function starter() {
  

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
}

chrome.runtime.onInstalled.addListener(starter());

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
      let valueexample=1;
        if (--windowCount === 0) {
          chrome.storage.local.set({keyexample: valueexample}, function() {
            console.log('Value is set to ' + valueexample);
          });
          console.log('close');
          
        }
    });
    checkWindowCount();
});

// Called when the number of windows have been incremented
function checkWindowCount() {
    if (windowCount === 1) {
      let valueexample=2;
      chrome.storage.local.set({keyexample: valueexample}, function() {
        console.log('Value is set to ' + valueexample);
      });
      console.log('open');
      chrome.storage.local.set({statusOnline: 1});
    }
}
