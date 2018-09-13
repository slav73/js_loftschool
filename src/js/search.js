import render from '../templates/friends.hbs';
import getStorage from './storage';
export { search, filterFriends };

function search(full, chunk) {
    full = full.toLowerCase();
    chunk = chunk.toLowerCase();

    if (~full.indexOf(chunk)) {

        return true;
    }

    return false;
}

function filterFriends(zones) {
    let currentZone;

    zones.forEach(zone => {
        addEventListener('keyup', (e) => {
            currentZone = { source: zone, node: e.target, block: e.target.id };
            let donorBlock;
            let zoneField;
            let zoneClass = '.' + currentZone.block;
            let chunk = currentZone.node.value;
            let zoneName = currentZone.block + 'Block';

            if (currentZone.source.classList.contains('sourceSearch')) {
                zoneField = document.querySelector(zoneClass);
                donorBlock = JSON.parse(localStorage[zoneName]);
                
             
                if (chunk !== '') {
                    let searchFields = [];

                    for (let key in donorBlock) {
                        if (donorBlock.hasOwnProperty(key)) {            
                            const match = search(donorBlock[key].first_name, chunk) || search(donorBlock[key].last_name, chunk);
            
                            if (match) {
                                searchFields.push(donorBlock[key]);
                            }
                        }
                    }   
                    console.log(zoneField);

                    zoneField.innerHTML = render({ items: searchFields });
                }    
            } 
        });        
    });    
}