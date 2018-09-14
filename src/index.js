import './style/style.css';
import { callAPI, auth } from './js/auth';
import render from './templates/friends.hbs';
import { setStorage, getStorage } from './js/storage';

import { dnd } from './js/dnd';
import { shuffle } from './js/shuffle';
import { search, filterFriends } from './js/search';

const source = document.querySelector('.source');
const target = document.querySelector('.target');
const sourceSearch = document.querySelector('.sourceSearch');
const targetSearch = document.querySelector('.targetSearch');
const saveButton = document.querySelector('.button');
const zones = [source, target];
console.log(zones);

const friends = auth()
    .then(() => {
        return callAPI('users.get', { name_case: 'gen' });
    })
    .then(([me]) => {

        const headerInfo = document.querySelector('#headerInfo');

        headerInfo.textContent = `Друзья на странице ${me.first_name} ${me.last_name}`;

        return callAPI('friends.get', { fields: 'city, country, photo_50' });
    })
    .then((friends) => {
        // получили данные о друзьях
        const friendsInfo = friends.items;
console.log(zones);
        // инициализируем левый блок - если пуст, заполняем списком друзей 
        if (!localStorage['source'] && !sessionStorage['source']) {
            setStorage(friendsInfo, 'source');
        } else {
            sessionStorage['source'] = localStorage['source'];
            setStorage(friendsInfo, 'source');
        }

        if (!localStorage['target']) {
            setStorage([], 'target');
        } else if (!sessionStorage['target']) {
            sessionStorage['target'] = localStorage['target'];
            setStorage(JSON.parse(sessionStorage['target']), 'target');
        } else {
            setStorage(JSON.parse(sessionStorage['target']), 'target');
        }

        let sourceBlock = getStorage('source');
        let targetBlock = getStorage('target');

        source.innerHTML = render({ items: sourceBlock });
        target.innerHTML = render({ items: targetBlock });

        return friendsInfo;
    });

dnd(zones);

shuffle(zones);

filterFriends(zones);

saveButton.addEventListener('click', () => {
    localStorage['source'] = sessionStorage['source'];
    localStorage['target'] = sessionStorage['target'];
})
