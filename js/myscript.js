
var myVar ;
var myDistrict ;
var myDistName ;
var myAge ;

$( document ).ready(function() {
    $(".dropdown-menu li a").click(function(){
        $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
        $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
      });

});

function updateScroll(){
    var element = document.getElementById("mycomments");
    //console.log(element.innerHTML);
    element.scrollTop = element.scrollHeight;
}

function setDistrict (id, city) {
     myDistrict = id ;
     myDistName = city ;
    }

function setAge (age) {
    myAge = age ;
    }

function startData () {
        if ( myDistrict == undefined ){
            $(".alert").show();
            $(".alert").empty();
            $(".alert").append('<span>Please select the District.</span>');
             
        }else if ( myAge == undefined ){
            $(".alert").show();
            $(".alert").empty();
            $(".alert").append('<span>Please select the Age.</span>');
             
        } else  if( myDistrict != undefined  && myAge != undefined ){
            getData();
            if ( myVar != undefined ){
              clearInterval(myVar);
            }
            myVar = setInterval(getData, 3000);
            $(".alert").hide();
            $("p").append("<br> <b>Monitoring is started</b>.<br>");
            updateScroll();
            }
    }

function stopData () {
clearInterval(myVar);
$("p").append("<br> <b>Monitoring is stopped</b>.<br>");
updateScroll();
}

function getData () { 
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 
    
    if(mm<10) 
    {
        mm='0'+mm;
    } 
    today = dd+'-'+mm+'-'+yyyy;
    console.log(today);
     var myurl = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id="+myDistrict+"&date="+today  ;
     console.log(myurl);

    var tryCount = 0
    $.ajax({
        type: "get",
        url: myurl,
        //url: "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=363&date=15-05-2021",
        dataType: "json", 
        success: function(data){
            //console.log(data["centers"]);
            var count = 0 ;
            tryCount = 0 ;
            for(var i = 0; i < data["centers"].length; i++) {
                var center = data["centers"][i];
                for(var x = 0; x < center["sessions"].length; x++) {
                    var y = center["sessions"][x];
                    if (y["min_age_limit"] <= myAge && y["available_capacity"] > 0 ){
                    // console.log("Vaccine available: " + y["vaccine"] + " at " +  center["address"] + "for age above " + 
                    //   + y["min_age_limit"] + " on date: " + y["date"] );
                    
                      $("p").append( "Vaccine available: " + y["vaccine"] + " at " +  center["address"] + "for age above " + 
                      + y["min_age_limit"] + " on date: " + y["date"] + ".<br>");
                      count = count + 1 ;
                      updateScroll();
                    }
                }
    
            } 
            if (count == 0) {
                var todayDate = new Date().toUTCString();
                $("p").append( todayDate + " No Vaccine Available in " +  myDistName + " for age above " + myAge + ".<br>");
                updateScroll();
            }; 

        }
    
    }) ;
    tryCount = tryCount +1;
     
 
}



 