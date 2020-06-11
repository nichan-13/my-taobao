function getStorage(key) {
    return localStorage.getItem(key);
}

function setStorage(key, val) {
    var StorageVal = getStorage(key);
    var actualVal = val;
    if (StorageVal != null) {
        actualVal = `${StorageVal},${val}`;
    }
    localStorage.setItem(key, actualVal);
}

function clearStorage(key) {
    localStorage.clear();
    // localStorage.removeItem(key);
}

