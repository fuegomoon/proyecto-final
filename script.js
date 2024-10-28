const LECTURE_LIST_KEY = "Clases del curso";



function getLectureList() {
    let result = localStorage.getItem(LECTURE_LIST_KEY);
    if (result != null) {
        //compile string from local storage
        result= JSON.parse(result);
    } else {
        result = [];
    }
    return result;
}
//json stringify +local storage.getItem
function storeLectureList(lectureList) {
    lectureString = JSON.stringify(lectureList);
    localStorage.setItem(LECTURE_LIST_KEY, lectureString);
}

const lectureListEl = document.getElementById("lectureList");
//const lectureList = getLectureList();

const makeVideoThumbnailUrl = (lecture) => {
    const params = new URL(lecture.videoURL).searchParams;
    const videoId = params.get("v");
    const videoThumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    return videoThumbnailUrl;
    
}



const addClassDialogEl = document.getElementById("js-addClassDialog");
//show the dialog box
document.querySelector(".js-addClassBtn").addEventListener('click', () => {
    const newState = changeFunction(window.state, { type: "OPEN_DIALOG" });
    render(newState);
    //new code :
    //const action = {type: "OPEN_DIALOG"};
    //store.dispatch(action);
});

//receive event of form data and add it to the page
const addClassFormEl = document.getElementById("js-addClassForm");

addClassFormEl.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataEntries = Object.fromEntries(formData.entries());
    const newLecture = newLectureFromFormDataEntries(formDataEntries);
    addClassFormEl.reset();
    const action = {type: "ADD_CLASS", payload: newLecture};
    const newState = changeFunction(window.state, action);
    render(newState);
    //instead of last two lines:
    //store.dispatch(action);
});

const newLectureFromFormDataEntries = (formDataEntries) => {
    const result = {};

    result.id= window.state.lectureList.length + 1;
    //replace last line with
    //result.id = store.getState().lectureList.length + 1;

    if (formDataEntries.isCompleted === "on") { 
        result.isCompleted = true;
    } else {
        result.isCompleted = false;
    }
    if (formDataEntries.isHomeworkDone === "on") { 
        result.isHomeworkDone = true;
    } else {
        result.isHomeworkDone = false;
    }
    result.title= formDataEntries.title;
    result.videoURL= formDataEntries.videoURL;
    result.videoThumbnailUrl = formDataEntries.videoThumbnailUrl;
    return result;
}

//STATE
const initialState = () => {
    return {
        lectureList: getLectureList(),
        isDialogOpen: false,
    };
};
const changeFunction = (currentState, action) => {
    if (typeof currentState === "undefined") {
        return initialState();
    }
    const newState = {...currentState};
    if (action.type === "OPEN_DIALOG") {
        newState.isDialogOpen = true;
        return newState;
    } else if (action.type === "ADD_CLASS") {
        newState.lectureList.push(action.payload);
        newState.isDialogOpen = false;
        return newState;
    }
    return newState;
};
//const store = Redux.createStore(changeFunction);
const logState = (state) => {
    console.log("state",state);
};
const renderDialog = (isDialogOpen) => {
    if (isDialogOpen) { 
        addClassDialogEl.showModal();
    } else {
        addClassDialogEl.close();
    };
}    

const renderLectureList = (lectureList) => {
    lectureListEl.innerHTML = "";
    lectureList.forEach((lecture) => {
        lectureListEl.innerHTML += 
            `
            <div id="${lecture.id}" class= 'lecture'>
                <h2>${lecture.title}</h2>
                <a href="${lecture.videoURL}">
                    <img src="${makeVideoThumbnailUrl(lecture)}" class= "thumbnailURL" target= "_blank">
                </a>
            </div>
    
            `;
    });
};

const render = (state) => {
    window.state = state;
    storeLectureList(state.lectureList);
    logState(state);
    renderDialog(state.isDialogOpen);
    renderLectureList(state.lectureList);
}
render(initialState()); 