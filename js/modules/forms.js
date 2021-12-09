import {OpenModalBlock, CloseModalBlock} from './modal';
import {postData} from '../services/services';

function forms(modalTimerId, formSelector) {
    //Forms

    const forms = document.querySelectorAll(formSelector);

    const massage = {
        loading: 'img/forms/spinner.svg',
        success: 'Готово! Скоро мы с вами свяжемся!',
        failing: 'Упс, что-то пошло не так...'
    };

    forms.forEach((item) => {
        bingpostData(item);

    });


    function bingpostData(form) {

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMassage = document.createElement('img');
            statusMassage.src = massage.loading;
            statusMassage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
            //form.append(statusMassage);
            //request.open('POST', 'server.php');
            form.insertAdjacentElement('afterend', statusMassage);

            //const request = new XMLHttpRequest();



            // request.setRequestHeader('Content-type', 'multipart/form-data');
            // request.setRequestHeader('Content-type', 'aplication/json');

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                //.then(data => data.text())
                .then(data => {
                    console.log(data);
                    showThanksModal(massage.success);
                    statusMassage.remove();
                })
                .catch(() => {
                    showThanksModal(massage.failing);
                })
                .finally(() => {
                    form.reset();

                });


        });
    }


    function showThanksModal(massage) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        OpenModalBlock('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content"> 
                    <div class="modal__close" data-close>×</div>
                    <div class="modal__title">${massage}</div>        
            </div>
        `;


        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            CloseModalBlock('.modal');
        }, 4000);
    }

}

export default forms;