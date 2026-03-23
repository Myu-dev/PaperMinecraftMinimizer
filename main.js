const fileInput=document.getElementById("fileInput");
fileInput.addEventListener("change",async()=>{
    const json=new ScratchJson();
    const file=fileInput.files[0];
    if(!file)return;
    const zip=await JSZip.loadAsync(file);
    const jsonFile=JSON.parse(await zip.file("project.json").async("string"));
    json.setJSON(jsonFile);
    const ret=minimize(json);
    console.log(ret.json);
});

function minimize(json){
    let ret=json;
    const char="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-";
    const globalLists=json.globalLists;
    const globalVariables=json.globalVariables;
    const DMUL=globalVariables._DMUL;
    const BlockData=globalLists._BLOCK_DATA;
    let number="";
    for(let i=DMUL;i<BlockData.length;i++){
        const v=BlockData[i].trim();
        if(v||i%DMUL!==1){
            console.log(i);
        }
    }
    return ret;
}