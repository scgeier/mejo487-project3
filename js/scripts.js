$(document).ready(function () {

    console.log("This B has been fixed by Uncle Scott!");

//THE ./ BEFORE THE URL BREAKS THE PATH
    var url = 'js/south_american_poverty_rate.json';

    var data = [];
    var xCat = [];
    var years = [];
    var gdp_numbers = [];
    var outerArray = [];
  //INITIALIZE EMPTY ARRAYS FOR EACH COUNTRY IN YOUR LINE CHART. CONTINUE FROM HERE
    var argentina = [];
    var bolivia = [];



 $.ajax({
    type:'GET',
    dataType:'json',
    data: data,
    url: url,
    async:true,
    success: function(data){

      for (i = 0; i < data.length; ++i) {
//NOTE THAT YEAR IS CAPITALIZED IN YOUR JSON
         xCat.push(data[i].Year);
//BUILD AN ARRAY FOR THE ARGENTINA POVERTY RATE FOR EACH YEAR
         argentina.push(data[i].Argentina);
//BUILD AN ARRAY FOR THE ARGENTINA POVERTY RATE FOR EACH YEAR
         bolivia.push(data[i].Bolivia);
//CONTINUE WITH THE OTHER COUNTRIES...
      }

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
            yAxis:{
              title: {
                   text: 'Poverty Rate'
               }
            },
  //TIME-BASED LINE CHARTS IN HC USE THIS CODE TO SET THE YEARS
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 1987
                }
            },
    //MAKE EACH LINE IN YOUR CHART USING THE ARRAYS YOU BUILT ABOVE
            series: [
              {
                name: 'Argentina',
                data: argentina
            },
            {
              name: 'Bolivia',
              data: bolivia
            }
          ]
        });
    }// end of buildChart function



}); //.ready function
