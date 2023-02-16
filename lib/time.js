function getCurrentPeriod(test = false) {

    // return {
    //     isInSchoolTime: true,
    //     day: 4,
    //     order: 3,
    // }

    const now = new Date();

    const minutes = (now.getUTCHours() + 7) * 60 + now.getUTCMinutes(); // cuz timezone exist
    const alertTimes = [510, 560, 610, 660, 710, 760, 810, 860, 910, 960];

    let count = 0;
    for (const alertTime of alertTimes) {
        if (minutes < alertTime) {
            return {
                isInSchoolTime: true,
                day: now.getUTCDay(),
                order: count,
            }
        };
        count++
    }
    return {
        isInSchoolTime: false,
        day: now.getUTCDay()
    }
}

function isInSchoolTimeCheck(time) {
    return (time.order <= 9) && (time.order > 0)
}

function getNearbyPeriod(target) {
    let padding = 0

    switch (target) {
        case 'n':
            padding = 1;
            break;
        case 'N':
            padding = 1;
            break;
        case 'p':
            padding = -1;
            break;
        case 'P':
            padding = -1;
            break;
        default:
            padding = 0;
    }

    const time = getCurrentPeriod()
    if (time.isInSchoolTime) {
        time.order += padding 
        time.isInSchoolTime = isInSchoolTimeCheck(time)
    }
    return time
}

export {
    getCurrentPeriod,
    getNearbyPeriod,
    isInSchoolTimeCheck
}