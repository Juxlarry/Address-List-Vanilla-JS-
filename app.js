// **** Select Items ******
const alert = document.querySelector ('.alert');
const submit = document.querySelector('.submit-btn'); 
const address = document.getElementById('address'); 
const form = document.querySelector ('.address-form');
const list = document.querySelector('.address-list');  
const clearBtn = document.querySelector('.clear-btn'); 
// const content = document.querySelector('#submitContent');
// const editBtn = document.querySelector('.edit-btn');
// const delBtn = document.querySelector('.delete-btn');
const container = document.querySelector('.address-container'); 

// **** edit option *****
let editElement; 
let editFlag = false; 
let editId = ""; 


// **** Event Listeners *****
//submit event listener
form.addEventListener('submit', addAddress);

//clear event listener 
clearBtn.addEventListener('click', clearItems);

//***Functions ****/
 function addAddress(e){
     e.preventDefault(); 
    const value = address.value;  
    const id = new Date().getTime().toString(); 
    // console.log(id); 
    if(value  && !editFlag){
        const element = document.createElement("article"); 
        //add class
        element.classList.add("address-item");
        //add id 
        const attr  = document.createAttribute('data-id');
        attr.value = id; 
        element.setAttributeNode(attr);
        element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
            <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="delete-btn">
               <i class="fas fa-trash"></i>
            </button>
        </div>`;

        const deleteBtn = element.querySelector('.delete-btn');
        const editBtn = element.querySelector('.edit-btn');

        deleteBtn.addEventListener("click", deleteAddress);

        editBtn.addEventListener("click", editAddress);
       

        //add child 
        list.appendChild(element);

        //display alert
        displayAlert( "address added to  list", "success");
        
        //show container
        container.classList.add ('show-container');

        //add to local storage
        addToLocalStorage(id, value)

        //set back to default
        setBackToDefault(); 
    }
    else if (value  && editFlag){
        editElement.innerHTML = value; 
        displayAlert("address edited successfully", "success");
        //edit local storage 
        editLocalStorage(editId, value);
        
        setBackToDefault(); 

        
    }
    else {
        displayAlert("Please enter an address", "danger"); 
    }
 }


//display alert
 function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add (`alert-${action}`);

    //remove alert on screen after some seconds
    setTimeout(function(){
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 2000)
 }


function clearItems(){
    const items = document.querySelectorAll('.address-item');
    
    if (items.length > 0){
        items.forEach(function (item){
            list.removeChild(item);
        });
    }
    container.classList.remove ('show-container'); 
    displayAlert("items cleared ", "success"); 

    setBackToDefault();
    // localStorage.removeItem('list');
}

//function to delete address item 
function deleteAddress(e){
    const selected = e.currentTarget.parentElement.parentElement; 
    const id = selected.dataset.id; 

    list.removeChild(selected); 

    const elementItems = document.querySelectorAll('.address-item');
    if (elementItems.length == 0){
       clearItems(); 
    }

    displayAlert("item removed", "danger"); 
    setBackToDefault(); 
    //remove from local storage 

    removeFromLocalStorage(id);
}

//edit address function
function editAddress(e){
    const selected = e.currentTarget.parentElement.parentElement; 

    //set edit item 
    editElement = e.currentTarget.parentElement.previousElementSibling; 

    //set form value
    address.value = editElement.innerHTML; 
    editFlag = true; 
    editId = element.dataset.id; 
    // content.value = "edit";  
}

 //set back to defaults
 function setBackToDefault() {
    address.value =""; 
    editFlag = false 
    editId = ""; 
    // content.value = "add";
    // submit.textContent = `<span>add <i class="fa fa-plus"></i></span>`
}


//*** Local Storage ****/

function addToLocalStorage(id, value){
    console.log("added to local storage")
}

function removeFromLocalStorage(id) {

}

function editLocalStorage(id, value){

}
