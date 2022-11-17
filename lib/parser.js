const classRegex = /m[1-9]-[1-9]/g


// implement prathom later
function getClass(target) {
    const str = target[1]
    if (!classRegex.exec(str)) {
        throw new Error("Given class is not valid")
    }
    return {
        grade: str.charAt(1),
        class: str.charAt(3),
    }
}


function isValid(target) {
    if (validator.length <= 1) {
        return false
    }


    return true
}

export {
    getClass,
    isValid
}