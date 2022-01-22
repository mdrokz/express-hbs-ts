
export default class Site {
    id: number;

    created_at: Date;

    updated_at: Date;

    slug: string;

    title: string;

    url: string;

    listing_url: string;

    /**
     *
     */
    constructor() {
        this.id = 0;

        this.created_at = new Date();

        this.updated_at = new Date();

        this.slug = "";
        this.url = "";
        this.listing_url = "";
        this.title = "";
    }
}