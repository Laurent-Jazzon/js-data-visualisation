// CANVAS
let canvas1 = document.createElement("canvas");
let body = document.getElementById("bodyContent");
canvas1.id = "chart1";
body.insertBefore(canvas1, body.childNodes[0]);

// CANVAS 2
let canvas2 = document.createElement("canvas");
canvas2.id = 'chart2';
let body2 = document.querySelector('#table1 > caption');
body2.insertBefore(canvas2, body2.childNodes[0]);

// CANVAS 3
let canvas3 = document.createElement('canvas');
canvas3.id = 'chart3';
canvas3.style.height = "420px"
let body3 = document.querySelector('#table2 > caption');
body3.insertBefore(canvas3, body3.childNodes[0]);

// FUNCTION RANDOM RGB 
function rgb() {
    let num = Math.round(0xffffff * Math.random());
    let r = num >> 16;
    let g = num >> 8 & 255;
    let b = num & 255;
    return 'rgb(' + r + ', ' + g +', ' + b +')';
}

// CHART 1
let ajaxChart1 = () => {
    let ctx = document.getElementById("chart1").getContext("2d");
    let yData = [];
    let label = [0,1, 2, 3, 4, 5, 6, 7, 8, 9];
    let i = 10;
    let chart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: label,
        datasets: [
        {
            label: "Crime statistique",
            backgroundColor: rgb(),
            data: yData,
        },
        ],
    },
    });
    function chartUp() {
        i++;
        label.push(i);
        fetch("https://canvasjs.com/services/data/datapoints.php",{cache:"no-cache"})
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                yData.length + 1;
                data.forEach((element) => yData.push(parseInt(element[1])));
                
                chart.update();
                
            });

        }
        setInterval(chartUp, 1000);
    };
    ajaxChart1();

// DATAS LOCATOR CHART 2
const table1 = document.getElementById("table1")
    const labels = [];
    let stats = [];
    for(let z =1; z < table1.rows.length ; z++){
        let countries = {
            label : table1.rows[z].cells[1].innerHTML,
            data : [],
            borderColor : rgb(),
            backgroundColor : 'rgba(0,0,0,0)'
        };
        for(let i =0; i < table1.rows[z].cells.length ; i++){
            if(z === 1 && i > 1){
                labels.push(table1.rows[z].cells[i].innerHTML)
            } else {
                if(i > 1 ){
                    countries.data.push(parseFloat(table1.rows[z].cells[i].innerHTML))
                }
            }
        }
        stats.push(countries)
    }
// DATA LOCATOR CHART 3
const table2 = document.getElementById("table2")
const labels2 = [];
let stats2 = [];
    for(let z =1; z < table2.rows.length ; z++){
        let countries = {
            label : table2.rows[z].cells[1].innerHTML,
            data : [],
            backgroundColor : rgb(),
        };
        for(let i =0; i < table2.rows[z].cells.length ; i++){
            if(z === 1 && i>1){
                labels2.push(table2.rows[z-1].cells[i].innerHTML)
            } else {
                if(i > 1 ){
                    countries.data.push(parseFloat(table2.rows[z].cells[i].innerHTML))
                }
            }
        }
        stats2.push(countries)
}

// CHART 2
let ctx2 = document.getElementById('chart2').getContext('2d');
let myChart2 = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: labels,
        datasets: stats
    },
});

// CHART 3
let ctx3 = document.getElementById('chart3').getContext('2d');
let myChart3 = new Chart(ctx3, {
    type: 'bar',
    data: {
        labels: labels2,
        datasets: stats2
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
