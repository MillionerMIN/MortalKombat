export const player1 = {
  player: 1,
  name: 'SONYA',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
  weapon: ['sword'],
  changeHP,
  elHP,
  renderHP,
};

export const player2 = {
  player: 2,
  name: 'LIU KANG',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
  weapon: ['hands'],
  changeHP,
  elHP,
  renderHP,
};

function changeHP(number) {
  this.hp -= number;
  if (this.hp < 0) {
    this.hp = 0;
  }
}

function elHP() {
  return document.querySelector(`.player${this.player} .life`);
}

function renderHP() {
  this.elHP().style.width = this.hp + '%';
}