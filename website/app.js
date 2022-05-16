

/* Global Variables */

const apiKey = ",us&appid=7a5b236741380b27faa6c9ec8c4c04c9&units=imperial" 
const baseUrl = `http://api.openweathermap.org/data/2.5/weather?zip=`

// Create a new date instance dynamically with JS

let d = new Date();

let newDate = d.getMonth()+1+'/'+ d.getDate()+'/'+ d.getFullYear();

const serverLink= "http://localhost:4040"


//making info function that going to fire when generate button clicked
let info = async ()=>{

 // grabing the user input and zip code entared from the user 
   let zipCode = document.querySelector('#zip').value
   // let userInput = document.querySelector('#feelings').value

 //Verify that the zip code and user input is not empty
   if(zipCode===""){
   // || userInput===""){
      alert("ZipCode")
   }else{

    //fetching the city info from the api using the zip code
      await fetch(baseUrl + zipCode + apiKey).then(data => {
      data.json().then((newData)=>SendInfo(newData))//userInput))  
      })
   }
}

//sending the temp , name of the city, date and userinput to the server 
let SendInfo = async (newData,userInput)=>{
   let city = newData.name
   let temp = newData.main.temp
   await fetch(serverLink+"/add",{
   method:"post"
   ,headers: {
    'Content-Type': 'application/json'
    },
   body: JSON.stringify({date:newDate,city:city,temp:temp})//,userInput:userInput})
   }).then(ReceiveInfo())
}

// grabing the the data from the server to display it on the ui
async function ReceiveInfo(){
   fetch(serverLink+"/all").then(response => response.json()).then(data => updateUI(data))
}

//updateing the ui with the data came from the server
 function updateUI(data){
 //  document.querySelector('#userFeel').innerHTML= `${data.userInput}`
   document.querySelector('#temp').innerHTML=`the temperature is ${data.temperature} F `
   document.querySelector('#city').innerHTML=`you are now in ${data.city}`
}

//no need to grab the date form the server so i made it to display on the screen even if the user didn't enter a zip code 
document.querySelector('#date').innerHTML=`today's date ${newDate}`


//click event to fire info function
document.querySelector('#generate').addEventListener("click",info)



