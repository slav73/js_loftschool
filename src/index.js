/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:
 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду
 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, seconds * 1000);
    });
}

/*
 Задание 2:
 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения
 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 2.2: Элементы полученного массива должны быть отсортированы по имени города
 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
    const promise = new Promise((resolve, reject) => {
        fetch('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
            .then( response => {
                if (response.status >= 400) {

                    return Promise.reject();
                }

                return response.json()
            })
            .then(cities => {
                let citiesArr = [];

                for (const city of cities) {
                    citiesArr.push(city);
                }
                let sortedArr = [];

                sortedArr = citiesArr.sort((a, b) => {

                    return a.name >= b.name ? 1: -1;
                });

                resolve(sortedArr);

            })
            .catch(() => {
                const err = new Error('Не удалось загрузить города');

                reject(err);
            })
    });

    return promise
        .then(
            sortedArr => sortedArr
        );

}

export {
    delayPromise,
    loadAndSortTowns
};