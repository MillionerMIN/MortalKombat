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
  changHP: changeHP,
  elHP: elHP,
  renderHP: renderHP,
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
  changHP: changeHP,
  elHP: elHP,
  renderHP: renderHP,
};

const createElement = (tag, className) => {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }
  return $tag;
};

function createReloadButton() {
  const $reloadWrap = createElement('div', 'reloadWrap');
  const $reloadButton = createElement('button', 'button');
  $reloadButton.innerHTML = 'Restart';
  $reloadWrap.appendChild($reloadButton);
  $reloadButton.addEventListener('click', () => {
    window.location.reload();
  })
  return $reloadWrap
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

function changeHP(number) {
  this.hp -= number;
  if (this.hp < 0) {
    this.hp = 0;
  }
  console.log(this.hp);
}

function elHP() {
  return document.querySelector(`.player${this.player} .life`);
}

function renderHP() {
  this.elHP().style.width = this.hp + '%';
}

function playerWin(name) {
  const $winTitle = createElement('div', 'winTitle');
  if (name) {
    $winTitle.innerHTML = name + ' win';
  } else {
    $winTitle.innerHTML = 'Draw - strongest will win';
  }
  return $winTitle;
}

function randomNum(number) {
  return Math.floor(Math.random() * (number - 1) + 1);
}

$randomButton.addEventListener('click', () => {
  player1.changHP(randomNum(20));
  player2.changHP(randomNum(20));
  player1.elHP();
  player2.elHP();
  player1.renderHP();
  player2.renderHP();

  if (player1.hp === 0 || player2.hp === 0) {
    $randomButton.disabled = true;
    $arenas.appendChild(createReloadButton());
  }
  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(playerWin(player2.name));
  } else if (player2.hp === 0 && player1.hp > player2.hp) {
    $arenas.appendChild(playerWin(player1.name));
  } else if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(playerWin());
  }
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));