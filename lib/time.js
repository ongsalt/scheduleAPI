function getCurrentPeriod() {

    return {
        isInSchoolTime: true,
        day: 4,
        order: 3,
    }

    const now = new Date();

    const minutes = (now.getUTCHours() + 7) * 60 + now.getUTCMinutes(); // cuz timezone exist
    const alertTimes = [510, 560, 610, 660, 710, 760, 810, 860, 910, 960];

    let count = 0;
    for (const alertTime of alertTimes) {
        if (minutes < alertTime) {
            return {
                isInSchoolTime: true,
                day: now.getUTCDay(),
                order: count + 1,
            }
        };
        count++
    }
    return {
        isInSchoolTime: false,
        day: now.getUTCDay()
    }
}


export {
    getCurrentPeriod
}