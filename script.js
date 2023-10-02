const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')

const start = document.querySelector('.start')
const gameOver = document.querySelector('.game-over')

const score = document.querySelector(".score");
let count = 0;

let jogoAtivo = true;

audioStart = new Audio('./src/audio/audio_theme.mp3')
audioGameOver = new Audio('./src/audio/audio_gameover.mp3')


const startGame = () => {
  pipe.classList.add('pipe-animation')
  start.style.display = 'none'

  // audio
  audioStart.play()
  jogoAtivo = true;
  loop();
}

const restartGame = () => {
  gameOver.style.display = 'none'
  pipe.style.left = ''
  pipe.style.right = '0'
  mario.src = './src/img/mario.gif'
  mario.style.width = '150px'
  mario.style.bottom = '0'

  start.style.display = 'none'

  audioGameOver.pause()
  audioGameOver.currentTime = 0;

  audioStart.play()
  audioStart.currentTime = 0;

  count = 0;

  score.innerHTML = `SCORE: ${count}`;

  jogoAtivo = true; 
  loop();

}

const jump = () => {
  if (!jogoAtivo) return;
  mario.classList.add('jump')

  setTimeout(() => {
    mario.classList.remove('jump')
  }, 800)
}

const loop = () => {
  const intervalId = setInterval(() => {
    if (!jogoAtivo) {
      clearInterval(intervalId); // Parar o loop quando o jogo não está ativo
      return;
    }
    const pipePosition = pipe.offsetLeft
    const marioPosition = window
      .getComputedStyle(mario)
      .bottom.replace('px', ' ')

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
      pipe.classList.remove('.pipe-animation')
      pipe.style.left = `${pipePosition}px`

      mario.classList.remove('.jump')
      mario.style.bottom = `${marioPosition}px`

      mario.src = './src/img/game-over.png'
      mario.style.width = '80px'
      mario.style.marginLeft = '50px'
      
      
      function stopAudioStart() {
        audioStart.pause()
      }
      stopAudioStart()
      
      audioGameOver.play()
      
      function stopAudio() {
        audioGameOver.pause()
      }
      setTimeout(stopAudio, 7000)
      
      gameOver.style.display = 'flex'
      jogoAtivo = false; // Marcar o jogo como inativo

      clearInterval(intervalId); 
    
    }
    count++;
    score.innerHTML = `SCORE: ${count}`;
  }, 10)
}


// Chamar a função startGame quando a tecla Enter for pressionada
document.addEventListener('keypress', e => {
  const tecla = e.key;
  if (tecla === 'Enter') {
    startGame();
  }
});

// Chamar a função restartGame quando a tecla Enter for pressionada
document.addEventListener('keypress', e => {
  const tecla = e.key;
  if (tecla === 'Enter') {
    restartGame();
  }
});

// Chamar a função jump quando a barra de espaço for pressionada
document.addEventListener('keypress', e => {
  const tecla = e.key;
  if (tecla === ' ') {
    jump();
  }
});

// Chamar a função jump quando a tela for tocada
document.addEventListener('touchstart', e => {
  if (e.touches.length) {
    jump();
  }
})