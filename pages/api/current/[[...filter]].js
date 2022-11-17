import { getClass } from "../../../lib/parser";
import { getCurrentPeriod } from "../../../lib/time";
import { getOrder } from "../../../lib/db";

export default async function handler(req, res) {
    const { filter } = req.query;
    
    const target = getClass(filter.split('/')); // for next 13 turbo
    // const target = getClass(filter); // for  next 12 compiler
    const time = getCurrentPeriod();
    const schedule = await getOrder(time, target);

    console.log({ schedule });

    res.status(200).json({ target, time, schedule });
}
