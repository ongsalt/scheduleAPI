

// implement prathom later
function getClass(target) {
    const classRegex = /m[1-9]-[1-9]/g
    const str = target[0] // [1] for next 13 turbo
    // console.log(str)
    if (!classRegex.exec(str)) {
        throw new Error("Given class is not valid classroom")
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