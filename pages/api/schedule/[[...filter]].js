import { getClass } from "../../../lib/parser";
import { getCurrentPeriod, getNearbyPeriod } from "../../../lib/time";
import { getOrder } from "../../../lib/db";

export default async function handler(req, res) {
    const { filter } = req.query;

    console.log({ filter })
    try {
        const target = getClass(filter); // for  next 12 compiler
        // const target = getClass(filter.split('/')); // for next 13 turbo
        let time, schedule;
        if (filter.length === 2) { // Nearby
            time = getNearbyPeriod(filter[1])
        } else if (filter.length === 3) { // Destinate
            time = {
                day: parseInt(filter[2]),
                order: parseInt(filter[1])
            }
        } else { // Current
            time = getCurrentPeriod(test = true);
        }

        schedule = await getOrder(time, target);

        // console.log({ schedule });

        res.status(200).json({ target, time, schedule });
    } catch (e) {
        if (e?.status == 0) {
            res.status(503).json({ errorMessage: "Database not found" })
        }
        console.log(e)
        res.status(402).json({ errorMessage: "Given class is not valid" })
    }
}
