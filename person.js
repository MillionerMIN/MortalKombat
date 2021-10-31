export class Player {
  constructor(props) {
    this.player = props.player;
    this.name = props.name;
    this.hp = props.hp;
    this.img = props.img;
    this.weapon = props.weapon;
  }
  changeHP = (number) => {
    this.hp -= number;
    if (this.hp < 0) {
      this.hp = 0;
    }
  }
  elHP = () => {
    return document.querySelector(`.player${this.player} .life`);
  }
  renderHP = () => {
    this.elHP().style.width = this.hp + '%';
  }
}