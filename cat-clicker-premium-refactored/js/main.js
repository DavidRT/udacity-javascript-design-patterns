$(function() {
  var model = {
    currentCat: null,

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
    save: function(cat){
      
      var exists = false;
      var indexAt;
      this.cats.forEach(function(item,index){
        if ( cat.catName == item.catName){
          exists = true;
          indexAt = index;
        }
      });

      if ( !exists ){
        cat.catId = this.cats.length+1;
        this.cats.push(cat);
      }else{
        this.cats[indexAt].catName = cat.catName;
        this.cats[indexAt].counter = cat.counter;
        this.cats[indexAt].catImage = cat.catImage;
      }
      

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

/* ======= Octopus ======= */

  var octopus = {
    init: function() {
      model.init();
      viewList.init();
      viewCat.init();
      adminView.init();
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
    displayAdminArea: function(){
      adminView.render();
    },
    disableAdminArea: function(){
      adminView.disable();
    },
    saveCat: function(cat){
      model.save(cat);
      viewList.render();
      adminView.disable();
    },
    setCurrentCat: function(cat){
      model.currentCat = cat;
    },
    getCurrentCat: function(cat){
      return model.currentCat;
    },
  };

/* ======= Cat List View ======= */

  var viewList = {
    init: function() {
      this.catList = $('#cats');
      this.catList.on('click', '.cat', function(e) {
        var x = $(this).data('id')
        viewCat.render(x);
         adminView.render();
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

/* ======= Cat Detail View ======= */ 

  var viewCat = {
    init: function() {
      this.nameCat = $('#cat-name');
      this.counterCat = $('#cat-counter');
      this.imageCat = $('#cat-image');
    },
    render: function(idCat) {
      var cat = octopus.getCatById(idCat);
      octopus.setCurrentCat(cat);
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

/* ======= Admin View ======= */


  var adminView = {
    init: function(){
      this.adminButton = document.getElementById('adminButton');
      this.adminArea = $('#admin-area');
      this.cancelAdminAreaBtn = document.getElementById('cancel-admin');
      this.adminSaveBtn = document.getElementById('admin-save');

      this.inptName = $('#frm-name');
      this.inptImage = $('#frm-image');
      this.inptCounter = $('#frm-counter');

      adminView.bind();
    },

    bind: function(){
      adminView.adminButton.addEventListener('click', function(){
        octopus.displayAdminArea();
      });

      adminView.cancelAdminAreaBtn.addEventListener('click',function(){
        octopus.disableAdminArea();
      });

      adminView.adminSaveBtn.addEventListener('click',function(){
        
        var obj = {};
        obj.catName = adminView.inptName.val();
        obj.catImage = adminView.inptImage.val();
        obj.counter = adminView.inptCounter.val();
        octopus.saveCat(obj);
      });
    },
    clear: function(){
      adminView.inptCounter.val('');
      adminView.inptImage.val('');
      adminView.inptName.val('');
    },

    render: function(){
      adminView.clear();
      if ( octopus.getCurrentCat() ){
         adminView.inptName.val(octopus.getCurrentCat().catName);
         adminView.inptCounter.val(octopus.getCurrentCat().counter)
         adminView.inptImage.val(octopus.getCurrentCat().catImage)
      }
      adminView.adminArea.show();
    },

    disable: function(){
      adminView.adminArea.hide();
    }
  };

  octopus.init();
});