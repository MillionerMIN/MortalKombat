import { logs } from './logs.js';
import { $chat, $formFight, $arenas } from './main.js'
import { player1, player2 } from "./person.js";

const $randomButton = document.querySelector('.button');

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

export const createElement = (tag, className) => {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }
  return $tag;
};

export function createReloadButton() {
  const $reloadWrap = createElement('div', 'reloadWrap');
  const $reloadButton = createElement('button', 'button');
  $reloadButton.innerHTML = 'Restart';
  $reloadWrap.appendChild($reloadButton);
  $reloadButton.addEventListener('click', () => {
    window.location.reload();
  });
  return $reloadWrap;
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

const randomNum = (number) => Math.floor(Math.random() * (number - 1) + 1);

const normalize = (num) => num.toString().length > 1 ? num : `0${num}`;

export const enemyAttack = () => {
  const hit = ATTACK[randomNum(3) - 1];
  const defence = ATTACK[randomNum(3) - 1];

  return {
    value: randomNum(HIT[hit]),
    hit,
    defence,
  };
}

export function playerAttack() {
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

export function generateLog(type, player1, player2) {
  const { name, hp } = player1;
  const { name: name2 } = player2;
  const time = new Date();
  const index = randomNum(logs[type].length - 1);
  const correctTime = normalize(time.getHours()) + ':' + normalize(time.getMinutes());

  function whereLook(direction) {
    switch (direction) {
      case 'start':
        const start = logs.start.replace('[time]', correctTime).replace('[player1]', name).replace('[player2]', name2);
        return `<p>${start}</p>`;
      case 'end':
        const end = logs.end[index].replace('[playerWins]', name).replace('[playerLose]', name2);
        return `<p>${end}</p>`;
      case 'hit':
        const hit = logs[type][index].replace('[playerKick]', name).replace('[playerDefence]', player1.name);
        return `<p>${correctTime} - ${hit} - ${hp}[${hp}/100]</p>`;
      case 'defence':
        const defence = logs[type][index].replace('[playerKick]', name2).replace('[playerDefence]', name);
        return `<p>${correctTime} - ${defence}</p>`;
      default:
        const draw = logs[draw];
        return `<p>${draw}</p>`;
    }
  }

  $chat.insertAdjacentHTML('afterbegin', whereLook(type));
}

export function comparisonResult() {
  const { name, hp } = player1;
  const { name: name2, hp: hp2 } = player2;
  if (hp === 0 || hp2 === 0) {
    $randomButton.disabled = true;
    $arenas.appendChild(createReloadButton());
  }
  if (hp === 0 && hp < hp2) {
    $arenas.appendChild(playerWin(name2));
    generateLog('end', player2, player1);
  } else if (hp2 === 0 && hp > hp2) {
    $arenas.appendChild(playerWin(name));
    generateLog('end', player1, player2);
  } else if (hp === 0 && hp2 === 0) {
    $arenas.appendChild(playerWin());
    generateLog('draw');
  }
}