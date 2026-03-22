const fileInput=document.getElementById("fileInput");
fileInput.addEventListener("change",async()=>{
    const file=fileInput.files[0];
    if(!file)return;
    const zip=await JSZip.loadAsync(file);
    const json=JSON.parse(await zip.file("project.json").async("string"));
    console.log(json);
});