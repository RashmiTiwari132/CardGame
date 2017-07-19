var canvas =  document.getElementById('canvas');
var player2 = document.getElementById('player2');
player2.onclick = playPlayer2;
var start_player2 = document.getElementById('player1');
player1.onclick = playPlayer1;

var player = {
	playersCount : 2/*,
	turn : {
		normal : 0,
		war : 1
	},
	cardCount : [26, 26],
	cardIndexes : [1, 1],
	cardHolderIndexes : [0, 7]*/
};

var card = {
	cardPositions : [[220, 250],[820, 250]],
	cardHeight : 100,
	cardWidth : 100,
	count : 26,
	positionDiff : 20,
}

var cardHolders = {
	cardPositions : [100, 10],
	cardHeight : 120,
	cardWidth : 120,
	count : 8,
	positionDiff : 140
}

var cardsDeck = {
	deck : [[1,2,3,4,5,6,7,8,9,10,11,12,13],[1,2,3,4,5,6,7,8,9,10,11,12,13],[1,2,3,4,5,6,7,8,9,10,11,12,13],[1,2,3,4,5,6,7,8,9,10,11,12,13]],
	deckCount : [13, 13, 13, 13]
};

var playerCards = [[],[]];


function draw(){
	//drawCards();
	shuffleCards();
	drawCardHolders();
}

/*
	This method uses HTML5 canvas to draw cards for each players.
*/

function drawCards(){

	if(canvas.getContext){
		var ctx = canvas.getContext('2d');

		var diff;
		var j;
		var i=0;
		while(i < player.playersCount){
			j=0;
			diff=0;
			while(j < playerCards[i].length){
				if(j%2 == 0){
					ctx.fillStyle = 'rgb(200, 0, 0)';
				}else{
					ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
				}
				ctx.fillRect(card.cardPositions[i][0], card.cardPositions[i][1]+diff, card.cardHeight, card.cardWidth);
				ctx.strokeRect(card.cardPositions[i][0], card.cardPositions[i][1]+diff, card.cardHeight, card.cardWidth);
				diff +=card.positionDiff;
				j++;
			}			
			i++;
		}
	}
}

/*
	This method uses HTML5 canvas to draw card holders.
*/

function drawCardHolders(){
	if(canvas.getContext){
		var ctx = canvas.getContext('2d');
		var i=0;
		var diff=0;
		while(i<cardHolders.count){
			ctx.fillStyle = 'rgba(225, 218, 239, 0.5)';
			ctx.fillRect(cardHolders.cardPositions[0]+diff, cardHolders.cardPositions[1], cardHolders.cardHeight, cardHolders.cardWidth);
			ctx.strokeRect(cardHolders.cardPositions[0]+diff, cardHolders.cardPositions[1], cardHolders.cardHeight, cardHolders.cardWidth);
			diff +=cardHolders.positionDiff;
			i++;
		}
	}
}

/*
	This method shuffles the cards.
*/

function shuffleCards(){
	var deck;
	var cardNumber;

	for(var i=0; i<player.playersCount; i++){
		for(var j=0; j<card.count; j++){
			deck = Math.floor(Math.random() * (cardsDeck.deck).length);
			while(cardsDeck.deckCount[deck] == 0){
				deck = Math.floor(Math.random() * (cardsDeck.deck).length);
			}
			cardNumber = Math.floor(Math.random() * cardsDeck.deckCount[deck]);
			cardsDeck.deckCount[deck]--;
			playerCards[i][j] = cardsDeck.deck[deck][cardNumber];
			cardsDeck.deck[deck].splice(cardNumber, 1);
			cardsDeck.deck[deck].splice(12, 0, cardsDeck.deck[deck][cardNumber]);
		}
	}
}

/*
	This method is called when it is player 1's turn to play.
*/

function playPlayer1(){
	if(playerCards[0].length==0){
		alert("Player 2 wins");
	}else if(playerCards[1].length==0){
		alert("Player 1 wins");
	}else{
		removeCards(0, 0, 0);
	}
}

/*
	This method is called when it is player 2's turn to play.
*/

function playPlayer2(){
	if(playerCards[1].length==0){
		alert("Player 1 wins");
	}else if(playerCards[0].length==0){
		alert("Player 2 wins");
	}else{
		removeCards(0, 1, 0);
		playPlayer1();
		setTimeout(function(){ checkCards(); }, 1000);
	}
}

/*
	This method draws the cards on a canvas.
*/

function removeCards(cardIndex, playerTurn, isWar){
	var diff;
	var diff2;
	var ctx;
	var count;
	if(isWar == 1){
		count = 4;
	}else{
		count = 1
	}

	drawCardHolders();
	for(var i=0; i<count; i++){
		if(canvas.getContext){
			diff = (playerTurn*(cardHolders.count-1-i))*cardHolders.positionDiff;
			diff2 = ((1-playerTurn)*i*cardHolders.positionDiff);
			ctx = canvas.getContext('2d');
			ctx.fillStyle = 'rgb(200, 0, 0)';
			ctx.fillRect(cardHolders.cardPositions[0]+diff+diff2+10, cardHolders.cardPositions[1]+10, card.cardWidth, card.cardHeight);
			ctx.strokeRect(cardHolders.cardPositions[0]+diff+diff2+10, cardHolders.cardPositions[1]+10, card.cardWidth, card.cardHeight);
			ctx.fillStyle = "#000000";
			ctx.font = "40px Georgia";
			ctx.textAlign="center"; 
			ctx.textBaseline = "middle";
			if(i == 0 && playerCards[playerTurn].length > 0){
				ctx.fillText(playerCards[playerTurn][i], cardHolders.cardPositions[0]+diff+diff2+10+card.cardWidth/2, cardHolders.cardPositions[1]+10+card.cardHeight/2);	
			}
		}	
	}	
}

function clearCardHolders(){
	drawCardHolders();
}

/*
	This method compares the two cards removed and decides whether there is a war or not.
*/

function checkCards(){
	if(playerCards[0][0] > playerCards[1][0]){
		playerCards[0].splice(playerCards[0].length, 0, playerCards[0][0]);
		playerCards[0].splice(playerCards[0].length, 0, playerCards[1][0]);
		playerCards[0].splice( 0, 1);
		playerCards[1].splice( 0, 1);
	}else if(playerCards[1][0] > playerCards[0][0]){
		playerCards[1].splice(playerCards[1].length, 0, playerCards[1][0]);
		playerCards[1].splice(playerCards[1].length, 0, playerCards[0][0]);
		playerCards[0].splice( 0, 1);
		playerCards[1].splice( 0, 1);
	}else{
		war();
	}
}


/*
	This method will be called when both players' current cards are of same value. 
	It will call the method removeCards to remove 4 cards from each players' store.
	Value of the first card removed will be shown. While other cards will lie face down.
*/
function war(){
	var i;
	var turn;
	var warCards = [];
	warCards.splice(0, 0, playerCards[1][0]);
	warCards.splice(0, 0, playerCards[0][0]);
	playerCards[0].splice( 0, 1);
	playerCards[1].splice( 0, 1);

	while(playerCards[0].length>0 && playerCards[1].length>0 && playerCards[1][0] == playerCards[0][0]){
		removeCards(0, 0, 1);
	    removeCards(0, 1, 1);
		i=0;		
		while(playerCards[1].length>0 && playerCards[0].length>0 && i<4){
			warCards.splice(0, 0, playerCards[1][0]);
			warCards.splice(0, 0, playerCards[0][0]);
			playerCards[0].splice( 0, 1);
			playerCards[1].splice( 0, 1);
			i++;
		}
	}

	if(playerCards[0].length>0 && playerCards[1].length>0 && playerCards[1][0] > playerCards[0][0]){
		turn = 1;
	}else{
		turn = 0;
	}

	i=0;
	while(playerCards[1].length>0 && playerCards[0].length>0 && i<4){
		warCards.splice(0, 0, playerCards[1][0]);
		warCards.splice(0, 0, playerCards[0][0]);
		playerCards[0].splice( 0, 1);
		playerCards[1].splice( 0, 1);
		i++;
	}

	i=0;
	while(i<warCards.length){
		playerCards[turn].splice(playerCards[turn].length, 0, warCards[0]);
		warCards.splice(0, 1);
		i++;
	}
}