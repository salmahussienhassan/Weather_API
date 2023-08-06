var search= document.getElementById('search');
   var forecastArr;
var loc;

//////////////////////////// fetch weather api
  async function  getData(country) {
    var data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7b54519a12784cae841225931230508&q=${country}&days=3`)
    data = await data.json()
    // console.log(data);
 forecastArr=data.forecast.forecastday;
  loc=data.location.name
// console.log(loc)
//   console.log(forecastArr)
  display();
  }
  
  getData('egypt')


// //////////////////////////////////Fuction display 3days

  function display(){
var box='';
////////////////////////////////// display first day in first card
for(var i=0;i<1;i++)
{
// var date= forecastArr[i].date;
   
    // console.log(date)
    var condtionObj=forecastArr[i].day.condition
 
    // console.log(condtionObj)
    // var text=condtionObj.text
    // console.log(text)
    // var temp=forecastArr[i].day.maxtemp_c

    // console.log(temp)
    var dateStr = forecastArr[i].date;;
    var options = { weekday: 'long', month: 'long', day: 'numeric' };
    
    var date = new Date(dateStr);
    var formattedDate = date.toLocaleDateString('en-US', options);
    
    var dayName = formattedDate.split(", ")[0];
    var dateInfo = formattedDate.split(", ")[1];
    
    // console.log(dayName);   // Saturday
    // console.log(dateInfo);  // August 5

    box+=`<div class="col-md-4 d-flex flex-column justify-content-stretch ">
    <div class="card-item rounded-start-3  h-100 " >
      

        <div class="title  py-2 px-3 d-flex justify-content-between align-items-center">
          <h6 class=" fw-light mb-2 ">${dayName}</h6>
          <h6 class="fw-light mb-2 ">${dateInfo}</h6>
        </div>

       <div class="card-body rounded-bottom-3 py-3 px-4">
        <h5 class="text-white">${loc}</h5>

        <div class="main-title my-4 d-flex justify-content-between align-items-center">
          <h2 class="display-1 fw-bold text-white">${forecastArr[i].day.maxtemp_c}</h2>
          <img class="img-fluid" src="${condtionObj.icon}" alt="">
        </div>
        <p class="card-text">${condtionObj.text}</p>

        <ul class="list-unstyled d-flex justify-content-start gap-2 align-items-center">
          <li class="text-white"><img src="./img/icon-umberella.png" alt=""> <span>${forecastArr[i].day.daily_chance_of_rain }%</span></li>
         
          <li class="text-white"><img src="./img/icon-wind.png" alt=""> <span>${forecastArr[i].day.maxwind_kph } km/h</span></li>
          <li class="text-white"><img src="./img/icon-compass.png" alt=""> <span>East</span></li>
        </ul>
       </div>
        
        
   
    </div>
  </div>`
   

}

//////////////////////////////// display another two days in cards
for(var i=1;i<3;i++)
{
// var date= forecastArr[i].date;
   
    // console.log(date)
    var condtionObj=forecastArr[i].day.condition
 
    // console.log(condtionObj)
    // var text=condtionObj.text
    // console.log(text)
    // var temp=forecastArr[i].day.maxtemp_c

    // console.log(temp)
    var dateStr = forecastArr[i].date;;
    var options = { weekday: 'long', month: 'long', day: 'numeric' };
    
    var date = new Date(dateStr);
    var formattedDate = date.toLocaleDateString('en-US', options);
    
    var dayName = formattedDate.split(", ")[0];
   
    
    // console.log(dayName);  
   

    box+=` <div class="col-md-4 d-flex flex-column justify-content-stretch">
    <div class="card-item rounded-start-3 h-100 " >
      

        <div class="title text-center py-2 px-3">
          <h6 class="   fw-light mb-2 ">${dayName}</h6>
          
        </div>

       <div class="card-body text-center rounded-bottom-3 py-3 px-4">
        

        <div class="main-title my-4 text-center">
          <img class="img-fluid" src="${condtionObj.icon}" alt="">
          <h2 class="fw-bold text-white">${forecastArr[i].day.maxtemp_c}</h2>
          <h6 class="   fw-light mb-2 ">${forecastArr[i].day.mintemp_c}</h6>
          
        </div>
        <p class="card-text">${condtionObj.text}</p>
       
      
       </div>
        
        
   
    </div>
  </div>`
   

}
document.getElementById('Row').innerHTML=box;
  }
  ////////////////////////////// handle real-time search
  
  search.addEventListener('keyup',function(){
    getData(this.value);
  })


///////////////////////////////////////// get current location
var liveLocation;


    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async function (position) {
          var lat = position.coords.latitude;
          var lon = position.coords.longitude;
          var response=await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
            response= await response.json() ;
        liveLocation= response.address.country;
        console.log(liveLocation)
         
      }); 
    }
    else console.log('error')



  