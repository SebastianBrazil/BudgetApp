const saveToLocalStorage = (savingData) => {
    let savedBudget = getLocalStorage();
    savedBudget.splice(0, 0, savingData);
    localStorage.setItem("localBudget", JSON.stringify(savedBudget));
};

// What differenciates the two save functions is that the one above uses .splice to add data to the front of the array, while the one below adds data (specifcally the budget) to the end of the array.
const saveBudgetToLocalStorage = (savingData) => {
    let savedBudget = getLocalStorage();
    if (!savedBudget.includes(savingData)) {
        savedBudget.push(savingData);
    }
    localStorage.setItem("localBudget", JSON.stringify(savedBudget));
};

const getLocalStorage = () => {
    let localStorageData = localStorage.getItem("localBudget");
    if (localStorageData === null) {
        return [];
    };
    return JSON.parse(localStorageData);
};

const removeFromLocalStorage = (savingData) => {
    let savedBudget = getLocalStorage();
    let removeExpense = savedBudget.indexOf(savingData);
    savedBudget.splice(removeExpense, 1);
    localStorage.setItem("localBudget", JSON.stringify(savedBudget));
};

export { saveToLocalStorage, getLocalStorage, removeFromLocalStorage, saveBudgetToLocalStorage };