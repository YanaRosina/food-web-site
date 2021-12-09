function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
        //Slider
        const sliders = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        current = document.querySelector(currentCounter),
        total = document.querySelector(totalCounter),
        sliderWrapper = document.querySelector(wrapper),
        sliderField = document.querySelector(field),
        width = window.getComputedStyle(sliderWrapper).width;
    let slideIndex = 1;
    let offset = 0;

    function addNullForNumber() {
        if (sliders.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    if (sliders.length < 10) {
        total.textContent = `0${sliders.length}`;
    } else {
        total.textContent = sliders.length;
    }
    addNullForNumber();

    sliderField.style.width = 100 * sliders.length + '%';
    sliderField.style.display = 'flex';
    sliderField.style.transition = '0.5s all';

    sliderWrapper.style.overflow = 'hidden';

    sliders.forEach(slider => {
        slider.style.width = width;
    });

    //Navigation

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];

    function deliteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    function dotOpasity() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = '1';
    }

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    slider.append(indicators);

    for (let i = 0; i < sliders.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('dot-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .3;
            transition: opacity .6s ease;
            `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }



    next.addEventListener('click', () => {
        if (offset == deliteNotDigits(width) * (sliders.length - 1)) {
            offset = 0;
        } else {
            offset += deliteNotDigits(width);
        }

        sliderField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == sliders.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
        addNullForNumber();
        dotOpasity();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deliteNotDigits(width) * (sliders.length - 1);
        } else {
            offset -= deliteNotDigits(width);
        }

        sliderField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = sliders.length;
        } else {
            slideIndex--;
        }
        addNullForNumber();
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = '1';

    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('dot-slide-to');

            slideIndex = slideTo;
            offset = deliteNotDigits(width) * (slideTo - 1);

            sliderField.style.transform = `translateX(-${offset}px)`;

            addNullForNumber();
            dotOpasity();
        });
    });
}

export default slider;