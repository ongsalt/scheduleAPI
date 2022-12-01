import { getClass } from "../../../lib/parser";
import { getCurrentPeriod } from "../../../lib/time";
import { getOrder } from "../../../lib/db";

export default async function handler(req, res) {
    const { filter } = req.query;

    try {
        // const target = getClass(filter.split('/')); // for next 13 turbo
        const target = getClass(filter); // for  next 12 compiler
        const time = getCurrentPeriod();
        const schedule = await getOrder(time, target);

        console.log({ schedule });
    
        res.status(200).json({ target, time, schedule });
    } catch (e) {
        if (e?.status == 0) {
            res.status(503).json({ errorMessage: "Database not found" })
        }
        console.log(e)
        res.status(402).json({ errorMessage: "Given class is not valid" })
    }
}
