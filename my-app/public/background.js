
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
          // chrome.storage.local.set({keyexample: valueexample}, function() {
          //   console.log('Value is set to ' + valueexample);
          // });

          console.log('close');
          chrome.storage.local.get("token", function(tokenValue) {
            let localToken = JSON.parse(JSON.stringify(tokenValue)).token
            
            // username: JSON.parse(localStorage.getItem("name")).name,
            // JSON.parse(JSON.stringify(tokenValue)).token
    
    
            
            const data = { status: 'Не в сети' };
            fetch('http://localhost:5000/api/status', {
              method: 'PUT', // или 'PUT'
              body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localToken}` 
        
              }
            }).then((res)=> console.log(res));
            
    
          });
          
          
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
      chrome.storage.local.get("token", function(tokenValue) {
        let localToken = JSON.parse(JSON.stringify(tokenValue)).token
        
        // username: JSON.parse(localStorage.getItem("name")).name,
        // JSON.parse(JSON.stringify(tokenValue)).token


        
        const data = { status: 'В сети' };
        fetch('http://localhost:5000/api/status', {
          method: 'PUT', // или 'PUT'
          body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localToken}` 
    
          }
        }).then((res)=> console.log(res));
        

      });
      

  

     
   }
}






// const url = 'https://example.com/profile';
// const data = { status: 'example' };


//   try {
//     const response = await fetch(url, {
//       method: 'PUT', // или 'PUT'
//       body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${localToken}` 

//       }
//     });
//     const json = await response.json();
//     console.log('Успех:', JSON.stringify(json));
//   } catch (error) {
//     console.error('Ошибка:', error);
//   }