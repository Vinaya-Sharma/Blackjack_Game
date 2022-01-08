
// challenge 1 age in days 

function ageInDays(){
    var birthyear = prompt("When is you birthday");  
    var ageInDays = (2021 - birthyear)* 365
    var h1 = document.createElement("h3");
    var textAnswer = document.createTextNode("You are " + ageInDays + " days old");
    h1.setAttribute("id", "ageInDays");
    h1.appendChild(textAnswer); 
    document.getElementById("flex-box-result").appendChild(h1);
    console.log(ageInDays);
}

function reset(){
    document.getElementById("ageInDays").remove();
}

function getCat(){
    var image = document.createElement("img");
    var div = document.getElementById("flex-box-cat");
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif";
    div.appendChild(image);
}

//challenge 3: rock paper scissors 

function rpsClick(yourChoice) {
    console.log(yourChoice.id);
    var humanC = yourChoice.id;
    var botC = ["rock", "paper", "scissors"][Math.floor(Math.random()*3)];
    console.log(botC);
    results = decideWinner(humanC, botC);
    console.log(results);
    message = finalMessage(results);
    console.log(message);
    rpsFrontend(humanC, botC, message);
}

function decideWinner(humanC, botC){
    var rpsDatabase = {
        "rock": {"scissors": 1, "rock": 0.5, "paper": 0},
        "paper": {"rock": 1, "paper": 0.5, "scissors": 0},
        "scissors": {"paper": 1, "scissors": 0.5, "rock": 0},
    };

    var userScore = rpsDatabase[humanC][botC];
    var botScore = rpsDatabase[botC][humanC];

    return[userScore, botScore];
}

function finalMessage([userScore, botScore]){
    if (userScore == 0){
        return{"message": "You Lost", "colour": "red"};
    } else if (userScore == 0.5){
        return{"message": "You Tied", "colour": "orange"};
    } else {
        return{"message": "You Win", "colour": "green"};
    }

}

function rpsFrontend(humanC, botC, message){
    var imageDatabase = {
        "rock": document.getElementById("rock").src,
        "paper": document.getElementById("paper").src, 
        "scissors": document.getElementById("scissors").src
    }

    //lets remove all images 
    document.getElementById("rock").remove();
    document.getElementById("paper").remove();
    document.getElementById("scissors").remove();

    var humanDiv = document.createElement("div")
    var botDiv = document.createElement("div")
    var frontendMessage = document.createElement("div")

    humanDiv.innerHTML = "<img src = '" + imageDatabase[humanC] + "' width = '150', height = '150' style ='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>"
    frontendMessage.innerHTML = "<h1 style = 'color:" + message["colour"] + "; padding: 40px; font-size: 60px;'>" +message["message"] + "</h1>"
    botDiv.innerHTML = "<img src = '" + imageDatabase[botC] + "' width = 150 height = 150 style = 'box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>"

    document.getElementById("flex-box-rps-div").appendChild(humanDiv);
    document.getElementById("flex-box-rps-div").appendChild(frontendMessage);
    document.getElementById("flex-box-rps-div").appendChild(botDiv);

}

//challenge 4: change the colour of all buttons 
var allButtons = document.getElementsByTagName("button");
    console.log(allButtons);

    buttonsCopy = []

    for (let i = 0; i < allButtons.length; i++){
        buttonsCopy.push(allButtons[i].classList[1]);
    }

    console.log(buttonsCopy)

function changeButtonColour(colour){
    if (colour.value == 'red') {
        buttonRed();
    }
    if (colour.value == 'blue') {
        buttonBlue();
    }
    if (colour.value == 'random') {
        buttonRandom();
    }
    if (colour.value == 'reset') {
        buttonReset();
    }
}

function buttonRed(){
    for (let i = 0; i < allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add("btn-danger");
    }
}

function buttonBlue(){
    for (let i = 0; i < allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add("btn-primary");
    }
}

function buttonRandom(){
    l = ["btn-danger", "btn-primary", "btn-success", "btn-warning"];
    
    for (let i = 0; i < allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(l[(Math.floor((Math.random())*3))]);
    }
}

function buttonReset(){
    for (let i = 0; i < allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(buttonsCopy[i]);
    }
}

//BlackJack: challnge 5 
 let blackJackGame = {
     "you": {"ScoreSpan": "#yourBlackJackResult", "div": "#yourBox", "score": 0}, 
     "dealer": {"ScoreSpan": "#dealerBlackJackResult", "div": "#dealerBox", "score": 0}, 
     "cards": ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
     "cardsMap": {"2":2, "3":3, "4":4, "5":5, "6":6, "7":7, "8":8, "9":9, "10":10, "J":10, "Q":10, "K":10, "A":[1, 11]},
     "wins": 0,
     "losses": 0,
     "ties": 0,  
     "isStand": false,
     "turnsOver": false,
}

const YOU = blackJackGame["you"]; 
const DEALER = blackJackGame["dealer"]; 
const HITSOUND = new Audio("blackjack_assets/sounds/swish.m4a"); 
const WINSOUND = new Audio("blackjack_assets/sounds/cash.mp3"); 
const LOSESOUND = new Audio("blackjack_assets/sounds/aww.mp3"); 
 
//checking which blackjack button has been clicked 
document.querySelector("#black-jack-hit-btn").addEventListener("click", blackJackHit); 
document.querySelector("#black-jack-deal-btn").addEventListener("click", blackJackDeal); 
document.querySelector("#black-jack-stand-btn").addEventListener("click", dealerLogic);

function blackJackHit(){
    if (blackJackGame["isStand"] === false){
        showCard(YOU);
        newScore(cardVal, YOU); 
        updateScore(YOU);
    }
}

function showCard(activePlayer){

    if (activePlayer["score"]<= 21){
        let cardImg =  new Image(90, 120); 
        cardImg.style.padding = "10px"; 

        cardVal = blackJackGame["cards"][Math.floor(Math.random()*13)]; 
        fileName = "blackjack_assets/images/" + cardVal + ".png"
        cardImg.src = fileName; 
        document.querySelector(activePlayer["div"]).appendChild(cardImg); 

        HITSOUND.play(); 
    }
    
}

function newScore(card, activePlayer){

    if (activePlayer["score"] <= 21){
        if (card == "A"){
            if (activePlayer["score"] < 11){
                activePlayer["score"] += blackJackGame["cardsMap"]["A"][1];
            }
            else{
                activePlayer["score"] += blackJackGame["cardsMap"]["A"][0];
            }
        }
        else{
            activePlayer["score"] += blackJackGame["cardsMap"][card];  
        }
        console.log(activePlayer["score"]); 
    }
} 

function updateScore(activePlayer){
    if (activePlayer["score"] > 21){
        document.querySelector(activePlayer["ScoreSpan"]).textContent = "BUST!";
        document.querySelector(activePlayer["ScoreSpan"]).style.color = "red"; 
    } 
    else {
        document.querySelector(activePlayer["ScoreSpan"]).textContent = activePlayer["score"];
    }
    
}

function blackJackDeal(){
    Deal(YOU);
    updateScore(YOU);
    Deal(DEALER); 
    updateScore(DEALER); 

    document.querySelector("#blackJackResults").textContent = ("Lets Play"); 
    document.querySelector("#blackJackResults").style.color = ("black"); 

    blackJackGame["turnsOver"] = false;
}

function Deal(activePlayer){
    if (blackJackGame["turnsOver"] == true){
        let playerImages = document.querySelector(activePlayer["div"]).querySelectorAll("img");

        for (let i = 0; i < playerImages.length; i++){
            playerImages[i].remove();  
        }
    
        YOU["score"] = 0; 
        DEALER["score"] = 0; 
        document.querySelector(YOU["ScoreSpan"]).style.color = "white"; 
        document.querySelector(DEALER["ScoreSpan"]).style.color = "white"; 
    
        blackJackGame["isStand"] = false;
    }
} 

function sleep(ms){
    return new Promise (x => setTimeout(x, ms)); 
}

async function dealerLogic(){
    blackJackGame["isStand"] = true;

    while (DEALER["score"] < 16 && blackJackGame["turnsOver"] == false){
        showCard(DEALER); 
        newScore(cardVal, DEALER); 
        updateScore(DEALER); 

        if (DEALER["score"] > 15){
            results(computeWinner()); 
            blackJackGame["turnsOver"] = true; 
    }
    await sleep(600);
}
}

function computeWinner(){

    let winner; 

    if(YOU["score"] <= 21){
        if(YOU["score"] > DEALER["score"] || DEALER["score"] > 21){
            winner = YOU; 
            console.log("you won")
            blackJackGame["wins"]++; 
        }
        else if (DEALER["score"] > YOU["score"] && DEALER["score"] <= 21){
            winner = DEALER; 
            console.log("dealer won")
            blackJackGame["losses"]++; 
        }
        else if (DEALER["score"] == YOU["score"]){
            console.log("its a tie"); 
            blackJackGame["ties"]++; 
    } 
    } else if (DEALER["score"] > 21 && YOU["score"] > 21){ 
        console.log("its a tieee"); 
        blackJackGame["ties"]++; 
    } else if (YOU["score"] > 21 && DEALER["score"]< 22){
        winner = DEALER; 
        console.log("dealer won"); 
        blackJackGame["losses"]++;  
    }

    console.log(blackJackGame); 
    return winner; 
}

function results(winner){
    let theMessage, theMessageColor; 
        if (winner == YOU){
            theMessage = "You Won!"; 
            theMessageColor = "green"; 
            document.querySelector("#wins").textContent = blackJackGame["wins"];
            WINSOUND.play()
    
        } else if (winner == DEALER){
            theMessage = "You Lost!"; 
            theMessageColor = "red"; 
            LOSESOUND.play()
            document.querySelector("#losses").textContent = blackJackGame["losses"];
        } else {
            theMessage = "You Drew!"; 
            theMessageColor = "black"; 
            document.querySelector("#draws").textContent = blackJackGame["ties"];
        }
    
        document.querySelector("#blackJackResults").textContent = theMessage; 
        document.querySelector('#blackJackResults').style.color = theMessageColor; 
        blackJackGame["turnsOver"] = false;

}