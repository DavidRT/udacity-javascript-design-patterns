var cats = [
  {
    id: 1,
    name: "Cat one",
    image: "images/cat.jpg",
    counter: 0
  },
  {
    id: 2,
    name: "Cat two",
    image: "images/cat2.jpg",
    counter: 0
  },
  {
    id: 3,
    name: "Cat three",
    image: "images/cat.jpg",
    counter: 0
  },
  {
    id: 4,
    name: "Cat four",
    image: "images/cat2.jpg",
    counter: 0
  },
  {
    id: 5,
    name: "Cat five",
    image: "images/cat.jpg",
    counter: 0
  },
];
$(document).ready(function() {
  displayNames();
  $('.cat').on('click', function() {
    var id = $(this).data('id');
    var cat = getCat(id);
    displayCat(cat);
  });
  $('body').on('click', '.counter', function() {
    var id = $(this).data('id');
    incrementCounter(id);
    displayCat(getCat(id));
  });
});

function incrementCounter(id) {
  cats.forEach(function(item, index) {
    if (item.id == id) {
      item.counter = item.counter + 1;
    }
  });
}

function displayCat(cat) {
  var contaier = $('.cat-container');
  contaier.html('');
  contaier.append('<img data-id="' + cat.id + '" class="counter" src="' + cat.image + '" />');
  contaier.append('<p>' + cat.name + '</p>');
  contaier.append('<p data-id="' + cat.id + '" class="counter">' + cat.counter + '</p>');
}

function getCat(id) {
  var cat;
  cats.forEach(function(item, index) {
    if (item.id == id) {
      cat = item;
    }
  });
  return cat;
}

function displayNames() {
  var catList = $('.cat-list');
  cats.forEach(function(item, index) {
    catList.append('<li class="cat" data-id="' + item.id + '">' + item.name + '</li>');
  });
}