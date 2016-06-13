$(function() {
  var model = {
    init: function() {
      this.loadCats();
    },
    loadCats: function() {
      this.cats = [
        {
          catId: 1,
          catName: 'Tom',
          catImage: 'images/cat.jpg',
          counter: 0
        },
        {
          catId: 2,
          catName: 'Otto',
          catImage: 'images/cat2.jpg',
          counter: 0
        },
        {
          catId: 3,
          catName: 'Gato',
          catImage: 'images/cat.jpg',
          counter: 0
        },
        {
          catId: 4,
          catName: 'Pericles',
          catImage: 'images/cat2.jpg',
          counter: 0
        }
      ]
    },
    getAllCats: function() {
      return this.cats;
    },
    getCatById: function(id) {
      var gato;
      this.cats.forEach(function(item) {
        if (id == item.catId) {
          gato = item;
        }
      });
      return gato;
    },
    incrementCounter: function(id) {
      this.cats.forEach(function(item) {
        if (id == item.catId) {
          item.counter++;
        }
      });
    },
  };
  var octopus = {
    init: function() {
      model.init();
      viewList.init();
      viewCat.init();
    },
    getCats: function() {
      return model.getAllCats();
    },
    updateCounter: function(idCat) {
      model.incrementCounter(idCat);
    },
    getCatById: function(id) {
      return model.getCatById(id);
    },
  };
  var viewList = {
    init: function() {
      this.catList = $('#cats');
      this.catList.on('click', '.cat', function(e) {
        var x = $(this).data('id')
        viewCat.render(x);
      });
      viewList.render();
    },
    render: function() {
      var htmlStr = '';
      octopus.getCats().forEach(function(item) {
        htmlStr += '<li class="cat list-group-item" data-id="' + item.catId + '" >' + item.catName +
          '</li>';
      });
      this.catList.html(htmlStr);
    },
  };
  var viewCat = {
    init: function() {
      this.nameCat = $('#cat-name');
      this.counterCat = $('#cat-counter');
      this.imageCat = $('#cat-image');
    },
    render: function(idCat) {
      var cat = octopus.getCatById(idCat);
      viewCat.nameCat.html(cat.catName)
      viewCat.renderCounter(cat);
      viewCat.imageCat.attr('src', cat.catImage)
      viewCat.imageCat.off('click')
      viewCat.imageCat.on('click', function() {
        octopus.updateCounter(cat.catId);
        viewCat.renderCounter(cat)
      })
    },
    renderCounter: function(cat) {
      viewCat.counterCat.html("Clicks counter: " + cat.counter);
    }
  };
  octopus.init();
});