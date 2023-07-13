const showModalBtn = document.querySelector(".show-modal");
const bottomSheet = document.querySelector(".bottom-sheet");
const sheetOverlay = bottomSheet.querySelector(".sheet-overlay");
const sheetContent = bottomSheet.querySelector(".content");
const dragIcon = bottomSheet.querySelector(".drag-icon");
const listInput = document.querySelector(".list-input");

// Global variables for tracking drag events
let isDragging = false, startY, startHeight;

const showBottomSheet = () => {
    bottomSheet.classList.add("show");
    listInput.classList.add("hidden");
    document.body.style.overflowY = "hidden";
    updateSheetHeight(50);
    // history_mention become visible
    const ListConditionSpaced = historyList.innerHTML === '';
    if(ListConditionSpaced) {
        historyList.insertAdjacentHTML("beforeend",'<li class="mention mention_visible"><p>There is nothing</p></li>')
    }
    else {
        const historyMention = document.querySelector(".mention");
        if(historyMention){
            historyMention.remove();
        }
    }
}

const hideBottomSheet = () => {
    bottomSheet.classList.remove("show");
    listInput.classList.remove("hidden");
    document.body.style.overflowY = "auto";
    // history_mention become hidden
    const ListConditionSpaced = historyList.innerHTML === '';
    if(!ListConditionSpaced) {
        const historyMention = document.querySelector(".mention");
        if(historyMention){
            historyMention.remove();
        }
    }
}

const updateSheetHeight = (height) => {
    sheetContent.style.height = `${height}vh`;
    bottomSheet.classList.toggle("fullscreen", height === 100)
}

// Sets initial drag position and sheetContent height
const dragStart = (e) => {
    isDragging = true;
    startY = e.pageY || e.touches?.[0].pageY;
    startHeight = parseInt(sheetContent.style.height);
    bottomSheet.classList.add("dragging");
}

// Calculates the new height for the sheet content and call the updateSheetHeight function
const dragging = (e) => {
    if (!isDragging) return;
    const delta = startY - (e.pageY || e.touches?.[0].pageY);
    const newHeight = startHeight + delta / window.innerHeight * 100;
    updateSheetHeight(newHeight);
}

// Determines whether to hide, set to fullscreen, or set to default
// height based om the current height of the sheet content
const dragStop = () => {
    isDragging = false;
    bottomSheet.classList.remove("dragging");
    const sheetHeight = parseInt(sheetContent.style.height);
    sheetHeight < 25 ? hideBottomSheet() : sheetHeight > 75 ? updateSheetHeight(100) : updateSheetHeight(50)
}

document.addEventListener("mouseup", dragStop);
dragIcon.addEventListener("mousedown", dragStart);
document.addEventListener("mousemove", dragging);

document.addEventListener("touchend", dragStop);
dragIcon.addEventListener("touchstart", dragStart);
document.addEventListener("touchmove", dragging);

showModalBtn.addEventListener("click", showBottomSheet);
sheetOverlay.addEventListener("click", hideBottomSheet);