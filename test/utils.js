function logTag(title = "") {
    let columnsWidth = process.stdout.columns
    let topBar = ""
    let namebar = title
    for (const x of [...Array(columnsWidth).keys()]) {
        topBar += "="
    }
    while (namebar.length < columnsWidth) {
        namebar = "=" + namebar
        if (namebar.length < columnsWidth)
            namebar += "="
    }
    console.log(topBar)
    console.log(namebar)
    console.log(topBar)
}
module.exports = { logTag }