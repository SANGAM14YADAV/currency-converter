const BASE_URL =
  "https://cdn.jsdelivr.net/gh/irfanokr/currency-api@main/v1/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const btnn=document.querySelector("#convert-btn");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msgs=document.querySelector(".msg");
const voice=document.querySelector("#voice");
const amountInput=document.querySelector("#values");

for(let select of dropdowns){
 for(let currCode in countryList ){
       let newOption=document.createElement("option")
       newOption.innerText=currCode;
       newOption.value=currCode;
       if( select.name==="from" && currCode==="INR"){
        newOption.selected="selected";
       }
       else if( select.name==="to" && currCode==="USD") {
        newOption.selected="selected";
        
       }
      select.append(newOption)
   }
    select.addEventListener("click", (evt) =>{
        updateFlag(evt.target);
    });
}
const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img= element.parentElement.querySelector("img");
  img.src=newSrc;

}
btnn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
   if (amtVal==="" || amtVal <1){
       amtVal=1;
       amount.value="1";
   }
const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
let response=await fetch(URL);
let data=await response.json();
let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

let finalAmount=amtVal*rate;
msgs.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
});


const speechrecognition= window.SpeechRecognition ||
window.webkitSpeechRecognition;
if(speechrecognition){
    const recognition=new speechrecognition();
    recognition.lang="en-IN";
    recognition.onresult=(e) =>{
        
        const spokenText=e.results[e.resultIndex]
        [0].transcript;
        amountInput.value=spokenText.replace(".","");
    }
    voice.addEventListener("click",()=>{
        recognition.start();

    });

}else{
    alert("speech recognition is not supported in this browser.");
}











  