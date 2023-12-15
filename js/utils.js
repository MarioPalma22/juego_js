function rectangularCollision ({
	rectangle1,
	rectangle2
}){
	return(
			rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
			rectangle2.position.x + rectangle2.width >= rectangle1.attackBox.position.x &&
			rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
			rectangle2.position.y + rectangle2.height >= rectangle1.attackBox.position.y &&
			rectangle1.isAttacking

	)
}

function determineWinner({player, enemy ,timerID}) {
	clearTimeout(timerID)
	document.getElementById('tie').style.display = 'flex'
	if (player.health === enemy.health){
		document.getElementById('tie').innerHTML = 'EMPATE'
	} else if (player.health > enemy.health){
		document.getElementById('tie').innerHTML = 'JUGADOR 1 GANA'
	} else if (player.health < enemy.health){
		document.getElementById('tie').innerHTML = 'JUGADOR 2 GANA UN KILO DE POLLO'
	}
}

let timer = 30

let timerID

function decreaseTimer(){
	if (timer > 0){
		timerID = setTimeout(decreaseTimer, 1000)
		timer --
		document.getElementById('timer').innerHTML = timer
	}
	if (timer === 0){
		document.getElementById('tie').style.display = 'flex'
		determineWinner({player, enemy, timerID})
		}
		}