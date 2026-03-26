class ScratchJson{
    constructor(json){
        this.data={};
        if(json)this.setJSON(json);
        console.log("initialed!");
    }

    setJSON(value){
        if(typeof value==="object")this.data=value;
        else if(typeof value==="string")this.data=JSON.parse(value);
        this.stage=this.getStage();
        this.globalLists=this.getGlobalLists();
        this.globalVariables=this.getGlobalVariables();
    }

    getStage(){
        return this.data.targets.find(v=>v.isStage)
    }

    getGlobalVariables(){
        const ret={};
        for(const [id,v] of Object.entries(this.stage.variables)){
            ret[v[0]]={
                id,
                value:v[1]
            }
        }
        return ret;
    }

    getGlobalLists(){
        const ret={};
        for(const [id,v] of Object.entries(this.stage.lists)){
            ret[v[0]]={
                id,
                value:v[1]
            }
        }
        return ret;
    }

    get json(){return JSON.stringify(this.data)}
}