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
                    if (currentDrag.source.classList.contains('target')) {
                        const deletion = currentDrag.node.querySelector('shuffle');
                    }   

                    if (e.target.classList.contains('item')) {
                        zone.insertBefore(currentDrag.node, e.target.nextElementSibling);
                    } else {
                        zone.insertBefore(currentDrag.node, zone.lastElementChild);
                    }
                }

                updateStorage(currentDrag.node, zone);    
                currentDrag = null;
            }
        });
    })
    
}

export { dnd };