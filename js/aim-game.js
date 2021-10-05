const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list');
let time = 0;
timeElem = document.querySelector('#time');
const board = document.querySelector('#board');
let score = 0;

//Переменные для генерации градиентного цвета circle
const colors = ['#16D9E3', '#30C7EC', '#46AEF7',
                '#50F80D', '#6ae622', '#54d42d',
                '#e6b222', '#e66022', '#ec1919',
                '#f041b5', '#e73c7e', '#a869c4'];     //Массив цветов. Каждая строка - отдельная группа для одного градиента
let selectedColorGroup = 0;     //Инициализация выбранной группы цветов при старте игры
let oldIndexGroup = 0;          //Предыдущий индекс группы цветов - чтобы исключить повтор при генерации
const numberColorGroup = 4;     //Количество групп цветов
const sizeGroupColor = 3;       //Размер одной группы цветов


startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn'))
    {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
})

function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0)
    {
        finishGame();
    }
    else
    {
        let current = --time;
        if (current < 10)
        {
            current = `0${current}`;
        }
        setTime(current);
    }
}

function setTime(value) {
    timeElem.innerHTML = `00:${value}`;
}

function finishGame() {
    timeElem.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1>`;
}

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle'))      //Проверяем что кликнули именно по circle
    {
        score++;
        event.target.remove();
        createRandomCircle();
    }
})

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);                   //генерация размера circle в заданном диапазоне
    const {width, height} = board.getBoundingClientRect();  //получение размеров board

    //Генерация координат местоположения circle
    const x = getRandomNumber(0, width-size);
    const y = getRandomNumber(0, height-size);

    circle.classList.add('circle');

    //Задание градиентного цвета circle без повтора:
    while (selectedColorGroup === oldIndexGroup)
    {
        selectedColorGroup = getRandomNumber(0, (colors.length/numberColorGroup));
    }
    oldIndexGroup = selectedColorGroup; //Обновляем предыдущий индекс
    circle.style.background = `linear-gradient(90deg, ${colors[selectedColorGroup*sizeGroupColor]} 0%, ${colors[selectedColorGroup*sizeGroupColor+1]} 47%, ${colors[selectedColorGroup*sizeGroupColor+2]} 100%)`;


    //Размер
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;

    //Положение
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() *(max-min)+min);
}