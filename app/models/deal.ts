export default class Deal {

    id: number;

    created_at: Date;

    updated_at: Date;

    site_id: number;

    slug: string;

    title: string;

    url: string;

    listing_date: Date;

    listing_month: number;

    last_updated: string;

    date: string;

    last_seen_on: string;

    status: string;

    removed: boolean;

    type: string;

    price: string;

    revenue: string;

    income: string;
    /**
     *
     */
    constructor(listing_id: number, listing_date: Date, listing_month: number, revenue: string) {
        this.id = listing_id;
        this.site_id = 0;
        this.created_at = new Date();
        this.date = "";
        this.income = "";
        this.price = "";
        this.type = "";
        this.removed = false;
        this.status = "";
        this.last_seen_on = "";
        this.last_updated = "";
        this.listing_month = listing_month;
        this.revenue = revenue;
        this.listing_date = listing_date;
        this.url = "";
        this.title = "";
        this.slug = "";
        this.updated_at = new Date();
    }
}