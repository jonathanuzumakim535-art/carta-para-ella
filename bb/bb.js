// ===== CANVAS =====
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ===== ESTRELLAS =====
let stars = [];
for(let i=0;i<900;i++){
    stars.push({
        x:Math.random()*canvas.width - canvas.width/2,
        y:Math.random()*canvas.height - canvas.height/2,
        z:Math.random()*canvas.width
    });
}

// ===== FOTOS =====
const fotosSrc = [
 "foto1.jpg","foto2.jpg","foto3.jpg","foto4.jpg",
 "foto5.jpg","foto6.jpg","foto7.jpg","foto8.jpg"
];

let fotos = fotosSrc.map(src=>{
    let img = new Image();
    img.src = src;
    return {
        img: img,
        x:Math.random()*800-400,
        y:Math.random()*600-300,
        z:Math.random()*canvas.width + canvas.width // aparecen después
    };
});

// ===== FRASES =====
const frases = [
 "Eres mi universo ✨",
 "Mi lugar favorito 💕",
 "Mi casualidad favorita",
 "Mi lugar seguro 🥺",
 "Mi persona favorita",
 "Mi paz y mi locura",
 "Te elegiría siempre 💫",
 "Te amo infinito ♾️"
];

let textos = frases.map(txt=>{
    return {
        text:txt,
        x:Math.random()*800-400,
        y:Math.random()*600-300,
        z:Math.random()*canvas.width + canvas.width
    };
});

function drawWarpObject(obj, drawFunc){
    obj.z -= 4; // velocidad viaje

    if(obj.z <= 0){
        obj.z = canvas.width;
        obj.x = Math.random()*800-400;
        obj.y = Math.random()*600-300;
    }

    let k = 128/obj.z;
    let x = obj.x*k + canvas.width/2;
    let y = obj.y*k + canvas.height/2;
    let scale = (1 - obj.z/canvas.width)*2;

    drawFunc(x,y,scale);
}

// ===== ANIMACIÓN PRINCIPAL =====
function animate(){
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // estrellas
    ctx.fillStyle="white";
    stars.forEach(star=>{
        drawWarpObject(star,(x,y,scale)=>{
            ctx.fillRect(x,y,scale*2,scale*2);
        });
    });

    // fotos
    fotos.forEach(foto=>{
        drawWarpObject(foto,(x,y,scale)=>{
            let size = 200*scale;
            ctx.drawImage(foto.img,x-size/2,y-size/2,size,size);
        });
    });

    // textos
    textos.forEach(txt=>{
        drawWarpObject(txt,(x,y,scale)=>{
            ctx.fillStyle="pink";
            ctx.font = `${40*scale}px Arial`;
            ctx.textAlign="center";
            ctx.fillText(txt.text,x,y);
        });
    });

    requestAnimationFrame(animate);
}

animate();