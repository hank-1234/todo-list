// the basic list section and icon
const presentList = document.querySelector(".list")
const historyList = document.querySelector(".history-list")
const deleteIcon = document.querySelectorAll(".delete");
const checkIcon = document.querySelectorAll(".finish")
const refreshIcon = document.querySelectorAll(".refresh")

// remove the list
const deleteList = (e) => {
    const listItem = e.target.parentNode;
    // set the animation
    listItem.classList.add("removing")
    setTimeout(() => {
        e.target.parentNode.remove();
        // check the if history list spaced
        const ListConditionSpaced = historyList.innerHTML === '';
        if(ListConditionSpaced) {
            historyList.insertAdjacentHTML("beforeend",'<li class="mention mention_visible"><p>There is nothing</p></li>')
        }
    },300);
};
// make the list checked
const checkList = (e) => {
    const listItem = e.target.parentNode;
    // select the last child in the list and change its class
    const lastChild = listItem.lastElementChild;
    lastChild.classList.add("refresh");
    lastChild.classList.remove("finish");
    // set the animation
    listItem.classList.add("removing");
    setTimeout(() => {
        // make it visible
        listItem.classList.remove("removing")
        //change the check icon to be refresh icon
        lastChild.innerHTML = 'refresh';
        // make a clone in history list
        const listClone = listItem.cloneNode(true);
        historyList.insertBefore(listClone, historyList.firstChild);
        // remove the list in present list
        e.target.parentNode.remove();
        // renew the set of delete icon and refresh icon
        const deleteIcon = document.querySelectorAll(".history-list .delete")
        deleteIcon.forEach((icon) => {
            icon.addEventListener("click", deleteList);
        })
        const refreshIcon = document.querySelectorAll(".refresh")
        refreshIcon.forEach((icon) => {
            icon.addEventListener("click", refreshList);
        })
    },300)
};
const refreshList = (e) => {
    const list = e.target.parentNode;
    const lastChild = list.lastElementChild;
    lastChild.classList.add("finish");
    lastChild.classList.remove("refresh");
    list.classList.add("removing");
    setTimeout(() => {
        list.classList.remove("removing");
        lastChild.innerHTML = 'check';
        const listClone = list.cloneNode(true);
        presentList.insertBefore(listClone, presentList.firstChild);
        e.target.parentNode.remove();
        const deleteIcon = document.querySelectorAll(".list .delete")
        deleteIcon.forEach((icon) => {
            icon.addEventListener("click", deleteList);
        })
        const checkIcon = document.querySelectorAll(".finish")
        checkIcon.forEach((icon) => {
            icon.addEventListener("click", checkList);
        })
        // check the if history list spaced
        const ListConditionSpaced = historyList.innerHTML === '';
        if(ListConditionSpaced) {
            historyList.insertAdjacentHTML("beforeend",'<li class="mention mention_visible"><p>There is nothing</p></li>')
        }
        },300)
};

deleteIcon.forEach((icon) => {
    icon.addEventListener("click", deleteList);
});
checkIcon.forEach((icon) => {
    icon.addEventListener("click", checkList);
})
refreshIcon.forEach((icon) => {
    icon.addEventListener("click", refreshList);
})


// the send icon function
const sendBtn = document.getElementById("send-btn");
const textArea = document.querySelector("textarea");

const sendMessage = () => {
    const listMessage = textArea.value;
    const newList = document.createElement('li')
    newList.innerHTML = '<p>'+listMessage+'</p><span class="delete material-symbols-outlined">delete</span><span class="finish material-symbols-outlined">check</span>'
    presentList.insertBefore(newList, presentList.firstChild);
    textArea.value = '';
    const checkIcon = document.querySelectorAll(".finish")
    checkIcon.forEach((icon) => {
        icon.addEventListener("click", checkList);
    })
    const deleteIcon = document.querySelectorAll(".list .delete")
    deleteIcon.forEach((icon) => {
        icon.addEventListener("click", deleteList);
    })
}
sendBtn.addEventListener("click", sendMessage);
function handleKeyPress(event) {
    const isVisible = sendBtn.offsetParent !== null;
    if (event.keyCode === 13) {
      event.preventDefault(); // Prevent inserting a new line
      if(isVisible){
        sendMessage();
      }
    }
}