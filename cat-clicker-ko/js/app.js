var initialCats = [
  {
    clickCount: 0,
    name: 'Tabby',
    imgSrc: 'img/1413379559_412a540d29_z.jpg',
    imgAttribution: 'https://www.google.com',
    nicknames: ['nick 1', 'nick 2']
  },
  {
    clickCount: 0,
    name: 'Tiger',
    imgSrc: 'img/4154543904_6e2428c421_z.jpg',
    imgAttribution: 'https://www.google.com',
    nicknames: ['nick a', 'nick b']
  },
  {
    clickCount: 0,
    name: 'Scaredy',
    imgSrc: 'img/434164568_fea0ad4013_z.jpg',
    imgAttribution: 'https://www.google.com',
    nicknames: ['nick 1a', 'nick 2b']
  }
]

var Cat = function(data){
  this.clickCount = ko.observable(data.clickCount);
  this.name = ko.observable(data.name);
  this.imgSrc = ko.observable(data.imgSrc);
  this.imgAttribution = ko.observable(data.imgAttribution);
  this.nicknames = ko.observableArray(data.nicknames);

  this.levelCat = ko.computed(function() {
    var count = this.clickCount();
    if (count < 10) {
      return "Newbie";
    } else if (count < 20) {
      return "Med";
    } else {
      return "Super";
    }
  }, this);

};


var ViewModel = function() {
  var self = this;

  this.catList = ko.observableArray([]);

  initialCats.forEach(function(cat){
    self.catList.push(new Cat(cat));
  });

  this.currentCat = ko.observable(this.catList()[0]);

  this.incrementCounter = function() {

    self.currentCat().clickCount(self.currentCat().clickCount() + 1);
  };

  this.setCurrentCat = function(index,data,event){
    // here its possible pass the cat clicked 
    // and apply to: self.currentCat(catClicked)
    self.currentCat = ko.observable(this.catList()[index]);
  };

}

ko.applyBindings(new ViewModel());