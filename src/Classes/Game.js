import {getComplication} from './complecations';
export default class GameClass {
    data;
    currentComplications;
    level = 0;

    mixData(data){
        const deepData = JSON.parse(JSON.stringify(data));
        for(let i = 0; i< data.length - 1; i++){
            for(let j=0; j< data[i].length; j++){
                Math.floor(Math.random() * (data.length - 2));
                const rand1 = Math.floor(Math.random() * (data.length - 1));
                const rand2 = Math.floor(Math.random() * (data[i].length));
                const rand3 = Math.floor(Math.random() * (data.length - 1));
                const rand4 = Math.floor(Math.random() * (data[i].length));
                const prev = deepData[rand1][rand2];
                deepData[rand1][rand2] = deepData[rand3][rand4];
                deepData[rand3][rand4] = prev;
            }
        }
        return deepData;
    }

    checkAndReturnMixData(data, total){
        const mix = this.mixData(data);
        if (Object.values(this.checkWin(mix, total)).some(i => i)){
            return this.checkAndReturnMixData(data, total);
        }
        return mix;
    }

    makeJson(complicationConfig) {
        const data = [];
        const flaskTotal = [];
        for(let i = 0; i< complicationConfig.flaskCount; i++){
            let total = 0;
            data.push([]);
            for(let j=0; j< complicationConfig.ballCount; j++){
                let rand = Math.floor(Math.random() * (9) + 1);
                if (this.level >= 29 && j === complicationConfig.ballCount-1){
                    if (total < 9) {
                        rand = Math.floor(Math.random() * (total-1) + 1) * -1;
                    } else {
                        rand = rand*-1;
                    }
                }
                total+= rand;
                data[i].push(rand)
            }
            flaskTotal.push(total);
        }
        data.push([]);
        return {
            actualData: data,
            mixedData: this.checkAndReturnMixData(data, flaskTotal),
            flaskTotal
        }
    }

    makeLevel(complicationConfig){
        const {actualData, mixedData, flaskTotal} = this.makeJson(complicationConfig);
        this.data = { actualData, mixedData, flaskTotal};
    }

    addRow(){
        this.data.actualData.push([]);
        this.data.mixedData.push([]);
        return this.data;
    }

    start(level){
        this.level = level;
        this.data = null;
        this.currentComplications = null;
        const complicationConfig = getComplication(this.level);
        if (complicationConfig){
            this.currentComplications = complicationConfig;
            this.makeLevel(complicationConfig);
        }
    }
    
    canSet(index){
        return this.data.mixedData[index].length < this.currentComplications.ballCount;
    }

    changeData(from, to){
        const dataDeep = JSON.parse(JSON.stringify(this.data));
        dataDeep.mixedData[to].unshift(dataDeep.mixedData[from][0]);
        dataDeep.mixedData[from] = dataDeep.mixedData[from].slice(1);
        this.data = dataDeep;
    }

    checkWin(data, flaskTotal){
        const obj = {};
        for(let i = 0; i< this.currentComplications.flaskCount;i++){
            obj[i] = !!(data[i].length === this.currentComplications.ballCount && data[i].reduce((accumulator, curr) => accumulator + curr) === flaskTotal[i])
        }
        return obj;
    }
}
