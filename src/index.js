import '../assets/css/style.css';

const app = document.getElementById('app');
app.innerHTML = `
<h1>JavaScript HTML5 APIs!</h1>
<div class="uploader" >
  <div id="item-0" class="dragme" draggable="true">
  </div>
  <div class="dropzone">🎯 Drag Here!</div>
</div>

<style>
.uploader{
  box-sizing: border-box;
  max-width : 90%;
  border-radius; 10px;
  border-bottom : 3px solid #d2d5da;
  margin: 25px auto;
  padding : 25px ;
  background : #fff;
}

.dragme{
  background: #ce1f99;
  border-radius: 5px;
  width: 50px;
  height: 50px;
}
.dropzone { 
  border-radius : 5px ;
  margin-top : 25px ;
  padding : 25px;
  border : 2px dashed #d2d5da;
  background : #f1f2f5
}

.active{
  background: #ebfff6;
  border-color: #24b373;
}
</style>
`;   

const init = () => {

const dropzone = document.querySelector('.dropzone');
const dragme = document.querySelector('.dragme');

dragme.addEventListener('dragstart', (e)=> 
{
  // console.log(e.dataTransfer)
  // console.log(e.target.id);
  e.dataTransfer.setData('text/plain', e.target.id)
}

)


dropzone.addEventListener('dragenter' , (e)=> {
  e.target.classList.add('active')
  // console.log(e, 'dragenter');

})

dropzone.addEventListener('dragleave' , (e)=> {
  // console.log(e, 'dragleave');
  e.target.classList.remove('active')
})



dropzone.addEventListener('dragover' , (e)=>{
  // console.log("Dragging....." ,e);
  // when we drag our item we have lots of events
  e.preventDefault();
  //this is because we are declaring draggable area if we don't include this prevent default it won't allow us to bind a drop event
  // e.dataTransfer.dropEffect = 'move'
  // e.dataTransfer.dropEffect= 'link'
  //  e.dataTransfer.dropEffect= 'copy'
})


dropzone.addEventListener('drop', (e)=>{

  //have you drop an image in browser it opens the image so that's why we are using prevent default
  e.preventDefault();
  e.stopPropagation();
  e.target.classList.remove('active')
  console.log('Drop' , e.dataTransfer.getData('text/plain'));
  const id = e.dataTransfer.getData('text/plain');
  const element = document.getElementById(id);
  dropzone.append(element)

})
};


//console.dir(document.createElement('div'));

if( 'draggable' in document.createElement('div')){
  init();

}