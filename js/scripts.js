$( document ).ready(function() {
  var apiKey = "AIzaSyB-iQu9eZoF5irnM2WijDrd_38rE033Yes";
  var spreadsheetId = "1ALtcilmyBoKz4mrDKA1R2It0HXY1a_0yskkuYfD24gs";
  
  const Http = new XMLHttpRequest();
  const url="https://sheets.googleapis.com/v4/spreadsheets/" +
    spreadsheetId + "/values/Sheet1!M3:N11" + "?key="+apiKey+"&majorDimension=COLUMNS";
  
  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = (e) => {
    if (Http.readyState == 4 && Http.status == 200) {
      var parsed_data = JSON.parse(Http.responseText);
      var max = parsed_data.values[0];
      var values = parsed_data.values[1];
      for(i=0; i < values.length; i++) {
        barId = "bar" + i;
        valueId = "value" + i;
        var bar = document.getElementById(barId);
        var display = document.getElementById(valueId);

        dataVal = parseInt(values[i])
        dataPercentage = dataVal * 100 / parseFloat(max[i])

        bar.setAttribute("data-value", parseFloat(dataPercentage))
        display.innerHTML = parseInt(dataVal)
      };

      $(".progress").each(function() {
  
        var value = $(this).attr('data-value');
        var left = $(this).find('.progress-left .progress-bar');
        var right = $(this).find('.progress-right .progress-bar');
    
        if (value > 0) {
          if (value <= 50) {
            right.css('transform', 'rotate(' + percentageToDegrees(value) + 'deg)')
          } else {
            right.css('transform', 'rotate(180deg)')
            left.css('transform', 'rotate(' + percentageToDegrees(value - 50) + 'deg)')
          }
        }
    
      })
    
      function percentageToDegrees(percentage) {
    
        return percentage / 100 * 360
    
      }
    }
  }

  
});
  
  function googleApiCall() {
    
  }

