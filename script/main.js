var tipButtons = document.querySelectorAll(".tip-buttons");
for(var i = 0; i < tipButtons.length; i++){
    tipButtons[i].addEventListener("click", function(e){
        resetActiveButton();
        var targetEl = e.target;
        var tipPercentage = parseFloat(e.target.value);
        validateTip(targetEl, tipPercentage);
});
}
var customTipButton = document.querySelector(".custom-tip-button");
customTipButton.addEventListener("blur", function(e){
    resetActiveButton();
    var targetEl = e.target;
    var tipPercentage = parseFloat(e.target.value);
    validateTip(targetEl, tipPercentage);
});
function validateTip(targetEl, tipPercentage){
    var bill = document.getElementById("bill-input").value;
    var numberOfPeople = document.getElementById("people-input").value;
    var billNum = parseFloat(bill);
    var peopleNum = parseFloat(numberOfPeople);
    if((bill !== "") && (numberOfPeople !== "")){
        // Active design sec
        targetEl.classList.add("active-button");
        changeResetButtonDesign();
        // Calculation sec
        var totalTip = (billNum * tipPercentage) / 100;
        var perPersonTip = totalTip / peopleNum;
        var perPersonTotal = (billNum + totalTip) / peopleNum;
        // Insert calculation into DOM
        document.getElementById("calc-tip").textContent = "$" + perPersonTip.toFixed(2);
        document.getElementById("calc-total-tip").textContent = "$" + perPersonTotal.toFixed(2);
    } else {
        if(bill === ""){
            document.querySelector("#bill-text-sec p").className = "error-text-active";
        } else {
            removeBillErrorText();
        }
        if(numberOfPeople === ""){
            document.querySelector("#people-text-sec p").className = "error-text-active";
        } else {
            removePeopleErrorText();
        }
    }
}
// Function to remove error text
function removeBillErrorText(){
    document.querySelector("#bill-text-sec p").className = "error-text-inactive";
}
function removePeopleErrorText(){
    document.querySelector("#people-text-sec p").className = "error-text-inactive";
}
// Onblur remove error text
document.getElementById("bill-input").onblur= function(){
    if(this.value !== ""){
        removeBillErrorText();
    }
}
document.getElementById("people-input").onblur= function(){
    if(this.value !== ""){
        removePeopleErrorText();
    }
}
// Reset active tip button design
function resetActiveButton(){
    var activeButtons = document.querySelectorAll(".tip-buttons, .custom-tip-button");
    for(var j = 0; j < activeButtons.length; j++){
        activeButtons[j].classList.remove("active-button");
    }
}
var resetButton = document.getElementById("reset-button");
// Reset the design of reset button
function changeResetButtonDesign(){
    resetButton.classList.remove("reset-button-inactive");
    resetButton.classList.add("reset-button-active");
}
// Reset button
resetButton.onclick = function(){
    document.querySelector("#form-sec form").reset();
    resetButton.classList.remove("reset-button-active");
    resetButton.classList.add("reset-button-inactive");
    removeBillErrorText();
    removePeopleErrorText();
    resetActiveButton();
    var tipAmountText = document.querySelectorAll(".tip-amount h2");
    for(var i = 0; i < tipAmountText.length; i++){
        tipAmountText[i].textContent = "$0.00";
    }
};

// Add percentage sign to the custom button
document.getElementById("custom-tip-input").onblur = function(){
    if(this.value !== ""){
      this.value = this.value + "%";
    }
};
// Script to only allow number values in text input field
setInputFilter(document.getElementById("custom-tip-input"), function(value) {
    return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
});
// Restricts input for the given textbox to the given inputFilter function.
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
      textbox.addEventListener(event, function() {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          this.value = "";
        }
      });
    });
}