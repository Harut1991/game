$(function(){
    const start = $('#start');
    const refresh = $('#refresh');
    const levelDiv = $('#level');
   
    class Game {
        data;
        currentComplications;
        #complications = [
            {
                level: [1, 3],
                flaskCount:2 ,
                ballCount: 2
            }
        ]
        #level = 0;
        constructor(){
            this.#level = 1;
        }
    
        #mixData(data){
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
    
        #createDom({mixedData, flaskTotal}){
            for(let i = 0; i< mixedData.length; i++){
                const flask = document.createElement('div');
                flask.classList.add("flask");
                const flaskChild = document.createElement('div');
                flaskChild.classList.add("flaskChild");
               
                const flaskAbs = document.createElement('div');
                flaskAbs.classList.add("flaskAbs");
                if (mixedData[i].length){
                    for(let j=0; j< mixedData[i].length; j++){
                        const ball = document.createElement('div');
                        ball.classList.add("ball");
                        ball.innerHTML = mixedData[i][j];
                        flaskAbs.appendChild(ball);
                    }
                }
                flaskChild.appendChild(flaskAbs);
                 
                flaskChild.style.minHeight = mixedData[0].length * 34 + 'px';
                flaskChild.style.minWidth = "25px";
                flask.appendChild(flaskChild);
                if (mixedData[i].length){
                    const total = document.createElement('div');
                    total.classList.add("total");
                    total.innerHTML = flaskTotal[i];
                    flask.appendChild(total);
                }
                levelDiv.append(flask);
            }
        }

        #checkAndReturnMixData(data, total){
            const mix = this.#mixData(data);
            if (Object.values(this.checkWin(mix, total)).some(i => i)){
                return this.#checkAndReturnMixData(data, total);
            }
            return mix;
        }
    
        #makeJson(complicationConfig) {
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
            data.push([])
            return {
                actualData: data,
                mixedData: this.#checkAndReturnMixData(data, flaskTotal),
                flaskTotal
            }
        }
    
        #makeLevel(complicationConfig){
            $(levelDiv).html('');
            const {actualData, mixedData, flaskTotal} = this.#makeJson(complicationConfig);
            this.#createDom({ mixedData, flaskTotal});
            this.data = { mixedData, flaskTotal};
        }
    
        start(){
           
            this.data = null;
            this.currentComplications = null;
            const complicationConfig = this.#getComplication(this.#level);
            if (complicationConfig){
                this.currentComplications = complicationConfig;
                this.#makeLevel(complicationConfig);
                start.addClass('hide')
                refresh.removeClass('hide')
            }
        }
    
        #getComplication(level){
            return this.#complications.find(i => level >= i.level[0] && level < i.level[1]);
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
    
    function checkWin(data, total){
        const checkWinObj = game.checkWin(data, total);
        Object.entries(checkWinObj).forEach(element => {
            $($('.total')[element[0]]).removeClass('done')
            if (element[1]){
                $($('.total')[element[0]]).addClass('done')
            }
        });
        if (Object.values(checkWinObj).every(i=> i)){
            alert('win')
        }
    }

    let clickedBall = '';
    const game = new Game();
    start.click(function(){
        game.start();
    });
    refresh.click(function(){
        game.start();
    });

    
    $( "#level" ).on( "click",'.flask', function() {
        if (clickedBall === '' && game.data.mixedData[$(this).index()].length){
            clickedBall = $(this).index();
            $($(this).find('.flaskChild').find('.ball')[0]).addClass('selected');
        } else if(clickedBall !== '' && clickedBall === $(this).index()){
            $('.selected').removeClass('selected');
            clickedBall = '';
        } else if (clickedBall !== '' && game.canSet($(this).index())){
            game.changeData(clickedBall, $(this).index());
            const elem = $($('.flask')[clickedBall]).find('.flaskChild').find('.ball')[0];
            $($('.flask')[clickedBall]).find('.flaskChild').find('.ball')[0].remove();
            $($(this).find('.flaskChild').find('div')[0]).prepend(elem)
            clickedBall = '';
            $('.selected').removeClass('selected');
            checkWin(game.data.mixedData, game.data.flaskTotal);
        }
    });
})
