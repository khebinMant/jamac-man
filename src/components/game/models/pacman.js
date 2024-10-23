import { Howl } from "howler";

export default class PacMan {
  constructor(
    { position, velocity },
    tileLength,
    munchOne = new Howl({
      src: "./audio/munch_one.wav",
      volume: 0.1,
    }),
    munchTwo = new Howl({
      src: "./audio/munch_two.wav",
      volume: 0.1,
    })
  ) {
    this.originalPosition = position;
    this.position = { ...this.originalPosition };
    this.originalVelocity = velocity;
    this.velocity = { ...this.originalVelocity };
    this.tileLength = tileLength;
    this.radius = (tileLength * 3) / 8;
    this.speed = tileLength / 8;
    this.radians = Math.PI / 4;
    this.openRate = Math.PI / 36;
    this.shrinkRate = Math.PI / 220;
    this.rotation = 0;
    this.lives = 2;
    this.isEating = false;
    this.isShrinking = false;
    this.isLevellingUp = false;
    this.munchOne = munchOne;
    this.munchTwo = munchTwo;
  }

  // draw(ctx) {
  //   ctx.save();
  
  //   // Trasladar y rotar al pez
  //   ctx.translate(this.position.x, this.position.y);
  //   ctx.rotate(this.rotation);
  //   ctx.translate(-this.position.x, -this.position.y);
  
  //   // Cuerpo del pez (más estilizado y curvado)
  //   ctx.beginPath();
  //   ctx.moveTo(this.position.x - this.radius * 2, this.position.y); // Punto delantero del pez
  //   ctx.quadraticCurveTo(
  //     this.position.x - this.radius, 
  //     this.position.y - this.radius * 1.5, // Curva superior del cuerpo
  //     this.position.x + this.radius * 2, 
  //     this.position.y
  //   );
  //   ctx.quadraticCurveTo(
  //     this.position.x - this.radius, 
  //     this.position.y + this.radius * 1.5, // Curva inferior del cuerpo
  //     this.position.x - this.radius * 2, 
  //     this.position.y
  //   );
  //   ctx.fillStyle = "lightblue"; // Color del pez
  //   ctx.fill();
  //   ctx.strokeStyle = "black"; // Contorno del pez
  //   ctx.lineWidth = 2;
  //   ctx.stroke();
  //   ctx.closePath();
  
  //   // Boca del pez (simple curva)
  //   ctx.beginPath();
  //   ctx.arc(
  //     this.position.x + this.radius * 1.8, 
  //     this.position.y, 
  //     this.radius / 2, 
  //     this.radians, 
  //     Math.PI * 2 - this.radians
  //   );
  //   ctx.lineTo(this.position.x + this.radius * 1.8, this.position.y); 
  //   ctx.fillStyle = "white"; // Color de la boca
  //   ctx.fill();
  //   ctx.closePath();
  
  //   // Ojo del pez (grande y expresivo)
  //   ctx.beginPath();
  //   ctx.arc(this.position.x + this.radius, this.position.y - this.radius / 2, this.radius / 2, 0, Math.PI * 2);
  //   ctx.fillStyle = "white";
  //   ctx.fill();
  //   ctx.stroke();
  
  //   // Pupila del ojo
  //   ctx.beginPath();
  //   ctx.arc(this.position.x + this.radius, this.position.y - this.radius / 2, this.radius / 4, 0, Math.PI * 2);
  //   ctx.fillStyle = "black";
  //   ctx.fill();
  //   ctx.closePath();
  
  //   // Escamas decorativas (varios semicírculos)
  //   for (let i = 0; i < 4; i++) {
  //     ctx.beginPath();
  //     ctx.arc(
  //       this.position.x - this.radius * (i - 0.5), 
  //       this.position.y, 
  //       this.radius / 3, 
  //       Math.PI, 
  //       Math.PI * 2
  //     );
  //     ctx.strokeStyle = "white";
  //     ctx.lineWidth = 1;
  //     ctx.stroke();
  //     ctx.closePath();
  //   }
  
  //   // Cola trasera (triángulo estilizado)
  //   ctx.beginPath();
  //   ctx.moveTo(this.position.x - this.radius * 2.5, this.position.y); // Punto en el centro trasero del pez
  //   ctx.lineTo(this.position.x - this.radius * 3, this.position.y - this.radius); // Esquina superior del triángulo
  //   ctx.lineTo(this.position.x - this.radius * 3, this.position.y + this.radius); // Esquina inferior del triángulo
  //   ctx.closePath(); // Cierra el triángulo
  //   ctx.fillStyle = "lightblue";
  //   ctx.fill();
  //   ctx.strokeStyle = "black";
  //   ctx.stroke();
  
  //   // Aletas superiores (curvas decorativas estilizadas)
  //   ctx.beginPath();
  //   ctx.moveTo(this.position.x - this.radius * 1.5, this.position.y - this.radius * 1.2);
  //   ctx.lineTo(this.position.x - this.radius, this.position.y - this.radius * 1.8);
  //   ctx.lineTo(this.position.x - this.radius * 0.5, this.position.y - this.radius * 1.2);
  //   ctx.fillStyle = "lightblue";
  //   ctx.fill();
  //   ctx.strokeStyle = "black";
  //   ctx.stroke();
  //   ctx.closePath();
  
  //   ctx.restore();
  // }
  
  // update(ctx) {
  //   this.checkRotation();
  //   this.draw(ctx);
  
  //   // Actualizar la posición del pez
  //   this.position.x += this.velocity.x;
  //   this.position.y += this.velocity.y;
  
  //   // Si el pez se está moviendo, hace "chomp" (abrir y cerrar la boca)
  //   if (this.velocity.x !== 0 || this.velocity.y !== 0) {
  //     this.chomp();
  //   } else {
  //     // Si no se mueve, la boca se mantiene en una posición semiabierta
  //     this.radians = Math.PI / 4;
  //   }
  // }
  
  // chomp() {
  //   // Controla la apertura y cierre de la boca
  //   if (this.radians < Math.PI / 36 || this.radians > Math.PI / 4) {
  //     if (this.isEating) {
  //       // Sonido o acción cuando el pez come (opcional)
  //       this.openRate = -this.openRate; 
  //     }
  //   }
  //   this.radians += this.openRate; // Ajusta la apertura de la boca
  // }
  
  // checkRotation() {
  //   // Ajustar la rotación según la dirección en la que el pez se mueve
  //   if (this.velocity.x > 0) this.rotation = 0; // Movimiento hacia la derecha
  //   else if (this.velocity.x < 0) this.rotation = Math.PI; // Movimiento hacia la izquierda
  //   else if (this.velocity.y > 0) this.rotation = Math.PI / 2; // Movimiento hacia abajo
  //   else if (this.velocity.y < 0) this.rotation = (Math.PI * 3) / 2; // Movimiento hacia arriba
  // }
  
  // shrink(ctx) {
  //   // El pez se encoge (o abre la boca mientras se encoge)
  //   this.draw(ctx);
  //   this.radians += this.shrinkRate; // Modifica el ángulo de la boca mientras se reduce
  // }
  
  // reset() {
  //   // Reiniciar el estado del pez
  //   this.position = { ...this.originalPosition };
  //   this.velocity = { ...this.originalVelocity };
  //   this.radians = Math.PI / 4; // Estado inicial de la boca
  //   this.openRate = Math.PI / 36; // Velocidad de apertura/cierre inicial
  //   this.rotation = 0; // Sin rotación inicial
  // }

  draw(ctx) {
    ctx.save();
  
    // Trasladar y rotar al pez
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.rotation);
    ctx.translate(-this.position.x, -this.position.y);
  
    // Cuerpo del pez (elipse más estilizada)
    ctx.beginPath();
    ctx.ellipse(this.position.x, this.position.y, this.radius * 2, this.radius, 0, 0, Math.PI * 2);
    ctx.fillStyle = "lightblue"; // Color del pez
    ctx.fill();
    ctx.strokeStyle = "black"; // Contorno del pez
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  
    // Boca del pez (simple curva)
    ctx.beginPath();
    ctx.arc(
      this.position.x + this.radius * 1.5, 
      this.position.y, 
      this.radius * 0.6, // Tamaño aumentado de la boca
      this.radians, 
      Math.PI * 2 - this.radians
    );
    ctx.lineTo(this.position.x + this.radius * 1.5, this.position.y); 
    ctx.fillStyle = "white"; // Color de la boca
    ctx.fill();
    ctx.closePath();
  
    // Ojo del pez (grande y expresivo)
    ctx.beginPath();
    ctx.arc(this.position.x + this.radius * 0.8, this.position.y - this.radius / 2, this.radius / 4, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
  
    // Pupila del ojo
    ctx.beginPath();
    ctx.arc(this.position.x + this.radius * 0.8, this.position.y - this.radius / 2, this.radius / 8, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
  
    // Escamas decorativas (varios semicírculos)
    for (let i = 0; i < 3; i++) { // Reducido a 3 para una apariencia más simple
      ctx.beginPath();
      ctx.arc(
        this.position.x - this.radius * (i - 0.5), 
        this.position.y, 
        this.radius / 5, 
        Math.PI, 
        Math.PI * 2
      );
      ctx.strokeStyle = "white";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.closePath();
    }
  
    // Aleta trasera (triángulo más grande)
    ctx.beginPath();
    ctx.moveTo(this.position.x - this.radius * 2.2, this.position.y); // Punto en el centro trasero del pez
    ctx.lineTo(this.position.x - this.radius * 3, this.position.y - this.radius); // Esquina superior del triángulo
    ctx.lineTo(this.position.x - this.radius * 3, this.position.y + this.radius); // Esquina inferior del triángulo
    ctx.closePath(); // Cierra el triángulo
    ctx.fillStyle = "lightblue";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
  
    // Aletas superiores (curvas decorativas)
    ctx.beginPath();
    ctx.moveTo(this.position.x - this.radius, this.position.y - this.radius * 0.8);
    ctx.lineTo(this.position.x - this.radius * 0.5, this.position.y - this.radius * 1.2);
    ctx.lineTo(this.position.x, this.position.y - this.radius * 0.8);
    ctx.fillStyle = "lightblue";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
  
    ctx.restore();
  }
  
  update(ctx) {
    this.checkRotation();
    this.draw(ctx);
  
    // Actualizar la posición del pez
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  
    // Si el pez se está moviendo, hace "chomp" (abrir y cerrar la boca)
    if (this.velocity.x !== 0 || this.velocity.y !== 0) {
      this.chomp();
    } else {
      // Si no se mueve, la boca se mantiene en una posición semiabierta
      this.radians = Math.PI / 4;
    }
  }
  
  chomp() {
    // Controla la apertura y cierre de la boca
    if (this.radians < Math.PI / 4 || this.radians > Math.PI / 2) { // Rango de apertura aumentado
      if (this.isEating) {
        // Sonido o acción cuando el pez come (opcional)
        this.openRate = -this.openRate; 
      }
    }
    this.radians += this.openRate; // Ajusta la apertura de la boca
  }
  checkRotation() {
    // Ajustar la rotación según la dirección en la que el pez se mueve
    if (this.velocity.x > 0) this.rotation = 0; // Movimiento hacia la derecha
    else if (this.velocity.x < 0) this.rotation = Math.PI; // Movimiento hacia la izquierda
    else if (this.velocity.y > 0) this.rotation = Math.PI / 2; // Movimiento hacia abajo
    else if (this.velocity.y < 0) this.rotation = (Math.PI * 3) / 2; // Movimiento hacia arriba
  }
  
  shrink(ctx) {
    // El pez se encoge (o abre la boca mientras se encoge)
    this.draw(ctx);
    this.radians += this.shrinkRate; // Modifica el ángulo de la boca mientras se reduce
  }
  
  reset() {
    // Reiniciar el estado del pez
    this.position = { ...this.originalPosition };
    this.velocity = { ...this.originalVelocity };
    this.radians = Math.PI / 4; // Estado inicial de la boca
    this.openRate = Math.PI / 36; // Velocidad de apertura/cierre inicial
    this.rotation = 0; // Sin rotación inicial
  }
}
