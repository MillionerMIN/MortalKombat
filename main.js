const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
  player: 1,
  name: 'SONYA',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
  weapon: ['sword'],
  attack: function () {
    console.log(`${this.name}` + ' Fight...');
  },
};

const player2 = {
  player: 2,
  name: 'LIU KANG',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
  weapon: ['hands'],
  attack: function () {
    console.log(`${this.name}` + ' Fight...');
  },
};

const createElement = (tag, className) => {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }
  return $tag;
}

const createPlayer = (playerObj) => {
  const $player = createElement('div', 'player' + playerObj.player);
  const $progressBar = createElement('div', 'progressbar');
  const $character = createElement('div', 'character');
  const $life = createElement('div', 'life');
  const $name = createElement('div', 'name');
  const $img = createElement('img');

  $life.style.width = playerObj.hp + '%';
  $name.innerHTML = playerObj.name;
  $img.src = playerObj.img;

  $player.appendChild($progressBar);
  $player.appendChild($character);
  $progressBar.appendChild($life);
  $progressBar.appendChild($name);
  $character.appendChild($img);

  return $player;
};

const changeHP = (player) => {
  const $playerHp = document.querySelector('.player' + player.player + ' .life');
  player.hp -= randomHP();
  if (player.hp < 0) {
    player.hp = 0;
  }
  $playerHp.style.width = player.hp + '%';
}

const playerLose = (name) => {
  const $loseTitle = createElement('div', 'loseTitle');
  $loseTitle.innerHTML = name + ' lose';
  return $loseTitle;
}

const playerWin = (name) => {
  const $winTitle = createElement('div', 'winTitle');
  if(name) {
    $winTitle.innerHTML = name + ' win';
  } else {
    $winTitle.innerHTML = 'Draw - strongest will win';
  }
  return $winTitle;
}

const randomHP = () => {
  return Math.floor(Math.random() * (20 - 1) + 1);
}

$randomButton.addEventListener('click', () => {
  changeHP(player2);
  changeHP(player1);

  if (player1.hp === 0 || player2.hp === 0) {
    $randomButton.disabled = true;
  } 
  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(playerWin(player2.name))
  } else if (player2.hp === 0 && player1.hp > player2.hp) {
    $arenas.appendChild(playerWin(player1.name)) 
  } else if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(playerWin());
  }
})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));