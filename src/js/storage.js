const setStorage = function(storage, storageName) {   
    localStorage[storageName] = JSON.stringify(storage);
};

const getStorage = function(storageName) {
    let contents = JSON.parse(localStorage[storageName]);

    return contents;
};

const updateStorage = function(item, donor) {
    let shift;
    let elem = item.getAttribute('friendId');
    
    if (donor.classList.contains('source')) {
        shift = ['targetBlock', 'sourceBlock'];
    } else {
        shift = ['sourceBlock', 'targetBlock'];
    }

    let donorBlock = JSON.parse(localStorage[shift[0]]);
    let acceptorBlock = JSON.parse(localStorage[shift[1]]);

    for (let key in donorBlock) {
        if (donorBlock[key].id == elem) {
            acceptorBlock.push(donorBlock[key]);

            delete donorBlock[key];
        } 
    } 

    localStorage[shift[0]] = JSON.stringify(donorBlock.filter(n => n));
    localStorage[shift[1]] = JSON.stringify(acceptorBlock.filter(n => n));
};

export { setStorage, getStorage, updateStorage };