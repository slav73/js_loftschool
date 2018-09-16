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
            let zoneName = zone.getAttribute('id');
            let chunk = currentZone.node.value;

            if (currentZone.node.parentNode.classList.contains(zoneName)) {
                    
                let block = JSON.parse(sessionStorage['friends']);
                
                if (chunk !== '') {

                    for (let key in block) {
                        if (block.hasOwnProperty(key) && block[key].block == zoneName) {   
                            const match = search(block[key].first_name, chunk) || search(block[key].last_name, chunk);
            
                            if (match) {
                                block[key].visible = true;
                            }
                        }
                    }   

                    zone.innerHTML = render({ items: block.filter(friend => friend.visible) });
                } else {
                    zone.innerHTML = render({ items: block.filter(friend => friend.block == zoneName)});

                }
            }
        });
    });    
}