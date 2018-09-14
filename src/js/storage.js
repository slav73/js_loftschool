const setStorage = function(storage, storageName) {   
    sessionStorage[storageName] = JSON.stringify(storage);
};

const getStorage = function(storageName) {
    let contents = JSON.parse(sessionStorage[storageName]);

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

    let donorBlock = JSON.parse(sessionStorage[shift[0]]);
    let acceptorBlock = JSON.parse(sessionStorage[shift[1]]);

    for (let key in donorBlock) {
        if (donorBlock[key].id == elem) {
            acceptorBlock.push(donorBlock[key]);

            delete donorBlock[key];
        } 
    } 

    sessionStorage[shift[0]] = JSON.stringify(donorBlock.filter(n => n));
    sessionStorage[shift[1]] = JSON.stringify(acceptorBlock.filter(n => n));
};

export { setStorage, getStorage, updateStorage };