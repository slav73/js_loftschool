/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

function clearTable(listTable) {
    while (listTable.lastChild) {
        listTable.removeChild(listTable.lastChild);
    }
}

function cookiesList() {

    clearTable(listTable);
    let cookiesArray = document.cookie.split('; ');

    for (let cookie of cookiesArray) {
        const [cookieName, cookieValue] = cookie.split('=');

        if (filterNameInput.value !== '') {
            const match = isMatching(cookieName+cookieValue, filterNameInput.value);

            if (match) {
                createNewTableRow(cookieName, cookieValue);
            }
        } else {
            createNewTableRow(cookieName, cookieValue);
        }

    }
}

function createNewTableRow(cookieName, cookieValue) {
    const newLine = document.createElement('tr');
    const newCookieNameCell = document.createElement('td');
    const newCookieValueCell = document.createElement('td');
    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');

    newCookieNameCell.innerText = cookieName;
    newCookieValueCell.innerText = cookieValue;

    deleteButton.innerText = 'Удалить';
    deleteButton.addEventListener('click', function () {
        var date = new Date(0);

        document.cookie = `${cookieName}=; expires=` + date.toUTCString();

        listTable.removeChild(newLine);
    });

    deleteCell.appendChild(deleteButton);

    newLine.appendChild(newCookieNameCell);
    newLine.appendChild(newCookieValueCell);
    newLine.appendChild(deleteCell);

    listTable.appendChild(newLine);
}

// проверка наличия подстроки в строке
function isMatching(full, chunk) {
    full = full.toLowerCase();
    chunk = chunk.toLowerCase();

    if (~full.indexOf(chunk)) {

        return true;
    }

    return false;
}

cookiesList();

filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie

    clearTable(listTable);

    let chunk = filterNameInput.value;
    let cookiesArray = document.cookie.split('; ');

    if (chunk !== '') {

        for (let cookie of cookiesArray) {
            const match = isMatching(cookie, chunk);

            if (match) {
                const [name, value] = cookie.split('=');

                createNewTableRow(name, value);
            }
        }
    } else {
        cookiesList();
    }
});

// обработка нажатия на кнопку "Добавить cookie"
addButton.addEventListener('click', () => {

    document.cookie = `${addNameInput.value}=${addValueInput.value}`;
    cookiesList();

});
