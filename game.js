import { logs } from './logs.js';
import { Player } from './person.js';

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

export class Game {
  constructor(props) {
    this.$arenas = document.querySelector('.arenas');
    this.$chat = document.querySelector('.chat');
    this.$formFight = document.querySelector('.control');
    this.$randomButton = document.querySelector('.button');
    this.player1 = new Player({
      player: 1,
      name: 'SONYA',
      hp: 100,
      img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
      weapon: ['sword'],
    });
    this.player2 = new Player({
      player: 2,
      name: 'LIU KANG',
      hp: 100,
      img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
      weapon: ['hands'],
    });
    this.logs = logs;
  }

  createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
      $tag.classList.add(className);
    }
    return $tag;
  };

  createPlayer = (playerObj) => {
    const { player, hp, name, img } = playerObj
    const $player = this.createElement('div', 'player' + player);
    const $progressBar = this.createElement('div', 'progressbar');
    const $character = this.createElement('div', 'character');
    const $life = this.createElement('div', 'life');
    const $name = this.createElement('div', 'name');
    const $img = this.createElement('img');

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

  createReloadButton = () => {
    const $reloadWrap = this.createElement('div', 'reloadWrap');
    const $reloadButton = this.createElement('button', 'button');
    $reloadButton.innerHTML = 'Restart';
    $reloadWrap.appendChild($reloadButton);
    $reloadButton.addEventListener('click', () => {
      window.location.reload();
    });
    return $reloadWrap;
  }

  randomNum = (number) => Math.floor(Math.random() * (number - 1) + 1);
  normalize = (num) => num.toString().length > 1 ? num : `0${num}`;

  enemyAttack = () => {
    const hit = ATTACK[this.randomNum(3) - 1];
    const defence = ATTACK[this.randomNum(3) - 1];

    return {
      value: this.randomNum(HIT[hit]),
      hit,
      defence,
    };
  }

  playerAttack = () => {
    const attack = {};

    for (let item of this.$formFight) {
      if (item.checked && item.name === 'hit') {
        attack.value = this.randomNum(HIT[item.value]);
        attack.hit = item.value;
      }
      if (item.checked && item.name === 'defence') {
        attack.defence = item.value;
      }
      item.checked = false;
    }
    return attack;
  }

  generateLog = (type, player1, player2) => {
    const { name, hp } = player1;
    const { name: name2 } = player2;
    const time = new Date();
    const index = this.randomNum(logs[type].length - 1);
    const correctTime = this.normalize(time.getHours()) + ':' + this.normalize(time.getMinutes());

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

    this.$chat.insertAdjacentHTML('afterbegin', whereLook(type));
  }

  comparisonResult = () => {
    const { name, hp } = this.player1;
    const { name: name2, hp: hp2 } = this.player2;
    if (hp === 0 || hp2 === 0) {
      this.$randomButton.disabled = true;
      this.$arenas.appendChild(this.createReloadButton());
    }
    if (hp === 0 && hp < hp2) {
      this.$arenas.appendChild(this.playerWin(name2));
      this.generateLog('end', this.player2, this.player1);
    } else if (hp2 === 0 && hp > hp2) {
      this.$arenas.appendChild(this.playerWin(name));
      this.generateLog('end', this.player1, this.player2);
    } else if (hp === 0 && hp2 === 0) {
      this.$arenas.appendChild(this.playerWin());
      this.generateLog('draw');
    }
  };

  playerWin = (name) => {
    const $winTitle = this.createElement('div', 'winTitle');
    if (name) {
      $winTitle.innerHTML = name + ' win';
    } else {
      $winTitle.innerHTML = 'Draw - strongest will win';
    }
    return $winTitle;
  };

  start = () => {
    this.$formFight.addEventListener('submit', (e) => {
      e.preventDefault();
      const enemy = this.enemyAttack();
      const player = this.playerAttack();

      if (player.hit !== enemy.defence) {
        this.player1.changeHP(player.value);
        this.generateLog('hit', this.player1, this.player2);
        this.player1.renderHP();
      }
      if (enemy.hit !== player.defence) {
        this.player2.changeHP(enemy.value);
        this.generateLog('hit', this.player2, this.player1);
        this.player2.renderHP();
      }
      if (player.hit === enemy.defence) {
        this.generateLog('defence', this.player2, this.player1)
      }
      if (enemy.hit === player.defence) {
        this.generateLog('defence', this.player1, this.player2)
      }

      this.comparisonResult();
    });

    this.$arenas.appendChild(this.createPlayer(this.player1));
    this.$arenas.appendChild(this.createPlayer(this.player2));

    this.generateLog('start', this.player1, this.player2);
  }
};