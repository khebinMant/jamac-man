import Animator from "./animator/animator";
import PelletManager from "../physics/pellets/pelletManager";
import GhostCollision from "../physics/ghosts/collisions/ghostCollision";

export default class Graphics {
  static displayScore(ctx, variables) {
    ctx.fillStyle = "cyan";
    ctx.textAlign = "left";
    ctx.fillText(`Puntaje: ${variables.score}`, 10, 15);
  }

  static displayLevel(ctx, variables) {
    ctx.fillStyle = "cyan";
    ctx.textAlign = "center";
    ctx.fillText(`Nivel ${variables.level}`, 300, 15);
  }

  static displayLives(ctx, pacman, drawPacmanIcon = Graphics.drawPacmanIcon, variables) {
    if (pacman.lives >= 1)
      drawPacmanIcon(ctx, {
        x: 580,
        y: 15,
      });
    if (pacman.lives >= 2)
      drawPacmanIcon(ctx, {
        x: 540,
        y: 15,
      });
  }

  static drawPacmanIcon(ctx, position) {

    const rotation = 0
    const radius = (32 * 3) / (8 * 2.5) 
    ctx.save();
  
    // Trasladar y rotar al pez
    ctx.translate(position.x, position.y);
    ctx.rotate(rotation);
    ctx.translate(-position.x, -position.y);
  
    // Cuerpo del pez (elipse más estilizada)
    ctx.beginPath();
    ctx.ellipse(position.x, position.y, radius * 2.5, radius * 1.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = "lightblue"; // Color del pez
    ctx.fill();
    ctx.strokeStyle = "black"; // Contorno del pez
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  
    // Boca del pez (simple curva)
    ctx.beginPath();
    ctx.arc(
      position.x + radius * 1.8, 
      position.y, 
      radius / 2, 
      0, // Cambiar a 0 para una boca abierta
      Math.PI * 2
    );
    ctx.lineTo(position.x + radius * 1.8, position.y); 
    ctx.fillStyle = "white"; // Color de la boca
    ctx.fill();
    ctx.closePath();
  
    // Ojo del pez (grande y expresivo)
    ctx.beginPath();
    ctx.arc(position.x + radius, position.y - radius / 2, radius / 2, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
  
    // Pupila del ojo
    ctx.beginPath();
    ctx.arc(position.x + radius, position.y - radius / 2, radius / 4, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
  
    // Escamas decorativas (varios semicírculos)
    for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.arc(
            position.x - radius * (i - 0.5), 
            position.y, 
            radius / 3, 
            Math.PI, 
            Math.PI * 2
        );
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
    }
  
    // Aleta trasera (triángulo)
    ctx.beginPath();
    ctx.moveTo(position.x - radius * 2.5, position.y); // Punto en el centro trasero del pez
    ctx.lineTo(position.x - radius * 3, position.y - radius); // Esquina superior del triángulo
    ctx.lineTo(position.x - radius * 3, position.y + radius); // Esquina inferior del triángulo
    ctx.closePath(); // Cierra el triángulo
    ctx.fillStyle = "lightblue";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
  
    // Aletas superiores (curvas decorativas)
    ctx.beginPath();
    ctx.moveTo(position.x - radius * 1.5, position.y - radius * 1.2);
    ctx.lineTo(position.x - radius, position.y - radius * 1.8);
    ctx.lineTo(position.x - radius * 0.5, position.y - radius * 1.2);
    ctx.fillStyle = "lightblue";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
  
    ctx.restore();
  }

  static runLevelUpAnimation(
    variables,
    assets,
    ctx,
    runLevelUpAnimation = Graphics.runLevelUpAnimation
  ) {
    variables.animationId = requestAnimationFrame(() =>
      runLevelUpAnimation(variables, assets, ctx)
    );
    if (performance.now() - variables.startTime >= variables.frameLifetime) {
      Animator.drawLevelUpBoard(ctx, assets.props.boundaries);
      if (variables.levelUpCount % 10 === 0 && variables.levelUpCount !== 0)
        assets.props.boundaries.forEach((boundary) => boundary.flash());
      variables.levelUpCount++;
      if (variables.levelUpCount >= 350) {
        assets.characters.pacman.isLevellingUp = false;
        cancelAnimationFrame(variables.animationId);
        variables.level++;
        PelletManager.resetAfterLevelUp(assets, variables);
      }
      variables.startTime = performance.now();
    }
  }

  static runDeathAnimation(
    variables,
    ctx,
    assets,
    runDeathAnimation = Graphics.runDeathAnimation
  ) {
    variables.animationId = requestAnimationFrame(() =>
      runDeathAnimation(variables, ctx, assets)
    );
    if (performance.now() - variables.startTime >= variables.frameLifetime) {
      Animator.drawBoard(ctx, assets);
      const pacman = assets.characters.pacman;
      if (pacman.radians < Math.PI) {
        pacman.shrink(ctx);
      } else {
        pacman.isShrinking = false;
        cancelAnimationFrame(variables.animationId);
        GhostCollision.checkPacmanLives(assets, variables, ctx);
      }
      variables.startTime = performance.now();
    }
  }
}
