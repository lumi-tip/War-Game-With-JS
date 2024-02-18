let deckId
let cardsArr = []
let computerPoints = 0
let playerPoints = 0
let remainingCards = document.getElementById("remain-cards")
let warEl = document.getElementById("war-el")
const CP = document.getElementById("computer-points")
const PP = document.getElementById("player-points")
const drawBtn = document.getElementById("draw-cards")


async function handleClick() {
    const res = await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    const data = await res.json()

    deckId = data.deck_id
    remainingCards.innerHTML = `Remaining Cards: ${data.remaining}`
    computerPoints = 0
    playerPoints = 0
    CP.textContent = `Computer Points: ${computerPoints}`
    PP.textContent = `Player Points: ${playerPoints}`
    warEl.textContent = "War!"
    drawBtn.disabled = false
    drawBtn.style.cursor = "auto"
}

function fromCodeToPoints(arr){
    codesArr = []
    arr.forEach(code =>{
        if(code === "A") codesArr.push(11)
        else if(Number(code) > 0 && Number(code) <= 9) codesArr.push(Number(code))
        else codesArr.push(10)
    })
    return codesArr
}

function sumPoints(){
    let cardCodesArr = cardsArr.map(card => card.code[0])
    let values = fromCodeToPoints(cardCodesArr)

    computerPoints += values[0]
    playerPoints += values[1]

    CP.textContent = `Computer Points: ${computerPoints}`
    PP.textContent = `Player Points: ${playerPoints}`
}

document.getElementById("new-deck").addEventListener("click", handleClick)

drawBtn.addEventListener("click", async function() {
    const res = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    const data = await res.json()
    
    if(data.remaining > 0){
        remainingCards.innerHTML = `Remaining Cards: ${data.remaining}`
        cardsArr = data.cards
        sumPoints()
    }else{
        remainingCards.innerHTML = `Remaining Cards: 0 <br><span>Grab new deck</span>`
        sumPoints()
        drawBtn.disabled = true
        drawBtn.style.cursor = "not-allowed"
        if(computerPoints > playerPoints) warEl.textContent = "Computer Wins"
        else if(playerPoints > computerPoints) warEl.textContent = "Player Wins"
        else warEl.textContent = "It's a tie"
    }
    
    document.getElementById("ingame-cards").children[1].innerHTML = `<img src=${data.cards[0].image} class="card"/>`
    document.getElementById("ingame-cards").children[2].innerHTML = `<img src=${data.cards[1].image} class="card"/>`
})
