const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

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

function normalize(num) {
  return num.toString().length > 1 ? num : `0${num}`
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

function playerAttack() {
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
  return attack;
}

function generateLog(type, player1, player2) {
  const time = new Date();
  const index = randomNum(logs[type].length - 1);
  const correctTime = normalize(time.getHours()) + ':' + normalize(time.getMinutes());

  function whereLook(direction) {
    switch (direction) {
      case 'start':
        const start = logs.start.replace('[time]', correctTime).replace('[player1]', player1.name).replace('[player2]', player2.name);
        return `<p>${start}</p>`;
      case 'end':
        const end = logs.end[index].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
        return `<p>${end}</p>`;
      case 'hit':
        const hit = logs[type][index].replace('[playerKick]', player2.name).replace('[playerDefence]', player1.name);
        return `<p>${correctTime} - ${hit} - ${player1.hp}[${player1.hp}/100]</p>`;
      case 'defence':
        const defence = logs[type][index].replace('[playerKick]', player2.name).replace('[playerDefence]', player1.name);
        return `<p>${correctTime} - ${defence}</p>`; 
      default:
        const draw = logs[draw];
        return `<p>${draw}</p>`;
    }
  }

  $chat.insertAdjacentHTML('afterbegin', whereLook(type));
}

function comparisonResult() {
  if (player1.hp === 0 || player2.hp === 0) {
    $randomButton.disabled = true;
    $arenas.appendChild(createReloadButton());
  }
  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(playerWin(player2.name));
    generateLog('end', player2, player1);
  } else if (player2.hp === 0 && player1.hp > player2.hp) {
    $arenas.appendChild(playerWin(player1.name));
    generateLog('end', player1, player2);
  } else if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(playerWin());
    generateLog('draw');
  }
}

$formFight.addEventListener('submit', (e) => {
  e.preventDefault();

  const enemy = enemyAttack();
  const player = playerAttack();

  if (player.hit !== enemy.defence) {
    player1.changeHP(player.value);
    generateLog('hit', player1, player2);
    player1.renderHP();
  }
  if (enemy.hit !== player.defence) {
    player2.changeHP(enemy.value);
    generateLog('hit', player2, player1);
    player2.renderHP();
  }
  if(player.hit === enemy.defence) {
    generateLog('defence', player2, player1)
  }
  if (enemy.hit === player.defence) {
    generateLog('defence', player1, player2)
  }

  comparisonResult();
});
generateLog('start', player2, player1);