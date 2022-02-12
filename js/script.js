/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

// StudentList variable to update student list pagination in the `showPage` function
const studentList = document.querySelector('.page ul.student-list');
// linkList Varibale to update pagination innerHTML
const linkList = document.querySelector('div.pagination ul.link-list');
// header varibale used to update search bar dynamically
const header = document.querySelector('div.page header.header');
let pageLink, listArr;
let result = [];
/*
the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page) {
  let startIndex = ( page * 9 ) - 9;
  let lastIndex = page * 9;
// conditonal statement sets last index to last item in array if its not a multiple of 9
  if (lastIndex >= list.length) { lastIndex = list.length }
//the code below will empty the student list and set it up for new student list
  studentList.innerHTML = '';

  for (var i = startIndex; i < lastIndex; i++) {

    var li = createElement('li');
    giveClassName(li, 'student-item cf');

    var div = createElement('div');
    giveClassName(div, 'student-details');
    appendElement(li, div);

    var img = createElement('img');
    giveClassName(img, 'avatar')
    propImg(img, list[i].picture.medium, 'Profile Picture');
    appendElement(div, img);

    var h3= createElement('h3');
    h3.innerHTML = `${list[i].name.first} ${list[i].name.last}`;
    appendElement(div, h3);

    var span = createElement('span');
    giveClassName(span, 'email');
    span.innerHTML = `${list[i].email}`;
    appendElement(div, span);

    var div2 = createElement('div');
    giveClassName(div2, 'joined-details');
    appendElement(li, div2);

    var span2 = createElement('span');
    giveClassName(span2, 'date')
    span2.innerHTML = `Joined ${list[i].registered.date}`
    appendElement(div2, span2);

    appendElement(studentList, li);
  }
}

// function to create Element
function createElement(ele) {
  return document.createElement(ele);
}
// function to give element ClassName not for adding class to classList
function giveClassName(variable, classname) {
  variable.className = classname;
}
// function to append created Elements
function appendElement(variable, ele) {
  return variable.appendChild(ele);
}
//function to set img elements src and alt property values
function propImg(variable, srcVal, altVal){
  variable.src = srcVal;
  variable.alt = altVal;
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
  let numofpages = Math.ceil(list.length / 9);
// the code below will empty the linklist so that it can be repopulated with new search rexult pagination
  linkList.innerHTML = '';
  listArr = list;
  var li = createElement('li');
  appendElement(linkList, li);

  var btn = createElement('button');
  btn.type = 'button';
  giveClassName(btn, 'arrow-left')
  btn.innerHTML = '<<';
  appendElement(li, btn);

//Loop to create pagination buttons
// used onclick attribute arather than addEvenListener to avoid writing another loop in event listener
// also fewer lines of code with using the onclick
// more precision and less probability of events mixing up
// Please advice which way is more efficient
  for (var i = 1; i <= numofpages; i++) {
    var li = createElement('li');
    appendElement(linkList, li);

    var btn = createElement('button');
    btn.type = 'button';
    if (i === 1) {giveClassName(btn, 'active')};

    btn.setAttribute('onclick', `showPage(listArr, ${i})`);
    btn.innerHTML = `${i}`;
    appendElement(li, btn);
  }
  var li = createElement('li');
  appendElement(linkList, li);

  var btn = createElement('button');
  btn.type = 'button';
  giveClassName(btn, 'arrow-right')
  btn.innerHTML = '>>';
  appendElement(li, btn);

  pageLink = document.querySelectorAll('ul.link-list button')

//This eventlistener will display students for arrow buttons and add active class to current page
// foreach adds event listener to every button in the pagination link list
  pageLink.forEach((item, i) => {
    item.addEventListener('click', (event) => {
      if (list == data) {
        addArrowFunctionality(data);
      } else {
        addArrowFunctionality(result);
      }
    })
  });
}

// Call functions
showPage(data, 1);
addPagination(data);
createSearchBar();

/*
Create the `addArrowFunctionality` function
This function will add functionality to arrow keys and add active class to current page
*/

function addArrowFunctionality(list) {

// variable to get the textcontent of even target for conditional statements to check if arrow buttons or page buttons are clicked
  let pagenumber = event.target.textContent;
// variable for left and right arrow buttons
  let arrowLeft = document.querySelector('ul.link-list .arrow-left');
  let arrowright = document.querySelector('ul.link-list .arrow-right');
// selects element with previous class and removes active class from that element
  let active = document.querySelector('ul.link-list .active');
// variable for button with element class
  let activenumber = parseInt(active.textContent);
  active.classList.remove('active');
// conditional statement test which type of button is clicked and add active class to current page
  if ( pagenumber == '<<') {
// conditional statement to avoid running `showPage` function and applying active classes to elements which do not exist
    if (activenumber === 1) {
      pageLink[1].classList.add('active');
    } else {
      showPage(list, `${activenumber - 1}`);
      pageLink[`${activenumber - 1}`].classList.add('active');
    }
  } else if (pagenumber == '>>') {
// conditional statement to avoid running `showPage` function and applying active classes to elements which do not exist
    if (activenumber === ( pageLink.length - 2 )) {
      pageLink[ pageLink.length - 2 ].classList.add('active');
    } else {
      showPage(list, `${activenumber + 1}`);
      pageLink[`${activenumber + 1}`].classList.add('active');
    }
  } else {
    // add active class to current page button
    event.target.classList.add('active');
  }
}

/*
the `createSearchBar` function
This function will create and insert/append the elements needed to display a search form
*/

function createSearchBar() {

  var label = createElement('label');
  setAttr(label, 'for', 'search');
  giveClassName(label, 'student-search');
  appendElement(header, label);

  span = createElement('span');
  span.innerHTML = 'Search by Name';
  appendElement(label, span);

  var input = createElement('input');
  setAttr(input, 'id', 'search');
  setAttr(input, 'placeholder', 'Search by name...');
  appendElement(label, input);

  btn = createElement('button');
  setAttr(btn, 'type', 'button');
  setAttr(btn, 'onclick', 'searchName()')
  appendElement(label, btn);

  img = createElement('img');
  propImg(img, 'img/icn-search.svg', 'Search Icon');
  appendElement(btn, img);
}

// function to set Attribute of an Element

function setAttr(varb, attr, val) {
  return varb.setAttribute(attr, val);
}

/*
the `searchName` function
This function will search for students by name and display results
*/

function searchName(){
  const searchText = byId('search').value.toLowerCase();
  result = [];
  data.forEach((item, i) => {
    var searchField = `${item.name.first} ${item.name.last}`.toLowerCase();
    if (searchField.includes(searchText, 0)) {
      result.push(item);
    }
  });
//the code below will empty the student list and set it up for new student list
  studentList.innerHTML = '';
// the code below will empty the linklist so that it can be repopulated with new search rexult pagination
  linkList.innerHTML = '';
//this statement will remove the "no result found statement" every time the search function is run if it exists
//it will also avoid build up of multiple no result found messages
  if (byId('result-message')) {
    byId('result-message').remove();
  }
// this statement will display result of search
  if (result.length > 0) {
    showPage(result, 1);
    addPagination(result);
  } else {
    header.insertAdjacentHTML("afterend", "<h2 id='result-message' style='margin-bottom:20px;'>No matching Student found...try again</h2>");
  }
}

//`byId` function will select Element By Id

function byId(id) {
  return document.getElementById(id);
}
