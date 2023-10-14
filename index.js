const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576


c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7

class Sprite {
	constructor({position, velocity, color = 'blue', offset}) {
		this.position = position || { x: 0, y: 0 };
		this.velocity = velocity
		this.height = 150
		this.width = 50

		this.lastKey


		//Attack
		this.attackBox = {
			position : {
				x:this.position.x ,
				y:this.position.y
			},
			offset,
				x:100 ,
				y:50,
			
			width: 100,
			height: 50,
		}

		this.color = color
		this.isAttacking 
	}
	draw() {
		c.fillStyle = this.color;
		c.fillRect(this.position.x, this.position.y, this.width, this.height)

		//AttackBox
		if (this.isAttacking){

			c.fillStyle = 'yellow'
			c.fillRect(
			this.attackBox.position.x,
			this.attackBox.position.y,
			this.attackBox.width,
			this.attackBox.height,
			)
		}
	}

	update(){
		this.draw()

		this.attackBox.position.x = this.position.x + this.attackBox.offset.x
		this.attackBox.position.y = this.position.y 

		this.position.x += this.velocity.x
		this.position.y += this.velocity.y

		if (this.position.y + this.height + this.velocity.y >= canvas.height){
			this.velocity.y = 0
		} else this.velocity.y += gravity
	}


	attack(){
		this.isAttacking = true
		setTimeout(() =>{
			this.isAttacking = false
		}, 100)
	}
}

const player = new Sprite({
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
	}
})
const enemy = new Sprite({
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
function animate(){
	window.requestAnimationFrame(animate)
	c.fillStyle = 'black'
	c.fillRect(0, 0, canvas.width, canvas.height)
	player.update()
	enemy.update()

	player.velocity.x = 0
	enemy.velocity.x = 0

	if(keys.a.pressed && player.lastKey === 'a'){
		player.velocity.x = -3
	}else if (keys.d.pressed && player.lastKey === 'd'){
		player.velocity.x = 3
	}
	//movimiento del enemigo
	if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
		enemy.velocity.x = -3
	}else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
		enemy.velocity.x = 3
	}

	// Autodetector de hitbox
	if (
		rectangularCollision({
			rectangle1: player,
			rectangle2: enemy
		}) && player.isAttacking){
			player.isAttacking = false
			console.log('ouchis');
		}
	

	if (
		rectangularCollision({
			rectangle1: enemy,
			rectangle2: player
		}) && enemy.isAttacking){
			enemy.isAttacking = false
			console.log('d20. El enemigo hace un ataque feroz, pierdes 800HP');
		}
	
	// COlision de pibes
	  
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