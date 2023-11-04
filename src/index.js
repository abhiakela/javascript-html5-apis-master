import '../assets/css/style.css';

const app = document.getElementById('app');
app.innerHTML = '<h1>JavaScript HTML5 APIs!</h1>';


console.log(window.Notification);
//this is old style  using promise
// const init = () =>{
//   Notification.requestPermission().then((permission)=>{
//     console.log(permission);
//   })
// }

//here using async await
const init = async () =>{
 const permission = await Notification.requestPermission()

   switch(permission){
    case "granted" :{
      console.log('Permission was granted');
      break
    }

    case "denied" :{
      console.log('Permission was denied');
      break
    }
    default: {
      console.log('Permission was not granted or  denied');
    }
   }
  //  new Notification('🔊 Now Playing', {body: "Mr. Brightside - The Killers", icon: 'https://i.imgur.com/2Qs6HQp.png'});

  setTimeout(showNotification,2000)
  
  
  
  
};

const showNotification = () =>{
  const notification = notify('🔊 Now Playing','Mr. Brightside - The Killers')
  if(notification){
    console.log(notification);
    notification.addEventListener('click',(e) =>{
      window.parent.focus()
      e.target.close()
    })
  }
}

if('Notification' in window){
  init();
}


const notify = (title, body)=>{
  if(Notification.permission === 'granted'){
    return new Notification(title, {
      body:body,
      icon:'https://i.imgur.com/2Qs6HQp.png'
    })

  }
  return null
};

