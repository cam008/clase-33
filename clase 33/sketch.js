const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var cuerda
var cuerda1
var cuerda2
var fruta
var frutaUnida
var conejo, conejoImg
var fondo
var melon
var botonCortar
var botonCortar2
var boton
var conejoparpadeando
var conejocomiendo
var conejotriste
var cutsound
var eatingsound
var soonidodefondo

let engine;
let world;
var ground;

function preload()
{
  conejoImg = loadImage("Rabbit-01.png")
  fondo = loadImage("background.png")
  melon = loadImage("melon.png")
  botonCortar = loadImage("cut_btn.png")
  botonCortar2 = loadImage("cut_button2.png")
  conejoparpadeando = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png")
  conejocomiendo = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png")
  conejotriste = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png")

  conejoparpadeando.playing = true 
  conejocomiendo.playing = true
  conejotriste.playing= true
  conejocomiendo.looping = false
  conejotriste.looping = false

  cutsound = loadSound("rope_cut.mp3")
  eatingsound = loadSound("eating_sound.mp3")
  //sonidodefondo = loadSound("Fun All Day .mp3")
  
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
 //sonidodefondo.play()
  //sonidodefondo.setVolume(0.5)
  engine = Engine.create();

  
  world = engine.world;
  conejoparpadeando.frameDelay = 20
  conejocomiendo.frameDelay = 20
  conejotriste.frameDelay = 20
  boton = createImg("cut_btn.png")
  boton.position(220, 30)
  boton.size(50, 50)
  boton.mouseClicked(cortar)
  
  boton1 = createImg("cut_btn.png")
  boton1.position(120,50)
  boton1.size(50, 50)
  boton1.mouseClicked(cortar1)

  boton2 = createImg("cut_btn.png")
  boton2.position(320, 70)
  boton2.size(50, 50)
  boton2.mouseClicked(cortar2)

  ground = new Ground(200,680,600,20);
  cuerda = new Rope(6,{x: 245, y: 30});
  cuerda1 = new Rope(8,{x: 145,y: 50});
  cuerda2 = new Rope(7,{x: 345,y: 70});
  fruta = Bodies.circle(300,300,15,15)
  frutaUnida = new liga(cuerda, fruta)
  frutaUnida1 = new liga(cuerda1, fruta)
  frutaUnida2 = new liga(cuerda2, fruta)
  conejo = createSprite(250, 600, 100, 100)
  conejo.addImage(conejoImg)
  conejo.scale = 0.2

  conejo.addAnimation("conejoparpadeando", conejoparpadeando)
  conejo.addAnimation("conejocomiendo", conejocomiendo)
  conejo.addAnimation("conejotriste", conejotriste)
  conejo.changeAnimation("conejoparpadeando")

  Matter.Composite.add(cuerda.body, fruta)
  //Matter.Composite.add(cuerda2.body, fruta)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(fondo, 0, 0,displayWidth + 80, displayHeight)
  push()
  imageMode(CENTER)
    if ( fruta != null ){
    image( melon, fruta.position.x, fruta.position.y, 70 ,70 )
  }
  pop()
   ground.show();
  
  Engine.update(engine);
  
  cuerda.show();
  cuerda1.show();
  cuerda2.show();
 
   ellipse(fruta.position.x, fruta.position.y,15,15)
   drawSprites();

   if ( collide(fruta, conejo) ==true){
     conejo.changeAnimation("conejocomiendo")
      eatingsound.play()
    }

   if ( collide(fruta, ground.body) ==true){
     conejo.changeAnimation("conejotriste")
     
      
   }
}
function cortar()
{
cuerda.break();
frutaUnida.soltar();
frutaUnida = null
}

function cortar1(){
  cuerda1.break();
  frutaUnida1.soltar();
  frutaUnida1 = null
}

function cortar2(){
  cuerda2.break();
  frutaUnida2.soltar();
  frutaUnida2 = null
}

function collide(body,sprite){
  if (body != null){
    var distancia = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y)
  }
  if (distancia < 80){
    World.remove(engine.world, fruta)
    fruta = null
    return true
  }
    else
    return false  
  }
