// This file contains all listener


const boardListener = ev => {    
    if ( ev.target.nodeName == "BUTTON" ) {        
        const currentEle = ev.target;
        const dataId = currentEle.dataset.id;
        if ( currentEle.classList.contains("createBtn") ) {
             dataId === "mainDiv"? todoapp.openpopup('main-popup',dataId,true,false):todoapp.openpopup('main-popup',dataId,false,false);
        } else if ( currentEle.classList.contains("deleteBtn") ) {
            let confirmMessage  = "Are you sure want to delete this ";
            dataId.includes("card") ? confirmMessage+"card" : confirmMessage+"list";
            let status= confirm(confirmMessage);

            if ( status ) {
                todoapp.deleteFormTodo(dataId);
            }
        } else if ( currentEle.classList.contains("editBtn") ) {
            dataId.includes("card")? todoapp.openpopup('sec-popup',dataId,true,true):todoapp.openpopup('sec-popup',dataId,false,true);
        }
    }
};

const boardDrag = event => {
    event.dataTransfer.setData("Text", event.target.id);
};

const boardDropListener = event => {
    event.preventDefault();

    const data = event.dataTransfer.getData("Text");

    if ( data.includes("card") && event.target.className == "list" ) {
        event.target.appendChild(document.getElementById(data));

        const currentListId= data.split("_")[0];

        if ( currentListId != event.target.id ) {
             const movetonew =  todoapp.todojson[currentListId].cards[data];
             todoapp.todojson[event.target.id].cards[data]= movetonew;
             delete todoapp.todojson[currentListId].cards[data];
             todoapp.updatejson();
        }
    } else if ( !data.includes("card") && event.target.id == "mainDiv" ) {
        event.target.appendChild(document.getElementById(data));
    }
};

const createListListener = ev => {
    todoapp.createList("mainDiv",document.getElementById('listbox').value,"");  
    todoapp.emptyinputBox(["listbox"]);
    document.getElementById("main-popup").classList.remove("show");   
    document.getElementById("fade").classList.remove("show");
};

const createCardListener = ev => {
    todoapp.createCard(document.getElementById('cardbox').value,document.getElementById('cardboxdesc').value,)
    todoapp.emptyinputBox(["cardbox","cardboxdesc"]);
    document.getElementById("main-popup").classList.remove("show");
    document.getElementById("fade").classList.remove("show");

};

const addCommentListener = ev => {
    todoapp.addcomments(document.getElementById("commentarea").value);
    todoapp.emptyinputBox(['commentarea']);
};

const updateCommentListener = ev => {
    todoapp.updateCard(document.getElementById('cardTitleBox').value ,document.getElementById('cardDescBox').value);
    document.getElementById('commentShow') .innerHTML = "";
    document.getElementById("sec-popup").classList.remove("show");
    document.getElementById("fade").classList.remove("show");
};

const closepopup = () => {
    todoapp.openpopup('main-popup',null ,true,false);
    todoapp.emptyinputBox(["listbox","cardbox","cardboxdesc"]);
};

const updateClose = () => {
    todoapp.openpopup('sec-popup',null ,true,false);
};

const $mainBoard = document.getElementById('mainDiv');

$mainBoard.addEventListener('click', boardListener);

$mainBoard.addEventListener("dragstart", boardDrag);

$mainBoard.addEventListener("dragover", function(event) {
    event.preventDefault();
});

$mainBoard.addEventListener("drop", boardDropListener);

document.getElementById("createList").addEventListener("click", createListListener);

document.getElementById("createCard").addEventListener("click", createCardListener);

document.getElementById("addComment").addEventListener("click", addCommentListener);

document.getElementById("updateCard").addEventListener("click", updateCommentListener);

document.getElementById("cancelList").addEventListener('click', closepopup);

document.getElementById("cancelCard").addEventListener('click', closepopup);

document.getElementById("cancelupdate").addEventListener('click', updateClose);
