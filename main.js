const sonya = {
  name: 'SONYA',
  hp: 80,
  img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
  weapon: ['sword'],
  attack: function () {
    console.log(`${this.name}` + ' Fight...');
  },
};

const liuKang = {
  name: 'LIU KANG',
  hp: 60,
  img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
  weapon: ['hands'],
  attack: function () {
    console.log(`${this.name}` + ' Fight...');
  },
};

const createPlayer = (classPlayer, playerName, health, img) => {
  const $player1 = document.createElement('div');
  $player1.classList.add(classPlayer);

  const $progressBar = document.createElement('div');
  $progressBar.classList.add('progressbar');

  const $character = document.createElement('div');
  $character.classList.add('character');

  const $life = document.createElement('div');
  $life.classList.add('life');
  $life.style.width = health + '%';

  const $name = document.createElement('div');
  $name.innerHTML = playerName;
  $name.classList.add('name');

  const $img = document.createElement('img');
  $img.src = img;

  $player1.appendChild($progressBar);
  $player1.appendChild($character);
  $progressBar.appendChild($life);
  $progressBar.appendChild($name);
  $character.appendChild($img);

  const $arenas = document.querySelector('.arenas')
  $arenas.appendChild($player1);
};

createPlayer('player1', liuKang.name, liuKang.hp, liuKang.img);
createPlayer('player2', sonya.name, sonya.hp, sonya.img);