
const zombieImages = [
    'zombie-1.png',
    'zombie-2.png',
    'zombie-3.png',
    'zombie-4.png',
    'zombie-5.png',
    'zombie-6.png',
  ];
  
  const gameBody = document.getElementById("game-body");
  const livesDisplay = document.getElementById("lives");
  const timerDisplay = document.getElementById("timer");
  let lives = 4;
  let timer = 30;
  let zombieId = 0;
  
  const shotgunSound = new Audio("./assets/shotgun.wav");
  gameBody.addEventListener("click", () => {
    shotgunSound.pause();
    shotgunSound.currentTime = 0;
    shotgunSound.play();
  });
  
  const backgroundSound = new Audio("./assets/bgm.mp3");
  backgroundSound.loop = true;
  backgroundSound.play();
  
  function makeZombie() {
    const newZombie = document.createElement('img');
    const randomImage = Math.floor(Math.random() * zombieImages.length);
    newZombie.src = `./assets/${zombieImages[randomImage]}`;
    newZombie.classList.add("zombie-image");
    newZombie.setAttribute("id", `zombie-${zombieId}`);
    newZombie.style.left = `${getRandomNum(10, 90)}vw`;
    newZombie.style.animationDuration = `${getRandomNum(2, 10)}s`;
    newZombie.onclick = () => {
      destroyZombie(newZombie);
    };
    gameBody.appendChild(newZombie);
    zombieId++;
  }
  
  function destroyZombie(zombie) {
    zombie.style.display = "none";
    makeZombie();
  }
  
  function missed(zombie) {
    if (zombie.getBoundingClientRect().top <= 0) {
      lives--;
      livesDisplay.textContent = lives;
      return true;
    } else {
      return false;
    }
  }
  
  function startGame() {
    const gameTimer = setInterval(() => {
      timer--;
      timerDisplay.textContent = timer;
      if (timer <= 0) {
        clearInterval(gameTimer);
        if (lives <= 0) {
          location.href = "./game-over.html";
        } else {
          location.href = "./win.html";
        }
      }
      let zombie = document.getElementById(`zombie-${zombieId}`);
      if (zombie && missed(zombie)) {
        destroyZombie(zombie);
      }
    }, 1000);
  
    makeZombie();
  }
  
  function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  startGame();