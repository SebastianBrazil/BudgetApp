import { getLocalStorage, saveToLocalStorage, removeFromLocalStorage } from "./localStorage.js";

let budgetBtn = document.getElementById("budgetBtn");
let addEBtn = document.getElementById("addEBtn");
let removeEBtn = document.getElementById("removeEBtn");
let infoPlacement = document.getElementById("infoPlacement");
let inputData = document.getElementById("inputData");
let popMoney = document.getElementById("popMoney");

let isBudgetOpen = false;
let isAddOpen = false;
let isRemoveOpen = false;

function popBudget() {
    let storedNotes = getLocalStorage();

    storedNotes.forEach(note => {
        let holderDiv = document.createElement("div");
        holderDiv.className = "my-2 grid grid-cols-2";

        let noteName = document.createElement("p");
        noteName.className = "col-span-1 mx-1 p-1 text-left text-base";
        // noteName.textContent = nameTaskL;

        let noteAmount = document.createElement("p");
        noteAmount.className = "col-span-1 mx-1 p-1 text-right text-base";
        // taskPriority.textContent = "Priority: " + priorityTaskL;

        holderDiv.appendChild(noteName);
        holderDiv.appendChild(noteAmount);
        infoPlacement.appendChild(holderDiv);
    });
};

budgetBtn.addEventListener('click', function () {
    isAddOpen = false;
    isRemoveOpen = false;
    inputData.innerHTML = "";

    if (isBudgetOpen === false) {
        let holderDiv = document.createElement("div");
        holderDiv.className = "my-2";

        let title = document.createElement("p");
        title.className = "mx-1 p-1 text-center text-lg";
        title.textContent = "Set Budget";

        let innerDiv1 = document.createElement("div");
        innerDiv1.className = "flex justify-center";

        let input = document.createElement("input");
        input.className = "rounded-lg w-40 text-base h-7";
        input.setAttribute("placeholder", "Enter Amount");
        input.setAttribute("type", "text");
        innerDiv1.appendChild(input);

        let innerDiv2 = document.createElement("div");
        innerDiv2.className = "flex justify-center mt-2";

        let button = document.createElement("button");
        button.className = "rounded-lg bg-blue-400 w-32 text-base";
        button.innerText = "Set";
        button.addEventListener('click', function () {
            if(input.value !== "" && !isNaN(input.value)){


                inputData.innerHTML = "";
                isBudgetOpen = false;
            };
        });
        innerDiv2.appendChild(button);
        holderDiv.appendChild(title);
        holderDiv.appendChild(innerDiv1);
        holderDiv.appendChild(innerDiv2);
        inputData.appendChild(holderDiv);

        isBudgetOpen = true;
    } else {
        isBudgetOpen = false;
    }
});

addEBtn.addEventListener('click', function () {
    isBudgetOpen = false;
    isRemoveOpen = false;
    inputData.innerHTML = "";

    if (isAddOpen === false) {
        let holderDiv = document.createElement("div");
        holderDiv.className = "my-2";

        let title = document.createElement("p");
        title.className = "mx-1 pt-1 text-center text-lg";
        title.textContent = "Add Expense";

        let subText = document.createElement("p");
        subText.className = "mx-1 pb-1 text-center text-sm";
        subText.textContent = "Note: Adding + to the front of your amount will add money to your balance instead of removing it";

        let innerDiv1 = document.createElement("div");
        innerDiv1.className = "flex justify-center";

        let input1 = document.createElement("input");
        input1.className = "rounded-lg mr-1 w-40 text-base h-7";
        input1.setAttribute("placeholder", "Enter Name");
        input1.setAttribute("type", "text");
        innerDiv1.appendChild(input1);

        let input2 = document.createElement("input");
        input2.className = "rounded-lg ml-1 w-40 text-base h-7";
        input2.setAttribute("placeholder", "Enter Amount");
        input2.setAttribute("type", "text");
        innerDiv1.appendChild(input2);

        let innerDiv2 = document.createElement("div");
        innerDiv2.className = "flex justify-center mt-2";

        let button = document.createElement("button");
        button.className = "rounded-lg bg-blue-400 w-32 text-base";
        button.innerText = "Add";
        innerDiv2.appendChild(button);
        holderDiv.appendChild(title);
        holderDiv.appendChild(subText);
        holderDiv.appendChild(innerDiv1);
        holderDiv.appendChild(innerDiv2);
        inputData.appendChild(holderDiv);

        isAddOpen = true;
    } else {
        isAddOpen = false
    };
});

removeEBtn.addEventListener('click', function () {
    inputData.innerHTML = "";
});