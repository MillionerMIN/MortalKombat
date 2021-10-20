const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = ['head', 'body', 'foot'];

const player1 = {
  player: 1,
  name: 'SONYA',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
  weapon: ['sword'],
  attack,
  changeHP,
  elHP,
  renderHP,
};

const player2 = {
  player: 2,
  name: 'LIU KANG',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
  weapon: ['hands'],
  attack,
  changeHP,
  elHP,
  renderHP,
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
  });
  return $reloadWrap;
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

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function enemyAttack() {
  const hit = ATTACK[randomNum(3) - 1];
  const defence = ATTACK[randomNum(3) - 1];

  return {
    value: randomNum(HIT[hit]),
    hit,
    defence,
  };
}

// не уверен в правильности этой функции, но както работает
function attack(attack, defence) {
  if (attack.hit !== defence.defence) {
    this.changeHP(attack.value);
    this.renderHP();
    // console.log(`####: ${this.player}`, this.hp);
  }
}

$formFight.addEventListener('submit', (e) => {
  e.preventDefault();

  const enemy = enemyAttack();
  const attack = {};

  for (let item of $formFight) {
    if (item.checked && item.name === 'hit') {
      attack.value = randomNum(HIT[item.value]);
      attack.hit = item.value;
    }
    if (item.checked && item.name === 'defence') {
      attack.defence = item.value;
    }
    item.checked = false;
  }
  // console.log('### enemy:', enemy.value);
  // console.log('### attack:', attack.value);

  player1.attack(enemy, attack);
  player2.attack(attack, enemy);

  // if (attack.hit !== enemy.defence) {
  //   player2.changeHP(attack.value);
  //   player2.renderHP();
  // }
  // if (enemy.hit !== attack.defence) {
  //   player1.changeHP(enemy.value);
  //   player1.renderHP();
  // }

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