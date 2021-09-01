const app = angular.module('MTGDraft', [])

app.controller('CardController', ['$http', '$window', function($http, $window){
    const ctrl = this;
    let tempCardHolder = [], n = 0;
    this.setTitle = '';
    this.newSetCards = [];
    this.listOfSets = [];
    this.allSavedCards = {};

    $window.onload = () =>{
        $http({url: '/cards', method: 'GET'})
        .then(data => {
            const res = data.data.data
            res.forEach(c => {
                c.card = JSON.parse(c.card)

                if(ctrl.allSavedCards[c.set_name])ctrl.allSavedCards[c.set_name].push(c)
                else ctrl.allSavedCards[c.set_name] = [c]
            })
            ctrl.listOfSets = Object.keys(ctrl.allSavedCards)
        })
    }

    // /////////////////////////////////////////////////////////////////////
    // New Set Section 
    // ////////////////////////////////////////////////////////////////////

    this.addNewSet = () => {
        for(let i = 0; i < tempCardHolder.length; i++){
            let inDeck = false, hightestInt = 1;

            for(let j = 0; j < ctrl.newSetCards.length; j++){
                if(ctrl.newSetCards[j].id >= hightestInt) hightestInt = ctrl.newSetCards[j].id + 1
                if(tempCardHolder[i].name === ctrl.newSetCards[j].card.name || ctrl.newSetCards[j].card.type.split(" ")[0] === "Basic") inDeck = true;
            }

            if(!inDeck){
                let obj = {
                    id: hightestInt, 
                    card : tempCardHolder[i], 
                    rank : 'N/A', 
                    deck_id: '', 
                    set_name : ctrl.setTitle
                }
                ctrl.newSetCards.push(obj)
            }
        }

        // for(let i = 0; i < ctrl.cardsWImg.length; i++){
        //     const $img = $("<img />").attr({
        //         src: ctrl.cardsWImg[i].imageUrl,
        //         alt: ctrl.cardsWImg[i].name,
        //         class: 'card'
        //     })

        //     $img.on('mouseover',() => {
        //         $('#selected').attr({
        //             src: ctrl.cardsWImg[i].imageUrl,
        //             alt: ctrl.cardsWImg[i].name
        //         })
        //     })
    
        //     $("#results").append($img)
        // }
    }

    this.getNewSet = () => {
        if(ctrl.setTitle) {
            n = 0;
            makeApiCall()
        }
        else console.log("nothing")
    }

    const makeApiCall = () => {
        n++
        $http({url: `https://api.magicthegathering.io/v1/cards?setName=${ctrl.setTitle}&page=${n}`, 
        method:'GET'})
        .then(data => {
            tempCardHolder = [...tempCardHolder, ...data.data.cards]
            if(data.data.cards.length === 100 && n < 10){
                makeApiCall()
            }
            else if(data.data.cards.length === 0) alert('Wrong Set Name')
            else {
                console.log("Done")
                ctrl.addNewSet()
            }
            
        })
        .catch(err => console.log(err))  
    }


    ctrl.saveNewSet = ()=> {
        ctrl.allSavedCards[ctrl.newSetCards[0].set_name] = ctrl.newSetCards;
        ctrl.listOfSets.push(ctrl.newSetCards[0].set_name);
        
        ctrl.newSetCards.forEach(card => {
            let tempObj = card;
            tempObj.card = JSON.stringify(tempObj.card)
            $http({url: '/cards', method: 'POST', data: tempObj})
            .then(res => console.log(res))
            .catch(err => console.log(err))
        })
    }

    this.show = () => {
        console.log(ctrl.listOfSets)
    }

    
}])