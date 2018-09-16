import './style/style.css';
import { callAPI, auth } from './js/auth';
import render from './templates/friends.hbs';
import { setStorage, getStorage } from './js/storage';

import { dnd } from './js/dnd';
import { shuffle } from './js/shuffle';
import { search, filterFriends } from './js/search';

const source = document.getElementById('source');
const target = document.getElementById('target');

const saveButton = document.querySelector('.button');
const zones = [source, target];

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
        const friendsInfo = [];
        
        // выставляем флаги основной таблицы и видимости в таблицах
        for (let key of friends.items) {
            let friend = {
                id: key.id,
                first_name: key.first_name,
                last_name: key.last_name,
                city: key.city,
                country: key.country,
                photo_50: key.photo_50,
                selected: false,
                visible: false,
                block: 'source'
            };

            friendsInfo.push(friend);
        }

        // инициализируем левый блок - если пуст, заполняем списком друзей 
        if (!localStorage['friends']) {
            source.innerHTML = render({ items: friendsInfo.filter(friend => !friend.selected) });
            // инициализируем сессионную переменную со списком друзей
            sessionStorage['friends'] = JSON.stringify(friendsInfo);
        } else {
            let block = JSON.parse(localStorage['friends']);

            source.innerHTML = render({ items: block.filter(friend => friend.block == 'source') });
            target.innerHTML = render({ items: block.filter(friend => friend.block == 'target') });
            sessionStorage['friends'] = localStorage['friends'];
        }


    });

dnd(zones);

shuffle(zones);

filterFriends(zones);

const updateStorage = function(elem, acceptor) {
    if (sessionStorage['friends']) {

        let block = JSON.parse(sessionStorage['friends']);

        for (let key in block) {
            if (block[key].id == elem) {
                block[key].block = acceptor;
                (acceptor === 'target')? block[key].selected = true: block[key].selected = false;
            } 
        } 
    
    }

    sessionStorage['friends'] = JSON.stringify(block.filter(n => n));
};

saveButton.addEventListener('click', () => {
    localStorage['friends'] = sessionStorage['friends'];
});