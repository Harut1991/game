export default class GameClass {
    data;
    currentComplications;
    complications = [
        {
            level: [1, 2],
            flaskCount:2,
            ballCount:2
        },
        {
            level: [2, 3],
            flaskCount:3,
            ballCount:2
        },
        {
            level: [3, 4],
            flaskCount:4,
            ballCount:2
        }
    ]
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
                const rand = Math.floor(Math.random() * (9) + 1);
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

    start(level){
        this.level = level;
        this.data = null;
        this.currentComplications = null;
        const complicationConfig = this.getComplication(this.level);
        if (complicationConfig){
            this.currentComplications = complicationConfig;
            this.makeLevel(complicationConfig);
        }
    }

    getComplication(level){
        return this.complications.find(i => level >= i.level[0] && level < i.level[1]);
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
        for(let i = 0; i< data.length-1;i++){
            obj[i] = !!(data[i].length === this.currentComplications.ballCount && data[i].reduce((accumulator, curr) => accumulator + curr) === flaskTotal[i])
        }
        return obj;
    }
}