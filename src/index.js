import './style/style.css';
import { callAPI, auth } from './js/auth';
import render from './templates/friends.hbs';
import { setStorage, getStorage, updateStorage } from './js/storage';

import { dnd } from './js/dnd';
import { shuffle } from './js/shuffle';
import { search, filterFriends } from './js/search';

const container = document.querySelector('.container');
const source = document.querySelector('.source');
const target = document.querySelector('.target');
const sourceSearch = document.querySelector('.sourceSearch');
const targetSearch = document.querySelector('.targetSearch');
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
        const friendsInfo = friends.items;

        // инициализируем левый блок - если пуст, заполняем списком друзей 
        if (!localStorage['sourceBlock']) {
            setStorage(friendsInfo, 'sourceBlock');
        }

        if (!localStorage['targetBlock']) {
            setStorage([], 'targetBlock');
        } 

        let sourceBlock = getStorage('sourceBlock');
        let targetBlock = getStorage('targetBlock');
        
        source.innerHTML = render({ items: sourceBlock });
        target.innerHTML = render({ items: targetBlock });

        return friendsInfo;
    });

dnd(zones);

shuffle(zones);

filterFriends([sourceSearch, targetSearch]);
