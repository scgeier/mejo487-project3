$(document).ready(function(){
  console.log ('DOM loaded');

  //THE BASIC HIGHCHART PASTE JOB WITH HARD-CODED ARRAY
   var myChart = Highcharts.chart('container', {
          chart: {
              type: 'bar'
          },
          title: {
              text: 'Fruit Consumption'
          },
          subtitle:{
            text: 'Fucking Love Fruit'
          },
          xAxis: {
              categories: ['Apples', 'Bananas', 'Oranges']//NOTICE THIS IS AN ARRAY
          },
          yAxis: {
              title: {
                  text: 'Fruit eaten'
              }
          },
          series: [{
              name: 'Jane',//DELETE THIS AND SEE HOW THE CHART CHANGES
              data: [1, 0, 4]//HOVER OVER THE BARS TO SEE WHAT THESE NUMBERS REPRESENT
          }, {
              name: 'John',
              data: [5, 7, 3]
          }]//ADD ANOTHER OBJECT AND SEE HOW IT CHANGES
      });

//Initialize variables
var url = './js/nations.json';
var data = [];
//You need to use the JSON data to build new arrays to replace the hard-coded ones in HighCharts
var xCat = [];
var popArray= [];
var airportArray = [];
var numAirports = [];

var outerArray = [];



/*Note: The HighCharts starter code uses the jQuery ready function to build the chart on page load.
If you move the .ready to the top of your JS file, you must add your own callback function
to build the chart after the AJAX call.
*/

//Load the JSON data
  $.ajax({
    type:'GET',
    dataType:'json',
    data: data,
    url: url,
    async:true,
    success: function(data){
      //console.log(data);
      //Loop through and push the data into the empty arrays for Population and Airports
      for (i = 0; i < data.length; ++i) {

         xCat.push(data[i].name);
         numAirports.push((data[i].Population*1000000/data[i].Airports));
  //Build an array of arrays for a scatterplot
        // popArray.push(data[i].Population);
         //airportArray.push(data[i].Airports);
         //outerArray.push([data[i].Population, data[i].Airports]);
      }

      //Call the function that builds the chart
      buildChart();
    }
  });//close AJAX call

console.log(xCat);
//console.log(popArray);
function buildChart() {

  var myChart = Highcharts.chart('bar-chart', {

      chart: {
          type: 'column'//same thing as bar chart, just vertical
      },
      title: {
          text: 'So You Think <em>Your </em> Airport is Crowded?'
      },
      subtitle: {
          text: 'Source: CIA World FactBook'
      },
      xAxis: {
          categories: xCat
      },
      yAxis: {
          //min: 0,
          title: {
              text: 'Number of People for Every One Airport'
          }
      },
      //ADD TOOLTIP & PLOTOPTIONS AFTER YOU DEMOSTRATE THE BASIC CHART
      tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
      },
      plotOptions: {
          column: {
              pointPadding: 0.1,//CHANGE THE WIDTH AND PADDING OF THE BARS
              borderWidth: 0
          }
      },
      series: [{
          name: 'Number of People for Every Airport',
          data: numAirports

      }
    ]

  });

//SCATTERPLOT
  Highcharts.chart('scatterplot', {
    chart: {
        type: 'scatter',
        zoomType: 'xy'
    },
    title: {
        text: 'Population v. Airports'
    },
    subtitle: {
        text: 'CIA'
    },
    xAxis: {
        title: {
            enabled: true,
            text: 'Population'
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
    },
    yAxis: {
        title: {
            text: 'Airports'
        }
    },
  /*  legend: {
        layout: 'vertical',
        align: 'center',
        verticalAlign: 'top',
        x: 100,
        y: 70,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
        borderWidth: 1
    },*/
    plotOptions: {
        scatter: {
            marker: {
                radius: 5,
                states: {
                    hover: {
                        enabled: true,
                        lineColor: 'rgb(100,100,100)'
                    }
                }
            },
            states: {
                hover: {
                    marker: {
                        enabled: false
                    }
                }
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x} million people, {point.y} airports'
            }
        }
    },
    series: [{
        animation: {
                duration: 4000
            },
        color: 'rgba(223, 83, 83, .5)',
        data: outerArray,
        //name:xCat
      }
    ]
});


 }



});
