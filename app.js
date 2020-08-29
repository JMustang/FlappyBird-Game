console.log("Flappy Bird game");

const sprites = new Image();
sprites.src = "./sprites.png";

const canvas = document.querySelector("canvas");
const contexto = canvas.getContext("2d");

//plano de fundo
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha() {
        contexto.fillStyle = "#70c5ce";
        contexto.fillRect(0, 0, canvas.width, canvas.height);

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX,
            planoDeFundo.spriteY,
            planoDeFundo.largura,
            planoDeFundo.altura,
            planoDeFundo.x,
            planoDeFundo.y,
            planoDeFundo.largura,
            planoDeFundo.altura
        );
        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX,
            planoDeFundo.spriteY,
            planoDeFundo.largura,
            planoDeFundo.altura,
            planoDeFundo.x + planoDeFundo.largura,
            planoDeFundo.y,
            planoDeFundo.largura,
            planoDeFundo.altura
        );
    },
};

//chao
const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    desenha() {
        contexto.drawImage(
            sprites,
            chao.spriteX,
            chao.spriteY,
            chao.largura,
            chao.altura,
            chao.x,
            chao.y,
            chao.largura,
            chao.altura
        );
        contexto.drawImage(
            sprites,
            chao.spriteX,
            chao.spriteY,
            chao.largura,
            chao.altura,
            chao.x + chao.largura,
            chao.y,
            chao.largura,
            chao.altura
        );
    },
};

function colisao(bird, chao) {
    const birdY = bird.y + bird.altura;
    const chaoY = chao.y;

    if (birdY >= chaoY) {
        return true;
    }
    return false;
}

//passaro
function criaBird() {
    const bird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        x: 65,
        y: 165,
        pulo: 7,
        pula() {
            bird.velocidade = -bird.pulo;
        },
        gravidade: 0.5,
        velocidade: 0,
        atualiza() {

            if (colisao(bird, chao)) {
                mudaParaTela(Telas.INICIO);
                return;
            }

            bird.velocidade = bird.velocidade + bird.gravidade;
            bird.y = bird.y + bird.velocidade;
        },

        desenha() {
            contexto.drawImage(
                sprites,
                bird.spriteX,
                bird.spriteY,
                bird.largura,
                bird.altura,
                bird.x,
                bird.y,
                bird.largura,
                bird.altura
            );
        },
    };
    return bird;
}


//tela get ready
const getReady = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    x: canvas.width / 2 - 174 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            getReady.spriteX,
            getReady.spriteY,
            getReady.largura,
            getReady.altura,
            getReady.x,
            getReady.y,
            getReady.largura,
            getReady.altura
        );
    },
};

//
// [Telas]
//
const globais = {};
let telaAtiva = {};

function mudaParaTela(novaTela) {
    telaAtiva = novaTela;
    if (telaAtiva.inicializa) {
        telaAtiva.inicializa();
    }
}

const Telas = {
    INICIO: {
        inicializa() {
            globais.bird = criaBird();
        },
        desenha() {
            planoDeFundo.desenha();
            chao.desenha();
            globais.bird.desenha();
            getReady.desenha();
        },
        click() {
            mudaParaTela(Telas.JOGO);
        },
        atualiza() {

        }
    }
};
Telas.JOGO = {
    desenha() {
        planoDeFundo.desenha();
        chao.desenha();
        globais.bird.desenha();
    },
    click() {
        globais.bird.pula();
    },
    atualiza() {
        globais.bird.atualiza();
    },
};

function loop() {
    telaAtiva.desenha();
    telaAtiva.atualiza();

    requestAnimationFrame(loop);
}

window.addEventListener("click", function () {
    if (telaAtiva.click) {
        telaAtiva.click();
    }
});

mudaParaTela(Telas.INICIO);
loop();