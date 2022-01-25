$(document).ready(async function () {

    const broker_req = await fetch('http://localhost:3000/index/brokers');
    // const broker_req = await fetch('http://0.tcp.in.ngrok.io:10464/index/brokers');

    const brokers = await broker_req.json();

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
        datasets: brokers
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
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            let revenue = context.dataset.revenue[context.dataIndex];
    
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y
                                label += `\n Average Revenue: ${revenue}`;
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });

    $('#data_table').DataTable();
});