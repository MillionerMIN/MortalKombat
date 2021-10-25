import { createElement, generateLog, enemyAttack, playerAttack, comparisonResult } from "./function.js";
import { player1, player2 } from "./person.js";

export const $arenas = document.querySelector('.arenas');
export const $chat = document.querySelector('.chat');
export const $formFight = document.querySelector('.control');

const createPlayer = (playerObj) => {
  const { player, hp, name, img } = playerObj
  const $player = createElement('div', 'player' + player);
  const $progressBar = createElement('div', 'progressbar');
  const $character = createElement('div', 'character');
  const $life = createElement('div', 'life');
  const $name = createElement('div', 'name');
  const $img = createElement('img');

  $life.style.width = hp + '%';
  $name.innerHTML = name;
  $img.src = img;

  $player.appendChild($progressBar);
  $player.appendChild($character);
  $progressBar.appendChild($life);
  $progressBar.appendChild($name);
  $character.appendChild($img);

  return $player;
};

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

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
  if (player.hit === enemy.defence) {
    generateLog('defence', player2, player1)
  }
  if (enemy.hit === player.defence) {
    generateLog('defence', player1, player2)
  }

  comparisonResult();
});
generateLog('start', player2, player1);