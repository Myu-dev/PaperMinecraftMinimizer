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

    get globalVariables(){
        const stage=this.stage;
        const variables=Object.values(stage.variables);
        const ret={};
        variables.forEach(item=>{
            ret[item[0]]=item[1]
        });
        return ret;
    }

    get globalLists(){
        const stage=this.stage;
        const lists=Object.values(stage.lists);
        const ret={};
        lists.forEach(item=>{
            ret[item[0]]=item[1]
        });;
        return ret;
    }

    get json(){return JSON.stringify(this.data)}
}