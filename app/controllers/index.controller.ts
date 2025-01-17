/* app/controllers/welcome.controller.ts */

// Import only what we need from express
import { Router, Request, Response } from 'express';
import Deal from '../models/deal';

import { Client } from 'pg';

const client = new Client();

client.connect().then(r => console.log('Connected to DB')).catch(e => console.log(e));

// Assign router to the express.Router() instance
const router: Router = Router();


// The / here corresponds to the route that the WelcomeController
// is mounted on in the server.ts file.
// In this case it's /welcome

function random_rgb() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
}


router.get('/brokers', async (req: Request, res: Response) => {
    let brokers = await client.query(`
    Select 
    Count(1) as Listing_Count,
    x.broker_id,
    x.broker,
    x.Listing_Month,
    ROUND(AVG(x.revenue)::numeric,2) as Avg_Revenue
    from (
    Select 
    s.id as broker_id,
    s.title as broker,
    EXTRACT(Month FROM d.listing_date) as Listing_Month,
    d.revenue
    from deals d
    inner join sites s on d.site_id = s.id
        where d.listing_date between '2020-11-01' and '2021-11-30'
    ) as x
    group by x.Listing_Month, x.broker, x.broker_id
    order by x.broker_id, x.Listing_Month asc
    `);

    let arrBroker = Array.from(new Set(brokers.rows.map(m => m.broker_id)));

    let arrGraph: any = [];
    arrBroker.forEach((brokerId, index) => {
        let deals = brokers.rows.filter(f => f.broker_id == brokerId);
        if (deals.length > 0) {
            let arrListingCount = [];
            let arrRevenue = [];
            for (let i = 1; i <= 12; i++) {
                let deal = deals.find(f => f.listing_month == i);
                if (deal) {
                    arrListingCount.push(deal.listing_count);
                    arrRevenue.push(deal.avg_revenue);
                } else {
                    arrListingCount.push(0);
                    arrRevenue.push(0);
                }
            }

            let dataSet = {
                label: deals[0].broker,
                backgroundColor: random_rgb(),
                borderColor: random_rgb(),
                data: arrListingCount,
                revenue: arrRevenue
            }
            arrGraph.push(dataSet);
        }
    });

    res.json(arrGraph);
});

router.get('/', async (req: Request, res: Response) => {
    // Reply with a hello world when no name param is provided
    let db = await client.query(`Select d.id as Listing_Id,
    d.listing_date as Listing_Date,
    EXTRACT(Month FROM d.listing_date) as Listing_Month,
    s.title as broker,
    d.revenue
    from deals d
    inner join sites s on d.site_id = s.id `);



    let table_data = db.rows.map(r => {
        let deal: Deal = new Deal(r.listing_id, r.listing_date, r.listing_month, r.revenue);
        return { ...deal, broker: r.broker };
    });

    res.render('index', { data: table_data });
});

router.get('/:name', (req: Request, res: Response) => {
    // Extract the name from the request parameters
    let { name } = req.params;

    // Greet the given name
    res.render('index', { message: `Hello, ${name}` });
});


// Export the express.Router() instance to be used by server.ts
export const IndexController: Router = router;