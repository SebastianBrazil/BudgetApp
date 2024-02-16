import { getLocalStorage, saveToLocalStorage, removeFromLocalStorage, saveBudgetToLocalStorage } from "./localStorage.js";

let budgetBtn = document.getElementById("budgetBtn");
let addEBtn = document.getElementById("addEBtn");
let infoPlacement = document.getElementById("infoPlacement");
let inputData = document.getElementById("inputData");
let popMoney = document.getElementById("popMoney");

let isBudgetOpen = false;
let isAddOpen = false;
let totalBalance = 0;

// Function displays all data
function popBudget() {
    infoPlacement.innerHTML = "";
    let storedNotes = getLocalStorage();

    if (storedNotes.length === 0) {
        saveBudgetToLocalStorage("Budget:/+0")
        storedNotes = getLocalStorage();
    };

    storedNotes.forEach(note => {
        let splitNote = note.split("/");
        let grabNum = splitNote[1]
        let swithCol = false;

        let holderDiv = document.createElement("div");
        holderDiv.className = "my-2 grid grid-cols-12";

        let noteName = document.createElement("p");
        noteName.className = "col-span-7 mx-1 p-1 text-left text-base";
        noteName.textContent = splitNote[0];
        holderDiv.appendChild(noteName);

        if (splitNote[0] !== "Budget:") {
            let removeBtn = document.createElement("button");
            removeBtn.className = "ml-5 col-span-3 rounded-lg bg-blue-400 text-sm";
            removeBtn.innerText = "Remove";
            removeBtn.addEventListener('click', function () {
                removeFromLocalStorage(note);
                popBudget();
            });
            holderDiv.appendChild(removeBtn);
        } else {
            swithCol = true;
        }

        let noteAmount = document.createElement("p");
        if (swithCol) {
            noteAmount.className = "col-span-5 mx-1 p-1 text-right text-base";
        } else {
            noteAmount.className = "col-span-2 mx-1 p-1 text-right text-base";
        }
        if (grabNum[0] !== "+" && grabNum[0] !== "-" && splitNote[0] !== "Budget:") {
            noteAmount.textContent = "-" + grabNum;
        } else {
            noteAmount.textContent = grabNum;
        }
        holderDiv.appendChild(noteAmount);

        infoPlacement.appendChild(holderDiv);
    });
    doMath();
};

// This function does the math for the balance
function doMath() {
    let storedNotes = getLocalStorage();
    totalBalance = 0;

    storedNotes.forEach(note => {
        let splitNote = note.split("/")
        let numby = splitNote[1];

        if (numby[0] === "+" || splitNote[0] === "Budget:") {
            if(numby[0] === "+"){
                numby = numby.split("+");
                let turnToNum = Number.parseInt(numby[1])
                totalBalance = totalBalance + turnToNum;
            }else{
                totalBalance = totalBalance + Number.parseInt(numby);
            };
        } else if (numby[0] === "-") {
            numby = numby.split("-");
            let turnToNum = Number.parseInt(numby[1])
            totalBalance = totalBalance - turnToNum;
        } else {
            totalBalance = totalBalance - numby;
        };
    });
    popMoney.innerText = totalBalance;
};

// This eventListener allows the user to set their budget
budgetBtn.addEventListener('click', function () {
    isAddOpen = false;
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
        button.className = "rounded-lg bg-red-400 w-32 text-base";
        button.innerText = "Set";
        button.addEventListener('click', function () {
            let parseThis;
            let parseThisMinus;
            parseThis = input.value.split("+")[1];
            parseThisMinus = input.value.split("-")[1];
            if (input.value !== "" && !isNaN(input.value) || input.value !== "" && !isNaN(parseThis) || input.value !== "" && !isNaN(parseThis)) {
                let storedNotes = getLocalStorage();
                storedNotes.forEach(note => {
                    let splitNote = note.split("/");
                    if (splitNote[0] === "Budget:") {
                        removeFromLocalStorage(note);
                    };
                });
                saveBudgetToLocalStorage("Budget:" + "/" + input.value);
                inputData.innerHTML = "";
                popBudget();
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
    };
});

// This eventListener allows the user to add expenses
addEBtn.addEventListener('click', function () {
    isBudgetOpen = false;
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
        button.className = "rounded-lg bg-red-400 w-32 text-base";
        button.innerText = "Add";

        button.addEventListener('click', function () {
            let parseThis;
            let parseThisMinus;
            parseThis = input2.value.split("+")[1];
            parseThisMinus = input2.value.split("-")[1];
            if (input1.value !== "" && input2.value !== "" && !isNaN(input2.value) || input1.value !== "" && input2.value !== "" && !isNaN(parseThis) || input1.value !== "" && input2.value !== "" && !isNaN(parseThisMinus)) {
                saveToLocalStorage(`${input1.value}:` + "/" + input2.value);
                inputData.innerHTML = "";
                popBudget();
                isAddOpen = false;
            };
        });

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

popBudget();