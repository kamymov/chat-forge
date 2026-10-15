const cacheSpace = new Map();

class MemoryCache {
    get(key) {
        cacheSpace.get(key);
    }
    set (key, value) {
        cacheSpace.set(key, value)
    }
    delete(key) {
        cacheSpace.delete(key);
    }
}

module.exports={
    MemoryCache
}