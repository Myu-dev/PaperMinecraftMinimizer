class ScratchJson{
    constructor(){
        this.data={};
    }

    setJSON(value){
        if(typeof value==="object")this.data=value;
        else if(typeof value==="string")this.data=JSON.parse(value);
    }

    get stage(){
        return this.data.targets.find(v=>v.isStage)
    }

    //使わないので未完成
    get globalVariables(){
        const stage=this.stage;
        const variables=stage.variables;
        this.data
    }

    get globalLists(){
        const stage=this.stage;
        const Lists=Object.values(stage.lists);
        return Lists.map(v=>{return {name:v[0],value:v[1]}});
    }

    get json(){return JSON.stringify(this.data)}
}