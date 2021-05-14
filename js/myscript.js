
var myVar ;

function startData () {
    myVar = setInterval(getData, 1000);
    }

function stopData () {
clearInterval(myVar);
}

function getData () { 
    var tryCount = 0
    $.ajax({
        type: "get",
        url: "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=363&date=15-05-2021",
        dataType: "json", 
        success: function(data){
            console.log(data["centers"]);
            var count = 0 ;
            tryCount = 0 ;
            for(var i = 0; i < data["centers"].length; i++) {
                var center = data["centers"][i];
                for(var x = 0; x < center["sessions"].length; x++) {
                    var y = center["sessions"][x];
                    if (y["min_age_limit"] == 18 && y["available_capacity"] > 0 ){
                    console.log( y["vaccine"] + " at " + center["pincode"] + "for age " + 
                      + y["min_age_limit"] + " for date: " + y["date"] );
                      count = count + 1 ;
                    }
                    if (y["min_age_limit"] < 50 && y["available_capacity"] > 0 ){
                    console.log( y["vaccine"] + " at " + center["pincode"] + "for age " + 
                      + y["min_age_limit"] + " for date: " + y["date"] );
                      count = count + 1 ;
                    }
                }
    
            } 
            if (count == 0) {
                $("p").append("<br> <b>No Vaccine Available in pune</b>.");
            };

        }
    
    }) ;
    tryCount = tryCount +1;
     
 
}
 