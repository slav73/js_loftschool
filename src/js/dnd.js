import { updateStorage } from "./storage";

function dnd(zones) {

    let currentDrag;

    zones.forEach(zone => {
        zone.addEventListener('dragstart', (e) => {
            currentDrag = { source: zone, node: e.target };
        });

        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        zone.addEventListener('drop', (e) => {
            if (currentDrag) {
                e.preventDefault();

                if (currentDrag.source !== zone) { 
                    let friendId = currentDrag.node.getAttribute('friendId');
                    let zoneId = zone.getAttribute('id');
                    let block = JSON.parse(sessionStorage['friends']);
                    
                    for (let key in block) {
                        if (block[key].id == friendId) {
                            block[key].block = zoneId;
                            
//                            (zoneId === 'target')? e.target.innerHTML = 'x': e.target.innerHTML = '+'; 

                        } 
                    } 
        
                    sessionStorage['friends'] = JSON.stringify(block.filter(n => n));  
                    zone.appendChild(currentDrag.node);

                }

                currentDrag = null;
            }
        });
    })
    
}

export { dnd };