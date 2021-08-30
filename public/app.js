document.addEventListener('DOMContentLoaded', () => {
    

    let allCards = [], n = 0, cardsWImg = [];
    const btn = document.querySelector('#btn')
    
    const makeApiCall = () => {
        n++
        fetch(`https://api.magicthegathering.io/v1/cards?setName=Adventures in the Forgotten Realms&page=${n}`, {method: 'GET'})
        .then(res =>{
            res.json()
            .then(data => {
                allCards = [...allCards, ...data.cards]
                if(data.cards.length === 100 && n < 10){
                    makeApiCall()
                }
            })
        })

    }

    // makeApiCall()

    btn.addEventListener('click', () => {
        for(let i = 0; i < allCards.length; i++){
            let inDeck = false;

            for(let j = 0; j < cardsWImg.length; j++){
                if(allCards[i].name === cardsWImg[j].name) inDeck = true;
            }

            if(!inDeck) cardsWImg.push(allCards[i])
        }

        for(let i = 0; i < cardsWImg.length; i++){
            const $img = $("<img />").attr({
                src: cardsWImg[i].imageUrl,
                alt: cardsWImg[i].name,
                class: 'card'
            })

            $img.on('mouseover',() => {
                $('#selected').attr({
                    src: cardsWImg[i].imageUrl,
                    alt: cardsWImg[i].name
                })
            })
    
            $("#results").append($img)
        }
      
    })

})