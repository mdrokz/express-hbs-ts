$(document).ready(async function () {

    const broker_req = await fetch('http://localhost:3000/index/brokers');

    const brokers = await broker_req.json();

    console.log(brokers);

    const a = [];

    let arrBroker = [...new Set(brokers.map(m => m.broker_id))];

    let arrGraph = [];
    arrBroker.forEach((brokerId, index) => {
        let deals = brokers.filter(f => f.broker_id == brokerId);
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
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: arrListingCount,
                revenue: arrRevenue
            }
            arrGraph.push(dataSet);
        }
    });

    const labels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const data = {
        labels: labels,
        datasets: arrGraph
    };


    const config = {
        type: "line",
        data: data,
        options: {},
    };
    var ctx = document.getElementById("myChart");

    var myChart = new Chart(ctx, {
        type: "line",
        data: data,
        options: {},
    });

    $('#data_table').DataTable();
});