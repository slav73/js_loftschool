function shuffle(zones) {

    zones.forEach(zone => {

        zone.addEventListener('click', (e) => {

            let shuffleId = e.target.getAttribute('shuffleId');

            if (shuffleId) {
                let zoneId = zone.getAttribute('id');
                let zoneDest;

                if (zoneId === 'source') {
                    zoneDest = 'target';
                } else {
                    zoneDest = 'source';
                }

                let zoneDestNode = document.getElementById(zoneDest);
                let block = JSON.parse(sessionStorage['friends']);

                for (let key in block) {
                    if (block[key].id == shuffleId) {
                        block[key].block = zoneDest;
                        (zoneDest === 'target')? e.target.innerHTML = 'x': e.target.innerHTML = '+';                        
                    } 
                } 

                zoneDestNode.appendChild(e.target.parentNode);
                sessionStorage['friends'] = JSON.stringify(block.filter(n => n));        
            }
        });
    });  
        
}

export { shuffle };