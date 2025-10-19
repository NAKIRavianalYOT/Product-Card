// №01 Покраска всех карточек

const productCardsList = document.querySelectorAll('.product-cards__item');
const changeColorAllCardButton = document.querySelector('#change-color-all-card');
const slateGrayColorHash = '#778899';
const peachPuffColorHash = '#FFDAB9';

changeColorAllCardButton.addEventListener('click', () => {
  productCardsList.forEach((card) => card.style.backgroundColor = slateGrayColorHash);
});

// №02 Покраска первой карточки

const firstProductCard = document.querySelector('.product-cards__item');
const changeColorFirstCardButton = document.querySelector('#change-color-first-card');

changeColorFirstCardButton.addEventListener('click', () => {
  firstProductCard.style.backgroundColor = peachPuffColorHash;
});

// №03 Открыть страницу Google

const openGoogleButton = document.querySelector('#open-google');
openGoogleButton.addEventListener('click', openGoogle);

function openGoogle() {
  const answer = confirm('Вы точно хотите перейти на этот сайт?');

  if (answer === true) {
    window.open('https://www.google.com/');
  }
}

// №04 Вывод сообщение в консоль лог

const outputLogBtn = document.querySelector(
  '#output-console-log'
)
outputLogBtn.addEventListener('click', () =>
  outputConsoleLogMessage('ДЗ №04')
)

function outputConsoleLogMessage(message) {
  alert(message)
  console.log(message)
}

// №05 Вывод названия главной заголовки в консоль лог при наведении

const mainTitle = document.querySelector('#main-title');
mainTitle.addEventListener('mouseover', () => {
  outputConsoleLogTitle('Выбери свой продукт')
});

function outputConsoleLogTitle(message) {
  console.log(message);
}

// №06 Изменение цветов при нажатии на кнопки

const colorToggleBtn = document.querySelector('#color-toggle-btn');
colorToggleBtn.addEventListener('click', () => {
  toggleColorBtn()
});

function toggleColorBtn() {
  colorToggleBtn.classList.toggle('bg-peachpuff');
}