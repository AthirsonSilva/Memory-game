const cards = document.querySelectorAll('.memory-card')
const modal = document.querySelector('#modal')
const msg = document.querySelector('#msg')
const start = document.querySelector('#startBtn')
msg.style.display = 'none'
modal.style.display = 'flex'
let match = 0
let hasFlipped = false
let lockBoard = false
let firstCard, secondCard

function __init__() {
    shuffle()
    cards.firstCard.classList.remove('flip')
    cards.secondCard.classList.remove('flip')
    match = 0
    msg.style.display = 'flex'
    modal.style.display = 'flex'

}

function flipCard() {
    if (lockBoard) return
    if (this === firstCard) return

    this.classList.add('flip')

    if (!hasFlipped) {
        // First click
        hasFlipped = true
        firstCard = this
        return
    } 

    // Second click
    secondCard = this

    checkMatch()
}

function checkMatch() {

    /* let isMatch = firstCard.dataset.framework === secondCard.dataset.framework 
    isMatch ? disableCards() : unflipCards() */

    if (firstCard.dataset.framework === secondCard.dataset.framework ) {
        match++
        disableCards()
    } else {
        unflipCards()
    }

    if (match === 6) {
        __init__()
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)

    resetBoard()
}

function unflipCards() {
    lockBoard = true

    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        
        resetBoard()
    }, 1500)
}

function resetBoard() {
    [hasFlipped, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12)
        card.style.order = randomPos
    })
}

cards.forEach(card => card.addEventListener('click', flipCard))

start.addEventListener('click', () => {
    modal.style.display = 'none'
})


__init__()