// 封装本地存储模块

/*
存储数据
*/
export const setItem = (key, value) => {
    // 将数组、对象类型的数据装换为JSON格式的字符串进行存储
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(key, value)
}

/*
获取数据
*/
export const getItem = (key) => {
    const data = window.localStorage.getItem(key)
    try {
        return JSON.parse(data)
    } catch (error) {
        return data
    }
}

/*
删除数据
*/
export const removeIteam = (key) => {
    window.localStorage.removeItem(key)
}
