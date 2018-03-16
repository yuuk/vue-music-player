// 随机数
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
// 数组洗牌
export function shuffle (arr) {
    let _arr = arr.slice()
    for (let i = 0, len = _arr.length; i < len; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
    }
    return _arr
}

