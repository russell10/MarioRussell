// TODO
game.PlayerEntity = me.Entity.extend({
   init: function(x, y, settings) {
       this._super(me.Entity, 'init', [x, y,  {
           image: "mario",
           spritttewidth: "128",
           spriteHeight: "128",
           width: 128,
           height: 128,
           getShape: function(){
               return (new me.Rect(0, 0, 30, 128)).toPolygon();
           }
       }]);
       
       this.renderable.addAnimation("idle", [3]);
       //create an animation called smallWalk using picture of the image defined above (mario)
       //sets the animation to rn through pictures 8-13
       //the lasts number says we switch between pictures every 80 millseconds
       this.renderable.addAnimation("smallWalk", [8, 9, 10, 11, 12, 13], 80);
       
       this.renderable.setCurrentAnimation("idle");
       //sets the speed we go on the x axis (first number) and y axis (second number)
       this.body.setVelocity(5, 20);
       me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
   },
   
   update: function(delta){
       console.log("update");
       
      if(me.input.isKeyPressed("right")){
          console.log("right");
          this.body.vel.x += this.body.accel.x * me.timer.tick;
          this.renderable.setCurrentAnimation("smallWalk");
      
       }else if (me.input.isKeyPressed("left")){
          console.log("left");
          this.body.vel.x -= this.body.accel.x / me.timer.tick;
      
       }else{
          this.body.vel.x = 0;
      
       }
       
       this.body.update(delta);
       me.collision.check(this, true, this.collideHandler.bind(this), true);
       
       
       if(me.input.isKeyPressed("up")){
           this.body.vel.y -= this.body.accel.y / me.timer.tick;
       }
            
        if(this.body.vel.x !== 0) {   
            if (!this.renderable.isCurrentAnimation("smallWalk")) {
                this.renderable.setCurrentAnimation("smallWalk");
                this.renderable.setAnimationFrame();
                
            }    
        }else{
            this.renderable.setCurrentAnimation("idle");
        }
            
     
     
      this._super(me.Entity, "update", [delta]); 
      return true;
   },
   
   collideHandler: function(response){
       
   }
    
});


game.LevelTrigger = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, settings]);
        this.body.onCollision = this.onCollision.bind(this);
        this.level = settings.level;
        this.xSpawn = settings.xSpawn;
        this.ySpawn = settings.ySpawn;
        
    },
    
    onCollision: function(){
         this.body.setCollisionMask(me.collision.types.NO_OBJECT);   
         me.levelDirector.loadLevel(this.level);
         me.state.current().resetPlayer(this.xSpawn, this.ySpawn);
    }
    
});