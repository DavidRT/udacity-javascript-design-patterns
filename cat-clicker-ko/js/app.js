var Cat = function(){
  this.clickCount = ko.observable(0);
  this.name = ko.observable('Tabby');
  this.imgSrc = ko.observable('img/4154543904_6e2428c421_z.jpg');
  this.imgAttribution = ko.observable('https://www.google.com');


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

  this.nicknames = ko.observableArray([
    { name: "Bungle" },
    { name: "George" },
    { name: "Zippy" }
  ]);

};

var ViewModel = function() {
  this.currentCat = ko.observable(new Cat());
  this.incrementCounter = function() {
    this.currentCat().clickCount(this.currentCat().clickCount() + 1);
  };
}

ko.applyBindings(new ViewModel());