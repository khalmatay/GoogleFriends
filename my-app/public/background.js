
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
let localName=""




var windowCount = 0;
chrome.windows.getAll({}, function(windows) {
    windowCount = windows.length;
    chrome.windows.onCreated.addListener(function() {
        ++windowCount;
        checkWindowCount();
    });
    
   
    checkWindowCount();
});
chrome.windows.onRemoved.addListener(function() {
    if (--windowCount === 0) {
      console.log('close');
      chrome.storage.local.get("token", function(tokenValue) {
        let localToken = JSON.parse(JSON.stringify(tokenValue)).token
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

// Called when the number of windows have been incremented
function checkWindowCount() {
    if (windowCount === 1) {
      let valueexample=2;
      

      console.log('open');
      chrome.storage.local.get("token", function(tokenValue) {
        localToken = JSON.parse(JSON.stringify(tokenValue)).token
        


        
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
  const socket = new WebSocket("ws://localhost:5000/");
   socket.onopen = () => {
    chrome.storage.local.get("name", function(nameValue) {
      // let localName = JSON.parse(JSON.stringify(nameValue)).name
      // console.log(JSON.stringify(nameValue),"aahahahhh")

      // console.log(JSON.parse(JSON.parse(JSON.stringify(nameValue)).name).name,"ddddd")
      localName=JSON.parse(JSON.parse(JSON.stringify(nameValue)).name).name
     
      socket.send(
        JSON.stringify({
          method: "connection",
          username:localName,
        })
      );
      chrome.storage.local.get("token", function(tokenValue) {
        localToken = JSON.parse(JSON.stringify(tokenValue)).token
        


        
        const data = { status: 'В сети' };
        fetch('http://localhost:5000/api/status', {
          method: 'PUT', // или 'PUT'
          body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localToken}` 
    
          }
        }).then((res)=> console.log(res));
        

      });});};
      socket.onclose = function () {
        console.log('The connection has been closed successfully.');
      };
      
  
    
 

 socket.onmessage = (event) => {
      console.log("С сервера пришло сообщение", event.data);
      
    };

    





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