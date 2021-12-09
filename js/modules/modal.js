
    function OpenModalBlock(modalSelector, modalTimerId) {
        const modalWindow = document.querySelector(modalSelector);
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');

        document.body.style.overflow = 'hidden';

        if(modalTimerId) {
            clearInterval(modalTimerId);  
        }

    }

    function CloseModalBlock(modalSelector) {
        const modalWindow = document.querySelector(modalSelector);
        modalWindow.classList.add('hide');
        modalWindow.classList.remove('show');

        document.body.style.overflow = '';
    }

function modal(triggerSelector, modalSelector, modalTimerId) {
    //Modal
    const modalBtn = document.querySelectorAll(triggerSelector),
        modalWindow = document.querySelector(modalSelector);


    modalBtn.forEach(element => {
        element.addEventListener('click', () => OpenModalBlock(modalSelector, modalTimerId));
    });


    //modalClose.addEventListener('click', CloseModalBlock);

    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
            CloseModalBlock(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
            CloseModalBlock(modalSelector);
        }

    });

    

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            OpenModalBlock(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {OpenModalBlock};
export {CloseModalBlock};