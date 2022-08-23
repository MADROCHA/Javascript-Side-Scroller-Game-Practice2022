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

    }
    class Background {
        
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
    function animate(){

    }
    /* FUNCTIONS */



});