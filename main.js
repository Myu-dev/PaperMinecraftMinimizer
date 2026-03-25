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
    let ret={...json};
    const char="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-";
    const globalLists=json.globalLists;
    const globalVariables=json.globalVariables;
    const DMUL=Number(globalVariables._DMUL);
    const BlockData=globalLists._BLOCK_DATA;
    let number="";
    for(let i=DMUL;i<BlockData.length;i++){
        const v=BlockData[i].trim();
        if(v&&i%DMUL!==1){
            const data=BlockData[i];
            const length=data.length;
            number+=(String(length).length===1)?"0"+length:String(length);
            for(let j=0;j<data.length;j++){
                const t=char.indexOf(data[j]);
                number+=(String(t).length===1)?"0"+t:String(t);
            }
        }
    }
    console.log(number);
    //ここから画像にしていく
    const imgs=[];
    const canvas=document.createElement("canvas");
    const canvasWidth=480;
    const canvasHeight=360;
    canvas.width=canvasWidth;
    canvas.height=canvasHeight;
    const ctx=canvas.getContext("2d");
    const div=4;
    const blockWidth=canvasWidth/div;
    const blockHeight=canvasHeight/div;
    for(let i=0;i<number.length;i++){
        let t=number[i]*10;
        if(String(t).length===1)t+="0";
        ctx.fillStyle="#"+t+t+t;
        const block=Math.floor(i/(blockWidth/blockHeight));
        const blockX=block%div;
        const blockY=Math.floor(block/div);

        const local=i/(blockWidth*blockHeight);
        const x=blockX*blockWidth+(local%blockWidth);
        const y=blockY*blockHeight+Math.floor(local/blockHeight)
        ctx.fillRect(x,y,1,1);
        if(i%(blockWidth*blockHeight)&&i!==0){
            imgs.push(canvas.toDataURL("image/png"));
            ctx.clearRect(0,0,canvasWidth,canvasHeight);
            x++;
        }else if(i===number.length-1){
            imgs.push(canvas.toDataURL("image/png"));
            ctx.clearRect(0,0,canvasWidth,canvasHeight);
        }else x++;
    }
    document.body.innerHTML=`<a href="${imgs[0]}">画像</a>`
    return ret;
}