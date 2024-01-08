//id initiates a counter
let id = 0;

//Gets the button with id of add and gets named addButton
let addButton = document.getElementById('add')

addButton.addEventListener('click', () => {
    //Gets the table with the id of list and gets named table
    let table = document.getElementById('list');
    
    //A new row is inserted into the table
    let row = table.insertRow(1);

    //Sets the id attribute with the name of item-# (example: id="item-2") on the rows that are created
    row.setAttribute('id', `item-${id}`);
    //New cells are created and updated with the information obtained from the labels with the following Id's
    row.insertCell(0).innerHTML = document.getElementById('new-start-date').value;
    row.insertCell(1).innerHTML = document.getElementById('new-end-date').value;
    row.insertCell(2).innerHTML = document.getElementById('new-trip').value;
    row.insertCell(3).innerHTML = document.getElementById('new-cost').value;

    // Creates a 5th cell in the row
    let actions = row.insertCell(4);

    //Places the button delete button in the 5th cell. id++ keeps adding the delete button in th new rows that are created
    actions.appendChild(createDeleteButton(id++));

    // Empties the label and input sections after value has been entered.
    document.getElementById('new-start-date').value = '';
    document.getElementById('new-end-date').value = '';
    document.getElementById('new-trip').value = '';
    document.getElementById('new-cost').value = '';
});

function createDeleteButton(id) {
    let deleteButton = document.createElement('button');

    // Bootstrap button class
    deleteButton.className = 'btn btn-warning';

    deleteButton.id = id;
    deleteButton.innerHTML = 'Delete';

    deleteButton.onclick = () => {
        console.log(`Deleting row with id: item-${id}`);
        let elementToDelete = document.getElementById(`item-${id}`);
        elementToDelete.parentNode.removeChild(elementToDelete);
    };
    return deleteButton;
};

//Form
class Member {
    constructor(name, budget) {
        this.name = name;
        this.budget = budget;
    };
};

class Adventure {
    constructor(id, name) {  //ID of our adventure
        this.id = id;
        this.name = name;
        this.members = [];   //empty array, array of all of the members that get added to to this adventure.
    };

    addMember(member) {     //this method is going to add a member into the members array
        this.members.push(member);
    };

    deleteMember(member) {      //method for removing member
        let index = this.member.index.indexOf(member);
        this.members.splice(index, 1);      //splice to remove it; 1 to remove only one.
    };
};

let adventures = [];     //every adventure we create wil be stored in this array.
let adventureId= 0;      //id assigned to each adventure and we're going to increment it each time, so that each adventure automatically gets an incremented id.

onclick('new-adventure', () => {
    adventures.push(new Adventure(adventureId++, getValue('new-adventure-name')));
    drawDOM();
}); 

function onclick(id, action) {
    let element = document.getElementById(id);      //we write it one time in this function so we don't have to write this same line over and over.
    element.addEventListener('click', action);      //the event listener is going be click every time.
    return element;
};

function getValue(id) {
    return document.getElementById(id).value;
};

function drawDOM () {
    let adventureDiv = document.getElementById('adventures');
    clearElement(adventureDiv);      //it will clear out the adventure div
    for (adventure of adventures) {       //it will iterate over the adventures
        let table = createAdventureTable(adventure);      //create a table for each adventure
        let title = document.createElement('h2');
        title.innerHTML = adventure.name;
        title.appendChild(createDeleteAdventureButton(adventure));        //create a delete button to delete each adventure
        adventureDiv.appendChild(title);
        adventureDiv.appendChild(table);
        for (member of adventure.members) {      //add all members to the adventure
            createMemberRow(adventure, table, member);
        };
    };
};

function createMemberRow(adventure, table, member) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = member.name;
    row.insertCell(1).innerHTML = member.budget;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(adventure, member));
};

function createDeleteRowButton(adventure, member) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = adventure.members.indexOf(member);
        adventure.members.splice(index, 1);
        drawDOM();
    };
    return btn;
};

function createDeleteAdventureButton (adventure) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary shift-right'; 
    btn.innerHTML = 'Delete Adventure';
    btn.onclick = () => {
        let index = adventures.indexOf(adventure);
        adventures.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createNewMemberButton(adventure){
    let btn =document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        adventure.members.push(new Member(getValue(`name-input-${adventure.id}`), getValue(`budget-input-${adventure.id}`)));
        drawDOM();
    };
    return btn;
}

function createAdventureTable(adventure) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let budgetColumn = document.createElement('th');
    let createColumn = document.createElement('th');

    nameColumn.innerHTML = 'Name';
    budgetColumn.innerHTML = 'Budget';
    createColumn.innerHTML = 'Action';

    row.appendChild(nameColumn);
    row.appendChild(budgetColumn);
    row.appendChild(createColumn);

    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let budgetTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');

    nameInput.setAttribute('id', `name-input-${adventure.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');

    let budgetInput = document.createElement('input');
    budgetInput.setAttribute('id', `budget-input-${adventure.id}`);
    budgetInput.setAttribute('type', 'text');
    budgetInput.setAttribute('class', 'form-control');

    let newMemberButton = createNewMemberButton(adventure);
    nameTh.appendChild(nameInput);
    budgetTh.appendChild(budgetInput);
    createTh.appendChild(newMemberButton);
    
    formRow.appendChild(nameTh);
    formRow.appendChild(budgetTh);
    formRow.appendChild(createTh);
    return table;
};

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}