import tabs from './modules/tabs';
import cards from './modules/cards';
import modal from './modules/modal';
import slider from './modules/slider';
import forms from './modules/forms';
import timer from './modules/timer';
import calc from './modules/calc';
import {OpenModalBlock} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => OpenModalBlock('.modal', modalTimerId), 50000);

    tabs('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
    cards();
    modal('[data-modal]','.modal', modalTimerId);
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
        slide: '.offer__slide'
    });
    forms(modalTimerId, 'form');
    timer('.timer', '2021-12-31');
    calc();

});