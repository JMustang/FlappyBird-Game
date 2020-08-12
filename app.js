console.log('Flappy Bird game');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

//plano de fundo
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha() {
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0, 0, canvas.width, canvas.height)

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        );
        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
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
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.x, chao.y,
            chao.largura, chao.altura,
        );
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            (chao.x + chao.largura), chao.y,
            chao.largura, chao.altura,
        );
    },
};

//passaro
const bird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 30,
    y: 65,
    gravidade: 0.5,
    velocidade: 0,
    atualiza() {
        bird.velocidade = bird.velocidade + bird.gravidade;
        bird.y = bird.y + bird.velocidade;
    },

    desenha() {
        contexto.drawImage(
            sprites,
            bird.spriteX, bird.spriteY,
            bird.largura, bird.altura,
            bird.x, bird.y,
            bird.largura, bird.altura,
        );
    }
}
//tela get ready
const getReady = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            getReady.spriteX, getReady.spriteY,
            getReady.largura, getReady.altura,
            getReady.x, getReady.y,
            getReady.largura, getReady.altura,
        );
    },
};


//
// [Telas]
//

let telaAtiva = {};

function mudaParaTela(novaTela) {
    telaAtiva = novaTela;
};

const Telas = {
    INICIO: {
        desenha() {
            planoDeFundo.desenha();
            chao.desenha();
            bird.desenha();
            getReady.desenha();
        },
        click() {
            mudaParaTela(Telas.JOGO)
        },
        atualiza() {

        }
    },
};
Telas.JOGO = {
    desenha() {
        planoDeFundo.desenha();
        chao.desenha();
        bird.desenha();
    },
    atualiza() {
        bird.atualiza();
    }
};

function loop() {

    telaAtiva.desenha();
    telaAtiva.atualiza();

    requestAnimationFrame(loop);
}

window.addEventListener('click', function () {
    if (telaAtiva.click) {
        telaAtiva.click();
    }
});

mudaParaTela(Telas.INICIO);
loop();