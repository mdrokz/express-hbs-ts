$(document).ready(async function () {

    const broker_req = await fetch('http://localhost:3000/index/brokers');

    const brokers = await broker_req.json();

    console.log(brokers);

    const a = [];

    brokers.reduce((p, c) => {
        console.log(p, c);

        // let [lcount, lcount2] = [p.listing_count, c.listing_count];
        // let [lmonth, lmonth2] = [p.listing_month, c.listing_month];
        // let [revnue, revenue2] = [p.avg_revenue, c.avg_revenue];

        if (c.broker_id == p.broker_id) {
            
        }

        return c;
    })

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
        datasets: [{
            label: "My First dataset",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: [0, 10, 5, 2, 20, 30, 45, 80, 87, 10, 45, 56],
        }, {
            label: "My Second dataset",
            backgroundColor: "rgb(255, 99, 120)",
            borderColor: "rgb(255, 99, 132)",
            data: [0, 10, 5, 2, 20, 30, 45, 80, 17, 10, 35, 40],
        }],
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