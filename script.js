

output("p","bot","Welcome <br> Say Hi to start the conversation.....");

var user_input=document.getElementById("input")


user_input.addEventListener("click",function loadDoc() {
  var xhttp = new XMLHttpRequest();
  try{
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      
    var data= JSON.parse(this.responseText);
    var msg=document.getElementById("inp").value;
    
    document.getElementById("inp").value="";
    
    output("p","user",msg);
    
    if(msg=="Hi" || msg=="hi" || msg=="hy" || msg=="Hy")
    {
      output("p","bot",get_timeofday_greeting()+","+Greeting()+"<br>"+data["menu"]);
    }

    else if(msg.length==1)
    {
      if(data[msg]){
         output("p","bot",data[msg]);
         if(msg=="4"){
          output("p","bot","Say hi to restart the bot");
        }
      }

      else{
          output("p","bot","Plz enter only a number [1-3]");
      }
    }

    else if(msg.includes("calculate")){
      evaluator(msg.split(" ")[1]);
    }

    else if(msg.includes("fruit") || msg.includes("vegetable") || msg.includes("biscuit"))
    {
      try{
        output("p","bot"," "+data[msg.split(" ")[1]]);
      }
      catch(e){
        output("p","bot","Item not found,we are working on that");
      }
    }

    else if(msg.includes("BMI")){
      var str=msg.split(" ")[1];
      var str1=str.split(",");
      var str2=str1[1].split(".");
      var bmi=parseInt(str1[0])/((0.3048*parseInt(str2[0])+0.0254*parseInt(str2[1]))*(0.3048*parseInt(str2[0])+0.0254*parseInt(str2[1])));
      output("p","bot","Your BMI value is :"+bmi);
    }

    else if(msg.includes("back")){
      output("p","bot",data["menu"]);
    }

    else{
      output("p","bot","Sorry I didnt get that");
    }

  }

 };

  xhttp.open("GET", "file.json", true);
  xhttp.send();
  }

  catch(e){
    output("p","bot","Sorry I didnt get that");
  }

}

);


function output(tag,className,text){

  var reply= document.getElementById("main")


  if(className=="bot"){
    reply.innerHTML+=`<img class="bot_image" 
    src="https://46ba123xc93a357lc11tqhds-wpengine.netdna-ssl.com/wp-content/uploads/2019/06/becoming-human-chatbot-300x175.jpg">`;
  }

  if(className=="user"){
    reply.innerHTML+=`<img  class="user_image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTrbGOT7l_cyQNoFXn8BuCGrPmTEdlrc-keug&usqp=CAU">`;
  }

  if(className=="image"){
    reply.innerHTML+=`<img class="bot_image" 
    src="https://46ba123xc93a357lc11tqhds-wpengine.netdna-ssl.com/wp-content/uploads/2019/06/becoming-human-chatbot-300x175.jpg">`;
  }

  reply.innerHTML+=`<${tag} class=${className}>${text}</${tag}>`
}


function Greeting(){ 

  res=[" Nice to see you. I can provide the following options for you", 

  " Its a pleasure chatting with you. Here are the options I can provide you"];  
  
  return res[Math.floor((Math.random() * res.length) + 1)-1];
  
}

function get_timeofday_greeting(){

    var date = new Date();
    var current_time = date.getHours();
    let timeofday_greeting ="Good Morning"
    if(current_time>21)
        timeofday_greeting ="Good Night"
    else if(current_time>16)
        timeofday_greeting ="Good Evening"
    else if(current_time>=12)
        timeofday_greeting ="Good AfterNoon"
    
    return timeofday_greeting ;

}


function evaluator(expression){

    
    try{
        output("p","bot","Result of the expression:"+eval(expression)); 
        output("p","bot","If you want to calculate another expression enter the expression or "+"<br>"+ "enter back")
    }
    catch(e){
       output("p","bot","Enter a valid expression"); 
    }
        
}



