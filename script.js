const LECTURE_LIST_KEY = "Clase del curso";

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
    lecturesString = JSON.stringify(lectureList);
    localStorage.setItem(LECTURE_LIST_KEY, lecturesString);
}

const lectureListEl = document.getElementById("lectureList");
const lectureList = getLectureList();

lectureList.forEach((lecture) => {
    lectureListEl.insertAdjacentHTML(
        "beforeend",
        `
        <div id="${lecture.id}" class= 'lecture'>
            <h2>${lecture.title}</h2>
            <a href="${lecture.videoURL}">
                <img src="${lecture.videoThumbnailURL}" class= "thumbnailURL" target= "_blank">
            </a>
        </div>

        `
    );
    // const lectureEl = document.getElementById(`#${lecture.id}`);
    // lectureEl.addEventListener('click', showClassDetails);
});
//https://www.youtube.com/watch?v=jA2Wv1ia1Dc&list=PLxh8TFOod9GC6I8kcVdfCq-rztRkoD5pl&index=22
//https://img.youtube.com/vi/jA2Wv1ia1Dc/maxresdefault.jpg

// const title = prompt("Enter the title of the class");
// Sumá la clase a la lista de las clases que ya existen con .push({ title: title, completed: false }) y llamá a storeClassesList
document.querySelector(".button").addEventListener('click', () => {
    const title = prompt("Enter the title of the class");
    
   // storeLectureList
});