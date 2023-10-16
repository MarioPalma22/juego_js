const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576


c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7


const background = new Sprite({
	position : {
		x: 0,
		y: 0
	},
	imageSrc: './assets/background.png'
	})

const shop = new Sprite({
	position : {
		x: 750,
		y: 155
	},
	imageSrc: './assets/shop_anim.png',
	scale: 2.5,
	framesMax: 6
	})


const player = new Fighter({
	position:{
		x:0,
		y:0
	},
	velocity:{
		x:0,
		y:0
	},
	offset:{
		x:0,
		y:0
	},
	imageSrc: './assets/player/Idle.png',
	framesMax: 8,
	scale:2.4,
	offset:{
		x:215,
		y:155
	},
	sprites:{
		idle:{
			imageSrc: './assets/player/Idle.png',
			framesMax: 8
		},
		run:{
			imageSrc: './assets/player/Run.png',
			framesMax: 8,	
		},
		jump:{
			imageSrc: './assets/player/Jump.png',
			framesMax: 2,
		},
		fall:{
			imageSrc: './assets/player/Fall.png',
			framesMax: 2,
		},
		attack1:{
			imageSrc: './assets/player/Attack1.png',
			framesMax: 6
		},
		takeHit:{
			imageSrc: './assets/player/Take Hit.png',
			framesMax: 4
		},
	},
	attackBox:{
		offset:{
			x:80,
			y:-20
		},
		width: 150,
		height:150
	}
	
})  
const enemy = new Fighter({
	position:{
		x:400,
		y:100
	},
	velocity:{
		x:0,
		y:0
	},
	color: 'purple',
	offset:{
		x:-50,
		y:0
	},
	imageSrc: './assets/player2/Idle.png',
	framesMax: 4,
	scale:2.4,
	offset:{
		x:215,
		y:170
	},
	sprites:{
		idle:{
			imageSrc: './assets/player2/Idle.png',
			framesMax: 4
		},
		run:{
			imageSrc: './assets/player2/Run.png',
			framesMax: 8,	
		},
		jump:{
			imageSrc: './assets/player2/Jump.png',
			framesMax: 2,
		},
		fall:{
			imageSrc: './assets/player2/Fall.png',
			framesMax: 2,
		},
		attack1:{
			imageSrc: './assets/player2/Attack1.png',
			framesMax: 4
		},
		takeHit:{
			imageSrc: './assets/player2/TakeHit.png',
			framesMax: 3
		},
	},
	attackBox:{
		offset:{
			x:-165,
			y:20
		},
		width: 170,
		height:100
	}
}
)
const keys = {
	a:{
		pressed: false
	},
	d:{
		pressed: false
	},
	w:{
		pressed:false
	},
	ArrowRight:{
		pressed:false
	},
	ArrowLeft:{
		pressed:false
	},
	ArrowUp:{
		pressed:false
	}
}


decreaseTimer()
function animate(){
	window.requestAnimationFrame(animate)
	c.fillStyle = 'black'
	c.fillRect(0, 0, canvas.width, canvas.height)
	background.update()
	shop.update()
	player.update()
	enemy.update()

	player.velocity.x = 0
	enemy.velocity.x = 0

	//MOVIMIEnTO DE J1

	if(keys.a.pressed && player.lastKey === 'a'){
		player.velocity.x = -3
		player.switchSprite('run')	
	}else if (keys.d.pressed && player.lastKey === 'd'){
		player.velocity.x = 3
		player.switchSprite('run')	
	} else{
		player.switchSprite('idle')
	}

	if(player.velocity.y <0){
		player.switchSprite('jump')
	}else if(player.velocity.y > 0){
		player.switchSprite('fall')
	}

	
	//MOVIMIENTO J2
	if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
		enemy.velocity.x = -3
		enemy.switchSprite('run')	
	}else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
		enemy.velocity.x = 3
		enemy.switchSprite('run')	
	}else{
		enemy.switchSprite('idle')
	}

	if(enemy.velocity.y <0){
		enemy.switchSprite('jump')
	}else if(enemy.velocity.y > 0){
		enemy.switchSprite('fall')
	}

	// DETECTOR DE DAÑO - HITBOX
	if (
		rectangularCollision({
			rectangle1: player,
			rectangle2: enemy
		}) && player.isAttacking && player.frameCurrent === 4){
			enemy.health -= 20
			player.isAttacking = false
			document.getElementById('enemyHealth').style.width = enemy.health + '%'
		}

	

	if (
		rectangularCollision({
			rectangle1: enemy,
			rectangle2: player
		}) && enemy.isAttacking && enemy.frameCurrent === 2){
			player.health -= 20
			
			enemy.isAttacking = false
			document.getElementById('playerHealth').style.width = player.health + '%'
		}


	
	// COlision de pibes - Ahora con animacion

	//Terminacion de round segun la vida final
	if (enemy.health <= 0 || player.health <= 0){
		determineWinner({player, enemy, timerID})
	}
	  
}
animate()

window.addEventListener('keydown', (event)=>{
	switch (event.key) {
		case 'd':
			keys.d.pressed = true
			player.lastKey = 'd'
			break;

		case 'a':
			keys.a.pressed = true
			player.lastKey = 'a'
			break;
	
		case 'w':
			player.velocity.y = -20
			player.lastKey = 'w'
			break;

		case ' ':
			player.attack()
			break;

			// Enemy
		case 'ArrowRight':
				keys.ArrowRight.pressed = true
				enemy.lastKey = 'ArrowRight'
				break;
	
		case 'ArrowLeft':
				keys.ArrowLeft.pressed = true
				enemy.lastKey = 'ArrowLeft'
				break;
		
		case 'ArrowUp':
				enemy.velocity.y = -20
				break;

		case 'ArrowDown':
			enemy.attack()
			break;
	}

	
	// console.log(event.key);
}
)

window.addEventListener('keyup', (event)=> {
	switch (event.key) {
		case 'd':
			keys.d.pressed = false
			break;
		case 'a':
				keys.a.pressed = false
				break;

		case 'w':
				keys.w.pressed = false
				lastKey = 'w'
				break;
	}
	//Enemy
	switch (event.key) {
		case 'ArrowRight':
			keys.ArrowRight.pressed = false
			enemy.lastKey = 'ArrowRight'
			break;

			case 'ArrowLeft':
			keys.ArrowLeft.pressed = false
			enemy.lastKey = 'ArrowLeft'
			break;
			}
}
)