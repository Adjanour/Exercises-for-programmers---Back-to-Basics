let tipPercentage = 0;
let billAmmount = 0;
let tip = 0;
let total = 0;
let tipRate = 0;
let roundedTip = 0;

const tipRateElement = document.getElementById("tipRate");
const billAmmountElement = document.getElementById("billAmmount");
const tipDisplay = document.getElementById("tip");
const totalDisplay = document.getElementById("total");
const button = document.getElementById("button");
const content = document.getElementById("content");

button.addEventListener('click', (e) => {
    e.preventDefault();
    calculateTip();
});

const calculateTip = () => {
    validate(tipRateElement) ? "" : notify("Ensure the tip is not empty");
    validate(billAmmountElement) ? "" : notify("Ensure the bill amount is not empty");
    if (validate(tipRateElement) && validate(billAmmountElement)) {
        tipRate = parseFloat(tipRateElement.value);
        billAmmount = parseFloat(billAmmountElement.value);
        tip = billAmmount * (tipRate.toFixed(2) / 100);
        total = billAmmount + tip;
    }
    tipDisplay.textContent = `${tip.toLocaleString("en-US", { style: "currency", currency: "USD" })}`;
    totalDisplay.textContent = `${total.toLocaleString("en-US", { style: "currency", currency: "USD" })}`;
};

const validate = (element) => {
    let status = false
    if (!element.value){
        status=false
    }
    else{
        status = true
    }
    return status;
};

const notify = (message) => {
    const div = document.createElement("div");
    const notificationContent = document.createElement("div");
    const closeBtn = document.createElement("button");

    closeBtn.setAttribute("class", "close-button");
    div.setAttribute("class", "notification");
    notificationContent.setAttribute("class", "notification-content");

    const divContent = document.createTextNode(message);
    const closeBtnContent = document.createTextNode("X");

    notificationContent.appendChild(divContent);
    closeBtn.appendChild(closeBtnContent);
    closeBtn.addEventListener('click', () => {
        removeNotification(div);
    });
    div.appendChild(closeBtn);
    div.appendChild(notificationContent);
    document.body.insertBefore(div, content);

    setTimeout(() => {
        removeNotification(div);
    }, 5000);
};

const removeNotification = (notification) => {
    notification.remove();
};
