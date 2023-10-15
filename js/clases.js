class Sprite {
	constructor({position,imageSrc, scale = 1, framesMax = 1, offset = {x:0, y:0}}) {
		this.position = position || { x: 0, y: 0 };
		this.height = 150
		this.width = 50
        this.image = new Image()
        this.image.src = imageSrc
		this.scale = scale
		this.framesMax = framesMax
		this.frameCurrent = 0
		this.frameElapsed = 0
		this.frameHold = 6
		this.offset = offset

	}
	draw() {
        c.drawImage(
			this.image,

			this.frameCurrent * (this.image.width /this.framesMax) ,
			0,
			this.image.width / this.framesMax,
			this.image.height,	

			this.position.x - this.offset.x,
			this.position.y - this.offset.y,

			(this.image.width / this.framesMax ) * this.scale ,
			this.image.height * this.scale
			)


		}

	animateFrame () {
				this.frameElapsed ++

		if(this.frameElapsed % this.frameHold === 0){
			if (this.frameCurrent < this.framesMax -1){
				this.frameCurrent ++
			} else{
				this.frameCurrent = 0
			}
		}
	}
		


	update(){
		this.draw()
		this.animateFrame()}

}
class Fighter extends Sprite {
	constructor({
		position,
		velocity,
		color = 'blue',
		imageSrc,
		scale = 1,
		framesMax = 1,
		offset = {x:0, y:0},
		sprites
			}) {
				super({
					position,
					imageSrc,
					scale,
					framesMax,
					offset
				})

		// this.position = position || { x: 0, y: 0 };
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
		this.health = 100

		this.frameCurrent = 0
		this.frameElapsed = 0
		this.frameHold = 6
		this.sprites = sprites

		for ( const sprite in this.sprites){
			sprites[sprite].image = new Image()
			sprites[sprite].image.src = sprites[sprite].imageSrc 
		}
		console.log(this.sprites);
	}

	update(){
		this.draw()
		this.animateFrame()

		this.attackBox.position.x = this.position.x + this.attackBox.offset.x
		this.attackBox.position.y = this.position.y 

		this.position.x += this.velocity.x
		this.position.y += this.velocity.y

		if (this.position.y + this.height + this.velocity.y >= canvas.height -90 ){
			this.velocity.y = 0
		} else this.velocity.y += gravity
	}

	switchSprite (sprite){
		switch (sprite){
			case 'idle':
				if(this.image !== this.sprites.idle.image){
					this.image = this.sprites.idle.image
					this.framesMax = this.sprites.idle.framesMax
					this.frameCurrent = 0
				}
			break;

			case 'run':
				if(this.image !== this.sprites.run.image){
					this.image = this.sprites.run.image
					this.framesMax = this.sprites.run.framesMax
					this.frameCurrent = 0
				}
			break;
			case 'jump': if(this.image !== this.sprites.jump.image){
					this.image = this.sprites.jump.image
					this.framesMax = this.sprites.jump.framesMax
					this.frameCurrent = 0
				}
			break;
		}
	}

	attack(){
		this.isAttacking = true
		setTimeout(() =>{
			this.isAttacking = false
		}, 100)
	}
}