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
          catImage: 'images/cat1.jpg',
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
          catImage: 'images/cat1.jpg',
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
    getCatById: function(id){
      var gato;
      this.cats.forEach(function(item){
        if ( id == item.catId){
          gato = item;
        }
      });
      return gato;
    }

  };
  var octopus = {
    init: function() {
      model.init();
      viewList.init();
    },
    getCats: function() {
      return model.getAllCats();
    },
    updateCounter: function(idCat) {
      // model.
    },
    getCatById: function(id){
      
      return model.getCatById(id);
    },
  };
  var viewList = {
    init: function() {
      this.catList = $('#cats');

      this.catList.on('click','.cat',function(e){
        var x = $(this).data('id')
        
        viewCat.render(x);
      });
      viewList.render();

    },
    render: function() {
      var htmlStr = '';
      octopus.getCats().forEach(function(item) {
        htmlStr += '<li class="cat" data-id="'+item.catId+'" >' + item.catName + '</li>';

      });
      this.catList.html(htmlStr);
    },
  };

  var viewCat = {
    init: function(){
      this.nameCat = $('#cat-nane');
      this.counterCat = $('#cat-counter');
      this.imageCat = $('#cat-image');
    },
    render:function(idCat){
      console.log(idCat);
      console.log(octopus.getCatById(idCat))
      var cat = octopus.getCatById(idCat);
      this.nameCat.html(cat.catName)
      this.counterCat.html(cat)
    },

  };
  octopus.init();
});