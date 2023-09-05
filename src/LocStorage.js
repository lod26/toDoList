class LocStorage {

    get (key) {
        const item = localStorage.getItem(key)
        if(!item) return
        return JSON.parse(item)
    }
    set (key , item) {
        localStorage.setItem(key , JSON.stringify(item))
    }

}

const locStorage = new LocStorage()