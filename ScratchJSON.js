class ScratchJson{
    constructor(){
        this.data={};
        this.stage=this.getStage();
        this.globalLists=this.getGlobalLists();
        this.globalVariables=this.getGlobalVariables();
    }

    setJSON(value){
        if(typeof value==="object")this.data=value;
        else if(typeof value==="string")this.data=JSON.parse(value);
    }

    getStage(){
        return this.data.targets.find(v=>v.isStage)
    }

    getGlobalVariables(){
        const stage=this.stage;
        const ret={};
        for(const [id,v] of Object.entries(stage.variables)){
            ret[v[0]]={
                id,
                value:v[1]
            }
        }
        return ret;
    }

    getGlobalLists(){
        const stage=this.stage;
        const ret={};
        for(const [id,v] of Object.entries(stage.lists)){
            ret[v[0]]={
                id,
                value:v[1]
            }
        }
        return ret;
    }

    get json(){return JSON.stringify(this.data)}
}