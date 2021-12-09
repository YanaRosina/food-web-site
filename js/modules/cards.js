import {getData} from '../services/services';
function cards() {
    const menuTitle = document.querySelectorAll('.menu__item-subtitle'),
    menuText = document.querySelectorAll('.menu__item-descr'),
    menuCost = document.querySelectorAll('.menu__item-total'),
    menuImg = document.querySelectorAll('.menu_img');

    class Menu {
        constructor(title, text, cost, img) {
            this.title = title;
            this.text = text;
            this.cost = cost;
            this.img = img;
        }

        titleConst() {
            return `Меню "${this.title}"`;
        }

        costConst() {
            return `<span>${this.cost}</span> грн/день`;
        }

        newHtmlCard(i) {

            menuTitle[i].innerHTML = this.titleConst();
            menuText[i].innerHTML = this.text;
            menuCost[i].innerHTML = this.costConst();
            menuImg[i].src = this.img;

        }
    }


    getData('http://localhost:3000/menu')
    .then(data => {
        data.data.forEach((obj, i) => {
            new Menu(obj.title, obj.descr, obj.price, obj.img).newHtmlCard(i);
        });
    });

}

export default cards;