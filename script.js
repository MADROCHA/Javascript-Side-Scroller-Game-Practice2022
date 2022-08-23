window.addEventListener('load', function(){
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 720;
    

    /* CLASSES */
    class InputHandler {
        constructor(){
            this.keys = [];
            window.addEventListener('keydown', e => {
                /* console.log(e.key); */
                if ((e.key === 's' ||
                    e.key === 'w' ||
                    e.key === 'a' ||
                    e.key === 'd' )
                    && this.keys.indexOf(e.key) === -1){
                    this.keys.push(e.key);
                }
                console.log(e.key, this.keys);
            }); 
            window.addEventListener('keyup', e => {
                if (e.key === 's' ||
                    e.key === 'w' ||
                    e.key === 'a' ||
                    e.key === 'd' ) {
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
                console.log(e.key, this.keys);
            }); 
        }
    }
    class Player {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 200;
            this.height = 200;
            this.x = 0;
            this.y = this.gameHeight - this.height;
            this.image = document.getElementById('playerImage') ;
            this.frameX = 0;
            this.frameY = 0;
            this.speed = 0;
            this.vy = 0;
            this.gravity = 1;
        }
        draw(context){
            /* context.fillStyle = 'white';
            context.fillRect(this.x, this.y, this.width, this.height); */
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height,  this.width, this.height, this.x, this.y, this.width, this.height)
        }
        update(input){
            if (input.keys.indexOf('d') > -1){
                this.speed = 5;
            } else if (input.keys.indexOf('a') > -1){
                this.speed = -5;
            } else if (input.keys.indexOf('w') > -1 && this.onGround()){
                this.vy -= 32;
            } else {
                this.speed = 0;
            }
            /*X HORIZONTAL MOVEMENTS */
            this.x += this.speed;
            /*X HORIZONTAL SCREEN PATH BLOCKED */
            if ( this.x < 0) this.x = 0;
            else if (this.x > this.gameWidth - player.width) this.x = this.gameWidth - this.width;
            /*Y VERTICAL MOVEMENTS */
            this.y += this.vy;
            if (!this.onGround()){
                this.vy += this.gravity;
                this.frameY = 1;
            } else {
                this.vy = 0;
                this.frameY = 0;
            }
            if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height;
        }
        onGround(){
            return this.y >= this.gameHeight - this.height;
        }
    }
    class Background {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('backgroundImage');
            this.x = 0,
            this.y = 0,
            this.width = 2400;
            this.height = 720;
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y)
        }
    }
    class Enemy {
        
    }
    /* CLASSES */


    /* FUNCTIONS */
    function handleEnemies(){

    }
    function displayStatusText(){

    }

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);
    

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        background.draw(ctx);
        player.draw(ctx);
        player.update(input);
        requestAnimationFrame(animate);
    }
    animate();
    /* FUNCTIONS */
});