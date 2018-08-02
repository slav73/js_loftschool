/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (var i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    var newArr = [];

    for (var i = 0; i < array.length; i++) {
        newArr.push(fn(array[i], i, array));
    }

    return newArr;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial = array[0]) {

    var res = initial;
    var index = 1;

    if (res != array[0]) {
        index = 0;
    }
    for (var i = index; i < array.length; i++) {
        res = (fn(res, array[i], i, array));
    }

    return res;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    var keysArr = [];

    for (var key in obj) {
        if (obj[key] !== undefined) {
            keysArr.push(key.toUpperCase());
        }
    }

    return keysArr;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to = array.length) {
    var array2 = [];

    if (from < 0 && Math.abs(from) <= array.length) {
        from = array.length - Math.abs(from);
    } else if (Math.abs(from) > array.length) {
        (from < 0) ? from = 0 : from = array.length;
    }

    if (to < 0 && Math.abs(to) < array.length) {
        to = array.length - Math.abs(to);
    } else if (Math.abs(to) > array.length) {
        to = array.length;
    }

    for (var i = from; i < to; i++) {
        array2.push(array[i]);
    }

    return array2;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    let proxy = new Proxy(obj, {
        set(target, prop, value) {
            target[prop] = value * value;

            return true;
        }
    });

    return proxy;
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
