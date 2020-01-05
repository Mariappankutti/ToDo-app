const todoapp = {
    currentListId: null,
    currentCardId: null,
    todojson: {},    
    createList: function(parentId,title,listid) {
        const totallist = document.querySelectorAll('.list').length+1;
        const listId = listid || "List00"+totallist;
        const ListElements = `<div id="${listId}" class="list" draggable="true">
            <div class="list-head">
                    <div class="list-title">${title}</div>
                    <div class="list-head-right">
                    <button data-id="${listId}" type="button" class="deleteBtn">Delete</button>
                    </div>
            </div>
                <button data-id="${listId}" type="button" class="createBtn">Create Card</button>
            </div>`;
    
        document.getElementById(parentId).insertAdjacentHTML('beforeend',ListElements);
        
        this.todojson[listId] = {"tile":title,"id":listId,"cards":{}};  
        this.updatejson();
    },
    openpopup: function(popId,dataId,cardOrList,loadData) {
        const popup = document.getElementById(popId);
        const fade = document.getElementById("fade");
        
        popup.classList.contains("show") ? popup.classList.remove("show") : popup.classList.add("show");
        fade.classList.contains("show") ? fade.classList.remove("show") : fade.classList.add("show");
        this.currentListId = dataId;

        if ( cardOrList ) {
            document.getElementById(popId).childNodes[1].classList.remove("page-hide");
            document.getElementById(popId).childNodes[3].classList.add("page-hide");
        } else {
            document.getElementById(popId).childNodes[3].classList.remove("page-hide");
            document.getElementById(popId).childNodes[1].classList.add("page-hide");
        } 

        if ( loadData ) {
            if ( dataId.includes("card") ) {
                const listId = document.getElementById(dataId).parentElement.id;
                this.currentCardId = dataId;
                this.currentListId = listId;
                const cardData = this.todojson[listId].cards[dataId];  
                const comments = cardData.comments;        

                document.getElementById('cardTitleBox').value = cardData.title;
                document.getElementById('cardDescBox').value = cardData.desc;
                document.getElementById("commentShow").innerHTML = "";
                this.loadcomments(comments);
            }
        }
    },
    createCard: function(cardName,cardDes,cardid) {
        const totalcards = document.getElementById(this.currentListId).childElementCount-2+1;
        const cardId = cardid || this.currentListId+"_card"+totalcards; 
        const cardElements = `<div id="${cardId}" class="card" draggable="true">
            <div class="cardTitle">${cardName}</div>
            <div class="carddesc">${cardDes}</div>
            <button data-id="${cardId}" type="button" class="deleteBtn">Delete</button>
            <button data-id="${cardId}" type="button" class="editBtn">Edit</button>
            </div>`;

        document.getElementById(this.currentListId).insertAdjacentHTML('beforeend',cardElements);
        this.todojson[this.currentListId].cards[cardId] = {"listId":this.currentListId,"cardId":cardId,"title":cardName,"desc":cardDes,"comments":[]};
        this.updatejson();
    },
    addcomments: function(comment) {
        const getCurrentDate = this.getcurrentDate();
        const commentShow =  document.getElementById("commentShow");
        const currCardId1 = this.currentCardId;
        const commentElements = `<div class="comments">
            <div class="comment">${comment}</div>
            <div class="commentdate">${getCurrentDate}</div>
            </div>`;
        
        commentShow.insertAdjacentHTML('beforeend',commentElements);
        this.todojson[this.currentListId].cards[currCardId1].comments.push({"text":comment,"date":getCurrentDate});
    },
    loadcomments: function(comment) {
        const commentShow =  document.getElementById("commentShow");

        for(let i=0;i<comment.length;i++){
            const  commentElements = `<div class="comments">
            <div class="comment">${comment[i].text}</div>
            <div class="commentdate">${comment[i].date}</div>
            </div>`;

            commentShow.insertAdjacentHTML('beforeend',commentElements);
        }
    },
    updateCard: function(cardTitle,cardDesc) {
        document.getElementById(this.currentCardId).firstChild.innerHTML = cardTitle;
        document.getElementById(this.currentCardId).children[1].innerHTML = cardDesc;
        this.todojson[this.currentListId].cards[this.currentCardId].title = cardTitle;
        this.todojson[this.currentListId].cards[this.currentCardId].desc = cardDesc;
    },
    deleteFormTodo: function(removeId) {
        if ( removeId.includes("card") ) {
            const listId = document.getElementById(removeId).parentNode.id;
            delete this.todojson[listId].cards[removeId];
            const removeEle = document.getElementById(removeId);
            removeEle.parentNode.removeChild(removeEle);
        } else {
            delete this.todojson[removeId];
            let removeEle = document.getElementById(removeId);
            removeEle.parentNode.removeChild(removeEle);
        }

        this.updatejson();
    },
    updatejson: function() {
        localStorage.setItem("todoList",this.todojson);
    },
    getcurrentDate: function() {
        const date = new Date();

        Date.prototype.monthNames = [
            "January", "February", "March",
            "April", "May", "June",
            "July", "August", "September",
            "October", "November", "December"
        ];

        Date.prototype.getMonthName = function() {
            return this.monthNames[this.getMonth()];
        };

        Date.prototype.getShortMonthName = function () {
            return this.getMonthName().substr(0, 3);
        };
        
        return date.getDate()+" "+date.getShortMonthName()+" "+date.getFullYear();
    },
    emptyinputBox: function(listofId) {
        for(let i=0;i<listofId.length;i++){
            document.getElementById(listofId[i]).value = "";
        }
    },
};