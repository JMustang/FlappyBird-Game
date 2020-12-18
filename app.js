console.log("Flappy Bird game");

const som_HIT = new Audio();
som_HIT.src = "./efeitos/hit.wav";

const som_PULO = new Audio();
som_PULO.src = "./efeitos/pulo.wav";

let frames = 0;
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

//[chao] function
criaChao = () => {
  const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    atualiza() {
      //[codigo para chao infinito]
      const movimentoDoChao = 1;
      const repeteEm = chao.largura / 2;
      const movimentacao = chao.x - movimentoDoChao;

      chao.x = movimentacao % repeteEm;
    },
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
  return chao;
};

//function
colisao = (bird, chao) => {
  const birdY = bird.y + bird.altura;
  const chaoY = chao.y;

  if (birdY >= chaoY) {
    return true;
  }
  return false;
};

//passaro
//function
criaBird = () => {
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
      if (colisao(bird, globais.chao)) {
        som_HIT.play();
        mudaParaTela(Telas.INICIO);
        return;
      }

      bird.velocidade = bird.velocidade + bird.gravidade;
      bird.y = bird.y + bird.velocidade;
    },

    movimentos: [
      {
        spriteX: 0,
        spriteY: 0,
      }, // asa pra cima
      {
        spriteX: 0,
        spriteY: 26,
      }, // asa no meio
      {
        spriteX: 0,
        spriteY: 52,
      }, // asa pra baixo
      {
        spriteX: 0,
        spriteY: 26,
      }, // asa no meio
    ],
    frameAtual: 0,

    //[movimentação do passaro]
    atualizaOFrameAtual() {
      const intervaloDeFrames = 10;
      const passouOIntervalo = frames % intervaloDeFrames === 0;
      if (passouOIntervalo) {
        const baseDoIncremento = 1;
        const incremento = baseDoIncremento + bird.frameAtual;
        const baseRepeticao = bird.movimentos.length;
        bird.frameAtual = incremento % baseRepeticao;
      }
    },

    desenha() {
      bird.atualizaOFrameAtual();
      const { spriteX, spriteY } = bird.movimentos[bird.frameAtual];

      contexto.drawImage(
        sprites,
        spriteX,
        spriteY,
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
};

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

//[função cria canos]
criaCanos = () => {
  const canos = {
    largura: 52,
    altura: 400,
    chao: {
      spriteX: 0,
      spriteY: 169,
    },
    ceu: {
      spriteX: 52,
      spriteY: 169,
    },
    espaco: 80,
    desenha() {
      canos.pares.forEach((par) => {
        const yRandom = par.y;
        const espacamentoEntreCanos = 90;

        const canoCeuX = par.x;
        const canoCeuY = yRandom;

        //[cano do ceu]
        contexto.drawImage(
          sprites,
          canos.ceu.spriteX,
          canos.ceu.spriteY,
          canos.largura,
          canos.altura,
          canoCeuX,
          canoCeuY,
          canos.largura,
          canos.altura
        );

        const canoChaoX = par.x;
        const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;

        //[cano do chao]
        contexto.drawImage(
          sprites,
          canos.chao.spriteX,
          canos.chao.spriteY,
          canos.largura,
          canos.altura,
          canoChaoX,
          canoChaoY,
          canos.largura,
          canos.altura
        );

        par.canoCeu = {
          x: canoCeuX,
          y: canos.altura + canoCeuY,
        };
        par.canoChao = {
          x: canoChaoX,
          y: canoChaoY,
        };
      });
    },
    temColisaoComBird(par) {
      const cabecaDoBird = globais.bird.y;
      const peDoBird = globais.bird.y + globais.bird.altura;

      if (globais.bird.x >= par.x) {
        if (cabecaDoBird <= par.canoCeu.y) {
          return true;
        }
        if (peDoBird >= par.canoChao.y) {
          return true;
        }
      }

      return false;
    },
    pares: [],
    atualiza() {
      const passou100Frames = frames % 100 === 0;
      if (passou100Frames) {
        canos.pares.push({
          x: canvas.width,
          y: -150 * (Math.random() + 1),
        });
      }

      canos.pares.forEach((par) => {
        par.x = par.x - 2;

        if (canos.temColisaoComBird(par)) {
          mudaParaTela(Telas.INICIO);
        }

        if (par.x + canos.largura <= 0) {
          canos.pares.shift();
        }
      });
    },
  };

  return canos;
};

// Placar
function criaPlacar() {
  const placar = {
    pontuacao: 0,
    desenha() {
      contexto.font = "10px 'Press Start 2P'";
      contexto.textAlign = "right";
      contexto.fillStyle = "black";
      contexto.fillText(`${placar.pontuacao}`, canvas.width - 30, 35);
    },
    atualiza() {
      const intervaloDeFrames = 20;
      const passouOIntervalo = frames % intervaloDeFrames === 0;

      if (passouOIntervalo) {
        placar.pontuacao = placar.pontuacao + 1;
      }
    },
  };
  return placar;
}

// [Telas]
const globais = {};
let telaAtiva = {};

//function
mudaParaTela = (novaTela) => {
  telaAtiva = novaTela;
  if (telaAtiva.inicializa) {
    telaAtiva.inicializa();
  }
};

const Telas = {
  INICIO: {
    inicializa() {
      globais.bird = criaBird();
      globais.chao = criaChao();
      globais.canos = criaCanos();
    },
    desenha() {
      planoDeFundo.desenha();
      globais.bird.desenha();

      globais.chao.desenha();
      getReady.desenha();
    },
    click() {
      mudaParaTela(Telas.JOGO);
    },
    atualiza() {
      globais.chao.atualiza();
    },
  },
};
Telas.JOGO = {
  inicializa() {
    globais.placar = criaPlacar();
  },
  desenha() {
    planoDeFundo.desenha();
    globais.canos.desenha();
    globais.chao.desenha();
    globais.bird.desenha();
    globais.placar.desenha();
  },
  click() {
    globais.bird.pula();
    som_PULO.play();
  },
  atualiza() {
    globais.canos.atualiza();
    globais.chao.atualiza();
    globais.bird.atualiza();
    globais.placar.atualiza();
  },
};

//function
loop = () => {
  telaAtiva.desenha();
  telaAtiva.atualiza();

  frames = frames + 1;
  requestAnimationFrame(loop);
};

//function
window.addEventListener("click", () => {
  if (telaAtiva.click) {
    telaAtiva.click();
  }
});

mudaParaTela(Telas.INICIO);
loop();
