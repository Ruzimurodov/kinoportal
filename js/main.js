const elForm = document.querySelector(".form");
const elBookmarkList = document.querySelector(".bookmark-list");
let elList = document.querySelector(".list");
let elSelect = document.querySelector(".form__film-genres");

const elSearchInput = document.querySelector(".search__input");
const elSearchBtn = document.querySelector(".search__btn");

const bgModal = document.querySelector(".modal");
const elModalList = document.querySelector(".modal-list");
const modalArr = [];

let localStorage = JSON.parse(window.localStorage.getItem("list"));
let newBookmark =localStorage || [];
newLists(newBookmark,elList);

function renderFilms (arr, element){
  
  element.innerHTML = "";
  
  arr.forEach(film => {
    
    var elCol = document.createElement("div");
    var elColChild = document.createElement("div");
    var newHeading = document.createElement("h3");
    var newImg = document.createElement("img");
    var newText = document.createElement("p");
    const elBookmark = document.createElement("button");
    const modalBtn = document.createElement("button");
    
    newImg.setAttribute("src", film.poster);
    newHeading.textContent = film.title;
    newHeading.setAttribute("class", "film-title")
    newText.setAttribute("class", "film-text");
    newText.textContent = film.overview.split(" ").slice(0,20).join(" ") + " ...";
    elBookmark.textContent = "Favorite";
    elBookmark.setAttribute("class", "bookmark-btn")
    elBookmark.dataset.dataId = film.id;
    modalBtn.setAttribute("class", "modal-btn");
    modalBtn.textContent = "More"

    modalBtn.addEventListener("click", function (){
      if(!modalArr.includes(film.title)){
        modalArr.splice(0,1,film);
      }
      bgModal.classList.add("modal-active");
      modalList(modalArr, elModalList)
      const close = document.createElement("span")
      close.textContent = "X";
      close.setAttribute("class", "close-film")
      bgModal.appendChild(close);
      close.addEventListener("click", ()=>{
        bgModal.classList.remove("modal-active");
      })
    })
    
    elCol.setAttribute("class", "list__item");
    elColChild.setAttribute("class", "list__item-inner");
    newImg.setAttribute("class", "list__img");
    
    
    
    
    elColChild.appendChild(newImg);
    elColChild.appendChild(newHeading);
    elColChild.appendChild(newText);
    elColChild.appendChild(elBookmark);
    elColChild.appendChild(modalBtn);
    
    element.appendChild(elCol);
    elCol.appendChild(elColChild);
    
  });
  
}

function renderGenes(arr , element){
  
  var renderGeners = [];
  
  arr.forEach((film) => {
    
    film.genres.forEach(genre => {
      if(!renderGeners.includes(genre)){
        renderGeners.push(genre)
      }
    })
  })
  
  renderGeners.forEach(genre => {
    const newOption = document.createElement("option");
    newOption.value = genre;
    newOption.textContent = genre;
    element.appendChild(newOption);
  })
  
}


function newLists (arr, element){
  element.innerHTML = "";
  arr.forEach(n => {
    let elBookmarkItem = document.createElement("li");
    let elBookmarkBtn = document.createElement("button");
    elBookmarkItem.textContent = n.title;
    elBookmarkBtn.textContent = "Remove";
    // let elBookmarkBtnDataId = n.id;
    elBookmarkBtn.dataset.dataId = n.id;
    // let elBookmarkItemDataId = n.id;
    // elBookmarkItem.dataset.dataId = elBookmarkItemDataId;
    
    elBookmarkItem.setAttribute("class", "bookmark-list__item");
    elBookmarkBtn.setAttribute("class", "bookmark-list__btn");
    
    elBookmarkList.appendChild(elBookmarkItem);
    elBookmarkItem.appendChild(elBookmarkBtn);
    
  })
}

function modalList(arr, element){
  element.innerHTML = "";

  arr.forEach(film => {
     
    const modalImg = document.createElement("img");
    const modalTittle = document.createElement("h4");
    const modalText = document.createElement("p");

    modalImg.setAttribute("src", film.poster);
    modalImg.setAttribute("class", "modal-img")
    modalTittle.textContent = film.title;
    modalTittle.classList.add("modal-title");
    modalText.textContent = film.overview;
    modalText.classList.add("modal-text");

    element.appendChild(modalImg);
    element.appendChild(modalTittle);
    element.appendChild(modalText);
  })

}

elList.addEventListener("click", evt=>{
  if(evt.target.matches(".bookmark-btn")){

    let btnId = evt.target.dataset.dataId;
    let findBtn = films.find(n=> n.id === btnId)
    if(!newBookmark.includes(findBtn)){
      newBookmark.push(findBtn);
    }
  }
  newLists(newBookmark, elBookmarkList)
  window.localStorage.setItem("list", JSON.stringify(newBookmark));

})





elBookmarkList.addEventListener("click", evt => {
  if(evt.target.matches(".bookmark-list__btn")){
    let btnIdSecond = evt.target.dataset.dataId;
    // console.log(evt.target.dataset.dataId);
    let findArr = newBookmark.findIndex(film => film.id == btnIdSecond);
    // console.log(findArr);
    newBookmark.splice(findArr, 1); 
    // console.log(newBookmark); 
    newLists(newBookmark,elBookmarkList);
    window.localStorage.setItem("list", JSON.stringify(newBookmark));
  }

  
})

const searchArr = [];

elSearchBtn.addEventListener("click", evt => {
  evt.preventDefault();

  const searchVal = elSearchInput.value;
  elSearchInput.value = "";

  films.forEach(m => {
    if(searchVal == m.title){
      if(!searchArr.includes(m.title)){
        searchArr.splice(0,1,m);
      }
    }
  })
  renderFilms(searchArr,elList)
})



elForm.addEventListener("submit", evt =>{
  evt.preventDefault();
  
  const selectVal = elSelect.value;
  
  let filterFilms = selectVal == "all" ? films : films.filter(element => element.genres.includes(selectVal));
  
  renderFilms(filterFilms, elList);
  
})

renderFilms(films, elList);
renderGenes(films , elSelect);


