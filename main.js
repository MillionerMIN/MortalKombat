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
  $playerHp.style.width = player.hp + '%';
  return player.hp
}

const playerLose = (name) => {
  const $loseTitle = createElement('div', 'loseTitle');
  $loseTitle.innerHTML = name + ' lose';
  return $loseTitle;
}

const playerWin = (name) => {
  const $winTitle = createElement('div', 'winTitle');
  $winTitle.innerHTML = name + ' win';
  return $winTitle;
}

const randomHP = () => {
  return Math.floor(Math.random() * (20 - 1) + 1);
}

$randomButton.addEventListener('click', () => {
  if (changeHP(player1) <= 0) {
    $arenas.appendChild(playerWin(player2.name))
    $randomButton.disabled = true
  } else if (changeHP(player2)<= 0) {
    $arenas.appendChild(playerWin(player1.name))
    $randomButton.disabled = true
  }
})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));