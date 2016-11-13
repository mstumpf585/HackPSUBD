$(document).ready(function(){



    jQuery.get('output.txt', function(data){
	alert(data);

	var temp = data 
	if(temp != 9){

		fetchWeather();
	}else{

		window.location.href = "black.html";
	}//end if


    });

    //$('#weatherButton').click(function() {
		//fetchWeather();
	//});

	function fetchWeather(){
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            jsonp: "callback", jsonpCallback: "callback",
            url: "http://apidev.accuweather.com/forecasts/v1/hourly/24hour/335315?apikey=PSUHackathon112016",
            cache: false,
            success: function(data) {
                //alert(JSON.stringify(data[0].Temperature.Value + data[0].Temperature.Unit))
                
                //  urrent Conditions
				var temp1 = JSON.stringify(data[0].Temperature.Value + " " + data[0].Temperature.Unit);
				temp1 = temp1.substring(1,(temp1.length)-1);
                $("#hr0-current").text("Current Temperature: " + temp1);
				var condition = JSON.stringify(data[0].IconPhrase);
				condition = condition.substring(1,(condition.length)-1);
                $("#hr0-precip").text("Conditions are " + condition);
				
				$("#current_image").attr('src','\\HackPSU-2016\\' + Hour1APICond(condition,data));                
            },
			error: function(){
				setTimeout(fetchWeather,100);
			}
        });//end ajax call
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            jsonp: "callback", jsonpCallback: "callback",
            url: "http://apidev.accuweather.com/forecasts/v1/daily/5day/335315?apikey=PSUHackathon112016",
            cache: false,
            success: function(data1) {
                //alert(JSON.stringify(data1))
                //$("#hr0-high").text("Test of 5 day forecast " + JSON.stringify(data1));
                
                //  Today
                $("#hr1-high").text("High: " + JSON.stringify(data1.DailyForecasts[0].Temperature.Maximum.Value + " " + data1.DailyForecasts[0].Temperature.Maximum.Unit));
                $("#hr1-low").text("Low: " + JSON.stringify(data1.DailyForecasts[0].Temperature.Minimum.Value + " " + data1.DailyForecasts[0].Temperature.Minimum.Unit));
				$("#hr1-time").text("Date: "+ JSON.stringify(data1.DailyForecasts[0].Date));
				var condition1 = JSON.stringify(data1.DailyForecasts[0].Day.IconPhrase);
				condition1 = condition1.substring(1,(condition1.length)-1);
				$("#today_image").attr('src','\\HackPSU-2016\\' + DayAPICond(condition1));
                
                //  Tomorrow
                $("#hr2-high").text("High: " + JSON.stringify(data1.DailyForecasts[1].Temperature.Maximum.Value + " " + data1.DailyForecasts[1].Temperature.Maximum.Unit));
                $("#hr2-low").text("Low: " + JSON.stringify(data1.DailyForecasts[1].Temperature.Minimum.Value + " " + data1.DailyForecasts[1].Temperature.Minimum.Unit));
				$("#hr2-time").text("Date: "+ JSON.stringify(data1.DailyForecasts[1].Date));
				var condition2 = JSON.stringify(data1.DailyForecasts[0].Day.IconPhrase);
				condition2 = condition2.substring(1,(condition2.length)-1);
				$("#today_image").attr('src','\\HackPSU-2016\\' + DayAPICond(condition2));
				
				//  next Day
                $("#hr3-high").text("High: " + JSON.stringify(data1.DailyForecasts[2].Temperature.Maximum.Value + " " + data1.DailyForecasts[2].Temperature.Maximum.Unit));
                $("#hr3-low").text("Low: " + JSON.stringify(data1.DailyForecasts[2].Temperature.Minimum.Value + " " + data1.DailyForecasts[2].Temperature.Minimum.Unit));
				$("#hr3-time").text("Date: "+ JSON.stringify(data1.DailyForecasts[2].Date));
				var condition3 = JSON.stringify(data1.DailyForecasts[0].Day.IconPhrase);
				condition3 = condition3.substring(1,(condition3.length)-1);
				$("#today_image").attr('src','\\HackPSU-2016\\' + DayAPICond(condition3));
                  
            },//end success function
			error: function(){
				setTimeout(fetchWeather,100);
			}
        });//end ajax call
	}//end fetch weather
	function Hour1APICond(IconPhrase,data)
	{
	if (data[0].isDaylight)
		{
		if (IconPhrase.includes("Partly"))
			return "PartiallyCloudy.png";
		if (IconPhrase.includes("Showers") || IconPhrase.includes("Rain")) 
			return "Rainy.png";
		if (IconPhrase.includes("Cloudy") || IconPhrase.includes("Clouds")) 
			return "Cloudy.png";
		if (IconPhrase.includes("Sunny") || IconPhrase.includes("Clear"))
			return "Sunny.png";
		if (IconPhrase.includes("Thunderstorms"))
			return "Storm.png";
		if (IconPhrase.includes("Snow") || IconPhrase.includes("Flurries"))
			return "Snowing.png";
		else
			return "PartiallyCloudy.png";
		}
	else 
		{
		if (IconPhrase.includes("Fog"))
			return "night_cloudy.png"; 	
		if (IconPhrase.includes("Showers") || IconPhrase.includes("Rain")) 
			return "NightRainy.png"; 
		else
			return "Moon.png";
		}
	}
	function DayAPICond(IconPhrase)
	{
		if (IconPhrase.includes("Partly"))
			return "PartiallyCloudy.png";
		if (IconPhrase.includes("Showers") || IconPhrase.includes("Rain")) 
			return "IconPhrase = Rainy.png";
		if (IconPhrase.includes("Cloudy") || IconPhrase.includes("Clouds")) 
			return "IconPhrase = Cloudy.png";
		if (IconPhrase.includes("Sunny") || IconPhrase.includes("Clear"))
			return "Sunny.png";
		if (IconPhrase.includes("Thunderstorms"))
			return "Storm.png";
		if (IconPhrase.includes("Snow") || IconPhrase.includes("Flurries"))
			return "Snowing.png";
		else
			return "PartiallyCloudy.png";
	}
  
});   


