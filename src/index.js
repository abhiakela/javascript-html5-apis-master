import '../assets/css/style.css';

const app = document.getElementById('app');
app.innerHTML = `
<h1>JavaScript HTML5 APIs!</h1>
<div class="uploader" >
  <h2>Uplaod your files 🌟✨</h2>
  <p>Accepts only .png .jpg .svg</p>
  <input type="file" class="files" accepts = "images/*" multiple>
  <div class="dropzone">🗂️  Drag to Upload</div>

  <div class="list"></div>
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
const files = document.querySelector('.files')
const list = document.querySelector('.list');



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
  // console.log('Drop' , e.dataTransfer.getData('text/plain'));
  // console.log(e.dataTransfer.files);
  const {files} =e.dataTransfer
  handleFileUpload(files)

  
})


files.addEventListener('change' , (e)=>{
  console.log(e,files);
  const {files} = e.target;
  handleFileUpload(files)
})

const uploadFiles = async (files) => {
  const form = new FormData();
  console.log(files);
  [...files].forEach(file => form.append(file.name , file))
  // console.log([...form.entries()]);

// https://glitch.com/edit/#!/dragdropfiles
  const request = await fetch('//dragdropfiles.glitch.me/upload' , {
    method: 'POST',
    body: form
  })

  return await request.json();
}

const showFilePreview = (file)=>{
  const reader = new FileReader()
  reader.readAsDataURL(file);
  reader.addEventListener('load',(e)=>{
    const div = document.createElement('div');
    console.log(file);
    div.innerHTML = `
    <div style="display: flex">
    <img
    src="${e.target.result}"
    alt="${file.name}"
    style="width:20px; margin-right:10px"
    >
    <p> ${file.name} <span>${file.size} bytes</span></p>
    </div>
    `;
    list.append(div)
  })
  // console.log(reader);
  // console.log(list , file);
}
const isAllowedType = (file) =>{
  return ['image/png' , 'image/jpeg' , 'image/svg+xml'].includes(file.type)
}

const handleFileUpload = (files)=>{
  // console.log([...files].filter(isAllowedType));
  const filesToUpload = [...files].filter(isAllowedType);
  filesToUpload.forEach(showFilePreview)
  // console.log(filesToUpload);

  uploadFiles(filesToUpload)


}
document.addEventListener('dragover', (e)=> e.preventDefault())
document.addEventListener('drop', (e)=> e.preventDefault())
};


//console.dir(document.createElement('div'));

if( 'draggable' in document.createElement('div')){
  init();

}