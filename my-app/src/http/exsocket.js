
    socket.onclose = () => {
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
            
    
    
            
            const data = { status: 'не в сети' };
            fetch('http://localhost:5000/api/status', {
              method: 'PUT', // или 'PUT'
              body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localToken}` 
        
              }
            }).then((res)=> console.log(res));
            
    
          });
        
        });
    
         
        };