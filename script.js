window.addEventListener('load', function(){
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 720;
    let enemies = [];
    let score = 0;
    let gameOver = false;
    

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

            this.maxFrame = 8;
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000/this.fps;

            this.speed = 0;
            this.vy = 0;
            this.gravity = 1;

        }
        draw(context){
            /*DRAW COLLISION VECTORS */

            context.strokeStyle = 'white';
            context.strokeRect(this.x, this.y, this.width, this.height);
            context.beginPath();
            context.arc(this.x + this.width * 0.5, this.y + this.height * 0.5, this.width * 0.5, 0, Math.PI * 2);
            context.stroke();
            /*DRAW PLAYER IMAGE FRAMES */
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height,  this.width, this.height, this.x, this.y, this.width, this.height)
        }
        update(input, deltaTime, enemies){
            /* COLLISION DETECTION */
            enemies.forEach(enemy => {
                const dx = (enemy.x + enemy.width * 0.5) - (this.x + this.width * 0.5);
                const dy = (enemy.y + enemy.height * 0.5) - (this.y + this.height * 0.5);
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < enemy.width * 0.3 + this.width * 0.3){
                    gameOver = true;
                }
            });
            /* SPRITE FRAME ANIMATION */
            if (this.frameTimer > this.frameInterval){
                if(this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }
            /* KEY CONTROLS */
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
            /*X MOVE - HORIZONTAL SCREEN PATH BLOCKED */
            if ( this.x < 0) this.x = 0;
            else if (this.x > this.gameWidth - player.width) this.x = this.gameWidth - this.width;
            /*Y VERTICAL MOVEMENTS */
            this.y += this.vy;
            if (!this.onGround()){
                this.vy += this.gravity;
                this.maxFrame = 6; 
                this.frameY = 1;
            } else {
                this.vy = 0;
                this.maxFrame = 8;
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
            this.speed = 2.5;
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y, this.width, this.height)
            context.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height)
        }
        update(){
            this.x -= this.speed;
            if (this.x < 0 - this.width) this.x = 0;


        }
    }
    class Enemy {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 160;
            this.height = 119;
            this.image = document.getElementById('enemyImage');
            this.x = this.gameWidth + this.width;
            this.y = this.gameHeight - this.height;
            this.frameX = 0;

            this.maxFrame = 5;
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000/this.fps;
            
            this.speed = 5;
            this.markedForDeletion = false;
        }
        draw(context){
            /*DRAW COLLISION VECTORS */
            context.strokeStyle = 'white';
            context.strokeRect(this.x, this.y, this.width, this.height);
            context.beginPath();
            context.arc(this.x + this.width * 0.5, this.y + this.height * 0.5, this.width * 0.5, 0, Math.PI * 2);
            context.stroke();
            /*DRAW ENEMY IMAGE FRAMES */
            context.drawImage(this.image, this.frameX * this.width, 0, this.width   , this.height, this.x, this.y, this.width, this.height)
        }
        update(deltaTime){
            /* SPRITE FRAME ANIMATION */
            if(this.frameTimer > this.frameInterval){
                if (this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }
            this.x -= this.speed;
            if (this.x < 0 - this.width){

                this.markedForDeletion = true;
                score++;
            } 
        }
    }
    /* CLASSES */


    /* FUNCTIONS */
    
    function handleEnemies(deltaTime){
        if (enemyTimer > enemyInterval + randomEnemyInterval){
            enemies.push(new Enemy(canvas.width, canvas.height));
            console.log(enemies)
            randomEnemyInterval = Math.random() * 1000 + 500;
            enemyTimer = 0; 
        } else {
            enemyTimer += deltaTime;
        }
        enemies.forEach(enemy =>{
            enemy.draw(ctx);
            enemy.update(deltaTime);
        });
        enemies = enemies.filter(enemy => !enemy.markedForDeletion);
    }
    function displayStatusText(context){
        context.font = '40px Helvetica';
        context.fillStyle = 'black';
        context.fillText('score: ' + score, 16, 52);
        context.fillStyle = 'azure';
        context.fillText('score: ' + score, 20, 50);
        if (gameOver){
            context.textAlign = 'center';
            context.fillStyle = 'black';
            context.fillText('GAME OVER', canvas.width * 0.5, 150);
            context.fillStyle = 'azure';
            context.fillText('GAME OVER', canvas.width * 0.5 + 4, 150 + 2);
            /* context.fillText('GAME OVER', canvas.width * 0.5, canvas.height * 0.5);
            context.fillText('GAME OVER', canvas.width * 0.5 + 4, canvas.height * 0.5 + 2); */
        }
    }

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);
    /* const enemy1 = new Enemy(canvas.width, canvas.height); */
    
    let lastTime = 0;
    let enemyTimer = 0;
    let enemyInterval = 1000;
    let randomEnemyInterval = Math.random() * 1000 + 500;

    function animate(timeStamp){ 
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        /* console.log(deltaTime) */
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background.draw(ctx);
        background.update();
        handleEnemies(deltaTime);
        player.draw(ctx);
        player.update(input, deltaTime, enemies);
        /* enemy1.draw(ctx);
        enemy1.update(); */
        displayStatusText(ctx);
        if (!gameOver)
        requestAnimationFrame(animate);
    }
    animate(0);
    /* FUNCTIONS */
});