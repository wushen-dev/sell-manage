const local = {
    // 存储
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    },
    // 获取
    get(key) {
        return JSON.parse(localStorage.getItem(key))
    },
    // 删除
    remove(key) {
        localStorage.removeItem(key);
    },
    // 清空
    clear() {
        localStorage.clear();
    }
}

export default local;