const fileInput=document.getElementById("fileInput");
fileInput.addEventListener("change",async()=>{
    const json=new ScratchJson();
    const file=fileInput.files[0];
    if(!file)return;
    const zip=await JSZip.loadAsync(file);
    const jsonFile=JSON.parse(await zip.file("project.json").async("string"));
    json.setJSON(jsonFile)
    console.log(json.globalLists);
});