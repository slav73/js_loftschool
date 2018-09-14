import render from '../templates/friends.hbs';
export { search, filterFriends };

function search(full, chunk) {
    if (chunk) {
        full = full.toLowerCase();
        chunk = chunk.toLowerCase();

        if (~full.indexOf(chunk)) {

            return true;
        }
    }    
    return false;
}

function filterFriends(zones) {
    let currentZone;

    zones.forEach(zone => {
        addEventListener('keyup', (e) => {

            currentZone = { source: zone, node: e.target };
            let donorBlock;
            let zoneField;
            let zoneClass;
            let zoneName = e.target.id;

            if (zoneName === 'targeter') {
                zoneField = 'target';
                zoneClass = '.target';
            } else {
                zoneField = 'source';
                zoneClass = '.source';
            }

            let chunk = currentZone.node.value;

            console.log(zoneName);
           
            if (zone.classList.contains(zoneField)) {

                zoneField = document.querySelector(zoneClass);
                console.log(zoneField);
                donorBlock = JSON.parse(sessionStorage[zoneField]);
                
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
                } else {
//                    zoneField.innerHTML = render({ items: searchFields });
                }   
            }   
        });
    });    
}