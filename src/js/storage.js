const setStorage = function(storage, storageName) {   
    sessionStorage[storageName] = JSON.stringify(storage);
};

const getStorage = function(storageName) {
    let contents = JSON.parse(sessionStorage[storageName]);

    return contents;
};

export { setStorage, getStorage };