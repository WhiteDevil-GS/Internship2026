const form = document.getElementById("registrationForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", function(e){

e.preventDefault();

let isValid = true;

clearErrors();

if(nameInput.value.trim() === ""){
showError(nameInput,"Name is required");
isValid=false;
}

if(!validateEmail(emailInput.value)){
showError(emailInput,"Enter a valid email");
isValid=false;
}

if(passwordInput.value.length < 8){
showError(passwordInput,"Password must be at least 8 characters");
isValid=false;
}

if(confirmPasswordInput.value !== passwordInput.value){
showError(confirmPasswordInput,"Passwords do not match");
isValid=false;
}

if(isValid){

successMessage.textContent="Form submitted successfully!";
successMessage.classList.add("success");

form.reset();

}

});

function showError(input,message){

const error = input.parentElement.querySelector(".error");
error.textContent = message;

}

function clearErrors(){

const errors = document.querySelectorAll(".error");
errors.forEach(err => err.textContent="");

successMessage.textContent="";

}

function validateEmail(email){

const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return regex.test(email);

}