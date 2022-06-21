class liga
{
 constructor(bodyA, bodyB)
 {
    var ligaAnterior = bodyA.body.bodies.length -1
     this.liga1 = Constraint.create({bodyA:bodyA.body.bodies[ligaAnterior],pointA:{x: 0, y: 0},bodyB: bodyB, pointB:{x:0, y:0},length: -10,stiffness: 0.01})
     World.add(engine.world,this.liga1)
 }
soltar(){
    World.remove(engine.world, this.liga1)
}

}