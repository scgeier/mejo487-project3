$(document).ready(function () {

    console.log("This B is reaadyy!");

    var url = './js/south_american_poverty_rate.json';
    //var urlArray = [url, url2];
    var data = [];
    var xCat = [];
    var years = [];
    var gdp_numbers = [];
    var outerArray = [];


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

         xCat.push(data[i].years);
        // numAirports.push((data[i].Population*1000000/data[i].Airports));
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

    function buildChart(){
        var myChart = Highcharts.chart('poverty_rate', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Poverty rate in South America'
            },
            subtitle: {
                text: 'Source: World Bank Data Poverty Rate'
            },
            xAxis:{
                categories: xCat
            },
            yAxis:{
                title: 'Poverty Rate in major South American Countries'
            }
    
        });
    }// end of buildChart function



}); //.ready function