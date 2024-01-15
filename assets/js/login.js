
//geting html elements using dom ----------------------------
const form =document.querySelector('form');
const email=document.querySelector('input[type=email]');
const pass=document.querySelector('input[type=password]');
const error=document.getElementById('error-ms');
const check=document.getElementById('check')
const war=document.getElementById('war');
const erPass=document.getElementById('err-pass');
//create a event using onkeyup---------------
function onSubmit(event){
    //check email valid--------------------------


}

function passErr(){
   if(!email.value.match((/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/))){
      error.innerHTML='Please Enter a Valid Email';
      email.style.border   = '2px solid red';
      war.style.display='block';
      error.style.top='120%'
      check.style.display='none'
  }else{
          error.style.top='100%'
          error.innerHTML='';
          email.style.border = '2px solid Green';
          check.style.display='block'
          war.style.display='none'
           
       }
     let pass2=pass.value;
     if(pass2!='sinan1234'){
        erPass.innerHTML='incorrect password'
        pass.style.border="2px solid red"
     } 
     if(!pass2){
        erPass.innerHTML='please enter password';
        pass.style.border="2px solid red"
     }
     

}

function passKey(){
    let pass2=pass.value;
    if(pass2.length <=5){
        erPass.innerHTML='please enter 6 or more letters/numbers';
     }
     else{
        erPass.innerHTML='';
     }
  
}