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
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 10, 5, 2, 20, 30, 45, 80, 87, 10, 45, 56],
    },
  ],
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
