function Game(gameDiv) {
    var frames = [];
    var framesNames = [];

    for (var i = 0; i < gameDiv.childNodes.length; i++) {
        var id = gameDiv.childNodes[i].id;
        if (id !== undefined) {
            var child = gameDiv.childNodes[i];
            if (child.classList.contains("frame")) {
                frames[id] = child;
                framesNames.push(id);
            }
        }
    }
    function setFrameVisible(name) {
        frames[name].classList.remove("hidden");
        frames[name].classList.add("visible");
    }

    function setFrameHidden(name) {
        frames[name].classList.remove("visible");
        frames[name].classList.add("hidden");
    }

    return {
        "setFrameVisible": setFrameVisible,
        "setFrameHidden": setFrameHidden
    };
}

window.addEventListener("load", function () {
    game = new Game(document.getElementById("game"));
});

var game;
//Fin menú
                
                
//InicioCanvas
window.addEventListener("resize", resizeCanvas, false);
window.addEventListener("DOMContentLoaded", onLoad, false);
            
            
window.requestAnimationFrame = 
window.requestAnimationFrame       || 
window.webkitRequestAnimationFrame || 
window.mozRequestAnimationFrame    || 
window.oRequestAnimationFrame      || 
window.msRequestAnimationFrame     || 
function (callback) {
    window.setTimeout(callback, 50);
};
            
var Nivel = 0,frameCount = 0, currentFPS = 0, timeFrame = new Date().getTime();
var punt= 0, punts= [], div, div2, div3, info, score, canvas, ctx, ctx2, w, h, particles = [], Timinas = [], Adeninas = [], Guaninas = [], Uracilos = [], Citosinas = [], images = [], probability = 0,
xPoint, yPoint;
var pause = true,tecla = 38, direction=null, MSN = false, buttt= false;
var context, particles2 = [], xPoint2, yPoint2, down;
var img = new Image(),img1 = new Image(),img2 = new Image(),img3 = new Image(),img4 = new Image(), cpu = new Image(), images = [] ;
var ll1, ll2, ll3, ll4, ll5 , ll6 ,ll7 , ll8 , ll9 , ll10 , ll11 , ll12;
var prov = 0.05, vvx=2,vvy=2, pnt = 15, pts =0, apts =0, gan = 0, velC = 10, p = 0;
var Audl1, imglvl;
img.src = "img/Adenina.png";
img1.src = "img/Citosina.png";
img2.src = "img/Guanina.png";
img3.src = "img/Timina.png";
img4.src = "img/Uracilo.png";
cpu.src = "img/cpu.png";
        
ll1 = "img/ll1.png";
ll2 = "img/ll2.png";
ll3 = "img/ll3.png";
ll4 = "img/ll4.png";
ll5 = "img/ll5.png";
ll6 = "img/ll6.png";
ll7 = "img/ll7.png";
ll8 = "img/ll8.png";
ll9 = "img/ll9.png";
ll10 = "img/ll10.png";
ll11 = "img/ll11.png";
ll12 = "img/ll12.png";
        
        
function onLoad() {
    document.getElementById('in').play();
    imglvl = document.getElementById("imglvl");
    Audl1 = document.getElementById("l1");
    score = document.getElementById("score");
    div = document.getElementById("title");
    div2 = document.getElementById("canvas");
    div3 = document.getElementById("highs");
    canvas = document.getElementById("canvasGame");
    canvas.addEventListener("mousemove", movePoint, false);
    canvas.addEventListener("mouseup", mouseUp, false);
    canvas.addEventListener("mouseout", mouseUp, false);
    div2.addEventListener("mousedown", mouseDown, false);
    div2.addEventListener("mousewheel", mouseWheel, false);
    context = canvas.getContext("2d");
    ctx = canvas.getContext("2d");
    resizeCanvas();
    xPoint2 = w / 2 - 50;
    yPoint2 = h / 2 - 50;

    if (buttt === false) {
        buttt = true;
        alert('Controles:\nP = <iniciar o pausar>\nClick = <Iniciar recoleccion>\nFlechas = <Movimiento>\nScroll(rueda del mouse) = <Frecuencia de luces y velocidad>\n\nObjetivo: \nProcesar todas las bases nitrogenadas, creando aminoacidos \nque conformen la cadena mas larga de ADN en el proceso de sintesis de proteinas.');
    }
    var tx = document.createTextNode("Puntuacion mas alta:\n0 pts");
    div3.replaceChild(tx, div3.childNodes[0]);

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = "#FFFFFF";
    x = w / 2 - 15;
    y = h / 2 - 15;
    ctx.fillRect(x, y, 30, 30);
    ctx.globalCompositeOperation = 'lighter';
    ctx.save();
    window.requestAnimationFrame(updateWorld);
}// fin de onLoad();

function updateWorld() {
    if (juego() === false) {
        paintt(ctx);
        updateFPS();
        update();
        updateBases2();
        paint();
        paintScore();
    }
    window.requestAnimationFrame(updateWorld);
} // fin de update();
function juego() {
    if (tecla === 80) {
        if (!pause) {
            Audl1.pause();
            pause = true;
            document.getElementById("min").play();
            div.style.opacity = "100";
            div.style.zIndex = "1";
            div.style.WebkitTransition = "1s";
            div.focus();
            div2.style.opacity = "0";
            div2.style.zIndex = "0";
            div2.style.WebkitTransition = "0s";
            tecla = null;
            return true;
        }
        else {
            pause = false;
            Audl1.play();
            tecla = 38;
            if (div2.style.opacity < 0.5) {
                div2.style.opacity = '100';
                div2.style.zIndex = '1';
                div2.style.WebkitTransition = '1s';
                div2.focus();
                div.style.opacity = '0';
                div.style.zIndex = '0';
                div.style.WebkitTransition = '0s';
                document.getElementById('main').style.opacity = '0';
                document.getElementById('main').style.zIndex = '0';
                document.getElementById('main').style.WebkitTransition = '0s';
            }
            return false;
        }
    }
    else if (!pause) {
        if (tecla === 37) {
            direction = 0;
        }
        else if (tecla === 38) {
            direction = 1;
        }
        else if (tecla === 39) {
            direction = 2;
        }
        else if (tecla === 40) {
            direction = 3;
        }
        if (direction === 0) {
            x -= velC;
        }
        else if (direction === 1) {
            y -= velC;
        }
        else if (direction === 2) {
            x += velC;
        }
        else if (direction === 3) {
            y += velC;
        }
        if (x >= w - 30) {
            x = 0;
        }
        else if (x <= 0) {
            x = w - 30;
        }
        if (y >= h - 30) {
            y = 0;
        }
        else if (y <= 0) {
            y = h - 30;
        }
        return false;
    }
    return true;
}
function paintt(ctx) {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#FFFFFF)";
    paintImage();
    ctx.drawImage(cpu, x, y, 30, 30);
}

//Teclado
document.addEventListener("keydown",function(evento){tecla=evento.keyCode;},false);
            
function updateFPS() {
    var currentFrame = new Date().getTime();
    if (currentFrame - timeFrame >= 1000) {
        currentFps = frameCount;
        frameCount = 0;
        timeFrame = currentFrame;
        paintFPS();
    }
    frameCount++;
} // fin de updateFPS();
        
function paintFPS() {
    var divFps = document.getElementById("fps");
    var tx = document.createTextNode("FPS: " + currentFps);
    divFps.replaceChild(tx, divFps.childNodes[0]);
} // fin de paintFPS();
function paintScore() {
    var tx = document.createTextNode("Puntuacion: " + punt);
    score.replaceChild(tx, score.childNodes[0]);
} // fin de paintFPS();
function mouseDown(e) {
    down = true;
    movePoint(e);
    createFirework();
} // fin de moveDown(e);
function mouseUp() {
    down = false;
} // fin de mouseUp();
function mouseWheel(e) {
    e = e || window.event;
    if (e.wheelDelta > 0) {
        velC++;
        probability += 0.01;
    } else {
        probability -= 0.01;
        velC--;
        probability = probability < 0 ? 0 : probability;
        velC = velC < 0 ? 0 : velC;
    }
} // fin dw mouseWheel();
function resizeCanvas() {
    if (!!canvas) {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
} // fin de resizeCanvas();
function update() {
    if (particles.length < 500 && Math.random() < probability) {
        createFirework();
    }
    var alive = [];
    for (var i = 0; i < particles.length; i++) {
        if (particles[i].move()) {
            alive.push(particles[i]);
        }
    }
    particles = alive;
} // fin de update();
function paintImage() {
    switch (Nivel) {
        case 1:
            imglvl.src = ll1;
            break
        case 2:
            imglvl.src = ll2;
            break;
        case 3:
            imglvl.src = ll3;
            break
        case 4:
            imglvl.src = ll4;
            break;
        case 5:
            imglvl.src = ll5;
            break;
        case 6:
            imglvl.src = ll6
            break;
        case 7:
            imglvl.src = ll7;
            break;
        case 8:
            imglvl.src = ll8;
            break;
        case 9:
            imglvl.src = ll9;
            break;
        case 10:
            imglvl.src = ll10;
            break;
        case 11:
            imglvl.src = ll11;
            break;
        case 12:
            imglvl.src = ll12;
            break;

        default:
            break;
    }
} // fin de paint();
function paint() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    for (var i = 0; i < particles.length; i++) {
        particles[i].draw(ctx);
    }
} // fin de paint();
function createFirework() {
    document.getElementById('artf').play();
    xPoint = Math.random() * (w - 200) + 100;
    yPoint = Math.random() * (h - 200) + 100;
    var nFire = Math.random() * 50 + 100;
    var c = "rgb(" + (~~(Math.random() * 200 + 55)) + ","
         + (~~(Math.random() * 200 + 55)) + "," + (~~(Math.random() * 200 + 55)) + ")";
    for (var i = 0; i < nFire; i++) {
        var particle = new Particle();
        particle.color = c;
        var vy = Math.sqrt(25 - particle.vx * particle.vx);
        if (Math.abs(particle.vy) > vy) {
            particle.vy = particle.vy > 0 ? vy : -vy;
        }
        particles.push(particle);
    }
} // fin de createParticles();
function Particle() {
    this.w = this.h = Math.random() * 6 + 1;
    // Position
    this.x = xPoint - this.w / 2;
    this.y = yPoint - this.h / 2;
    // Velocidades x e y entre -5 y +5
    this.vx = (Math.random() - 0.5) * 10;
    this.vy = (Math.random() - 0.5) * 10;
    // Tiempo de vida
    this.alpha = Math.random() * .5 + .5;
    // color
    this.color;
} // fin de Particle();
Particle.prototype = {
    gravity: 0.05,
    move: function () {
        this.x += this.vx;
        this.vy += this.gravity;
        this.y += this.vy;
        this.alpha -= 0.01;
        if (this.x <= -this.w || this.x >= screen.width ||
            this.y >= screen.height ||
            this.alpha <= 0) {
            return false;
        }
        return true;
    },
    draw: function (c) {
        c.save();
        c.beginPath();

        c.translate(this.x + this.w / 2, this.y + this.h / 2);
        c.arc(0, 0, this.w, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.globalAlpha = this.alpha;

        c.closePath();
        c.fill();
        c.restore();
    }
} // fin de Particle.prototype;

function movePoint(e) {
    if (down) {
        var ie = navigator.userAgent.toLowerCase().indexOf('msie') !== -1;
        if (ie) {
            e = window.event;
            e.pageX = e.clientX + window.pageXOffset;
            e.pageY = e.clientY + window.pageYOffset;
        }
        xPoint2 = e.pageX - canvas.offsetLeft;
        yPoint2 = e.pageY - canvas.offsetTop;
    }
}
        
function updateBases2() {
    if (Math.random() < prov / 5) {
        xPoint2 = Math.random() * (w - 200) + 50;
        yPoint2 = Math.random() * (h - 200) + 50;
    }
    if (Math.random() < prov) {
        var p = new Particle2();
        p.x = xPoint2;
        p.y = yPoint2;
        particles2.push(p);
    }
    if (prov >= 1) {
        var p = new Particle2();
        p.x = Math.random() * (w - 200) + 50;
        p.y = Math.random() * (h - 200) + 50;
        particles2.push(p);
    }
    if (prov > 1) {
        var p = new Particle2();
        p.x = Math.random() * (w - 200) + 50;
        p.y = Math.random() * (h - 200) + 50;
        particles2.push(p);
    }
    if (Math.random() * 100 <= 20) {
        images.push(img);
    }
    else if (Math.random() * 100 <= 40) {
        images.push(img1);
    }
    else if (Math.random() * 100 <= 60) {
        images.push(img2);
    }
    else if (Math.random() * 100 <= 80) {
        images.push(img3);
    }
    else if (Math.random() * 100 <= 100) {
        images.push(img4);
    }
    moveParticles2();
    paint2();
    
    window.requestAnimationFrame(update);
} // fin de update();
function moveParticles2() {
    var alive = [];
    var Imags = [];
    var bool = true;
    var N
    for (var i = 0; i < particles2.length; i++) {
        if (particles2.length > 0) {
            try {
                 N = particles2[i].move();
            }
            catch (e) { 
                N = 5;
            }
            if (N === 2) {
                alive.push(particles2[i]);
                Imags.push(images[i]);
            }
            else if (N === 1) {
                gan++;
                document.getElementById('mon').play();
                punt++;
                
                if (punt >= pnt) {
                    Audl1.pause();
                    punts.push(punt);
                    pnt = pnt + 15;
                    document.getElementById('vid').play();
                    pause = true;
                    punt = 0;
                    prov = prov + 0.01;
                    vvx = vvx + 0.1;
                    vvy = vvy + 0.1;
                    if (Nivel < 13) {
                        bool = false;
                        limpiarArray();
                        alert("Has pasado de nivel!!\nOprime P para iniciar.");
                        centrarP();
                        Nivel++;
                        probability += 0.005;
                        velC++;
                        break;
                    }
                    else {
                        bool = false;
                        i = 0;
                        alert("Felicidades!, has ganado.");
                        punts.forEach(function (entry) { p += entry; }, this);
                        i = particles2.length;
                        reestar("Game over!\nNivel alcanzado: Maximo\nPuntaje: " + p + "\nBases nitrogenadas atrapadas: " + gan + "\nBases nitrogenadas perdidas: " + apts + "\nAminoacidos formados: " + gan / 3);
                        centrarP();
                        break;
                    }
                }
                
            }
            else if (N === 5) {
                    
            }
            else{
                    punt--;
                    apts++;

                    if (punt < 0) {
                        i = 0;
                        i = particles2.length;
                        bool = false;
                        punts.forEach(function (entry) { p += entry; }, this);
                        reestar("Game over!\nNivel alcanzado: " + Nivel + "\nPuntaje: " + p + "\nBases nitrogenadas atrapadas: " + gan + "\nBases nitrogenadas perdidas: " + apts + "\nAminoacidos formados: " + gan / 3 + "\n\nOprime P para reiniciar.");
                        break;
                    }
            }

        }
    }
    if (bool === true) {
        particles2 = alive;
        images = Imags;
    }

} // fin de moveParticles();
function reestar(Mensaje) {
    Audl1.pause();
    imglvl.src = "img/fire.png";
    document.getElementById('gov').play();
    document.getElementById('main').style.opacity = '100';
    document.getElementById('main').style.zIndex = '1';
    document.getElementById('main').style.WebkitTransition = '1s';
    document.getElementById('main').focus();
    document.getElementById('canvas').style.opacity = '0';
    document.getElementById('canvas').style.zIndex = '0';
    document.getElementById('canvas').style.WebkitTransition = '0s';
    alert(Mensaje);
    pnt = 15;
    pause = true;
    limpiarArray();
    punts.length = 0;
    punt = 0;
    prov = 0.05;
    probability = 0;
    vvx = 2;
    vvy = 2;
    Nivel = 0;
    apts = 0;
    gan = 0;
    nivel = 1;
    velC = 10;
    centrarP()
    context.fillStyle = "#FFFFFF)";
    context.fillRect(0, 0, w, h);
    if (p > pts) {
        pts = p;
        var tx = document.createTextNode("Puntuacion mas alta:\n-" + pts + " pts");
        div3.replaceChild(tx, div3.childNodes[0]);
    }
}
function limpiarArray()
{
    var ngg = [];
    images = ngg;
    particles2 = ngg;
    images.lenght = 0;
    particles2.lenght = 0;
}
function centrarP()
{
    x = w / 2 - 15;
    y = h / 2 - 15;
    xPoint2 = w / 2 - 50;
    yPoint2 = h / 2 - 50;
}
function paint2() {
    context.fillStyle = "#FFFFFF)";
    context.fillRect(0, 0, w, h);
    for (var i = 0; i < particles2.length; i++) {
        if(particles2.length > 0)
        {
            try{
        context.drawImage(images[i], particles2[i].x, particles2[i].y, 100, 100);
    }
    catch(e){}
    }
    }
} // fin de paint();
        
function Particle2() {
    this.x = 0;
    this.y = 0;
    this.vx = (Math.random() - 0.5) * vvx;
    this.vy = (Math.random() - 0.5) * vvy;
    /*this.color = "rgb("+(~~(Math.random()*255))+","
        +(~~(Math.random()*255))+","+(~~(Math.random()*255))+")";*/
} // fin de Particle();
        
Particle2.prototype = {
    move: function () {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x <= -50 || this.y <= -50 || this.x >= w - 50 ||
            this.y >= h - 50 ||
            this.alpha <= 0) {
            return 0;
        }
        else if (this.y + 100 >= y && this.y <= y + 30 && x <= this.x + 100 && x + 30 >= this.x) {
            return 1;
        }
        else
        {
        return 2;
    }
    }
} // fin de Particle.prototype;


