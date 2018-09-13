import { updateStorage } from "./storage";

function shuffle() {
    let currentClick;

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('friendShuffle')) {
            let donor;
            let donorBlock;
            let acceptor;

            if (e.target.parentNode.parentNode.classList.contains('source')) {
                donor = 'source';
                donorBlock = document.querySelector('.source');
                acceptor = document.querySelector('.target');
            } else {
                donor = 'target';
                donorBlock = document.querySelector('.source');
                acceptor = document.querySelector('.source');
            }
            
            currentClick = { source: donor, node: e.target };

            updateStorage(currentClick.node.parentNode, acceptor);

            acceptor.insertBefore(currentClick.node.parentNode, donor.lastElementChild);

            currentClick = null;
        }
    });
    
}

export { shuffle };