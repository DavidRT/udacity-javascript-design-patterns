$(function() {
  var model = {
    bio: {
      name: "Dav",
      role: "Programmer(?)",
      contacts: [{
          name: "mobile",
          value: "12-345678910"
          },
        {
          name: "email",
          value: "email@example.com"
          },
        {
          name: "twitter",
          value: "@Twitter"
          },
        {
          name: "github",
          value: "github"
          },
        {
          name: "location",
          value: "Maipú, Santiago, Chile"
          }
        ],
      welcomeMessage: "Lorem ipsum...",
      skills: ["Skill A", "Skill B", "Skill C"],
      biopic: "http://67.media.tumblr.com/4c2304e2c32b1a873ad77b3bfbb5f75c/tumblr_mgmz9bjakD1rnixfao1_r1_500.gif",
    },
    education: {
      schools: [{
        name: "University",
        location: "Metro Camino Agricola, Santiago, Chile",
        degree: "BA",
        majors: ["CS"],
        dates: "2014 - Present",
        url: "https://www.google.com"
  }, {
        name: "University",
        location: "Metro Moneda, Santiago, Chile",
        degree: "BA",
        majors: ["CS"],
        dates: "2010 - 2012",
        url: "https://www.google.com"
  }],
      onlineCourses: [{
        title: "Javascript Design Patterns",
        school: "Udacity",
        date: "2016",
        url: "https://www.udacity.com/course/javascript-design-patterns--ud989"
  }]
    },
    work: {
      jobs: [{
        employer: "Employer A",
        title: "Some description about position",
        location: "Providencia, Santiago, Chile",
        dates: "2014 - Present",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sem augue, sagittis id dui eget, tincidunt maximus tortor. Aliquam porttitor mi posuere."
  }, {
        employer: "Employer B",
        title: "Another description about position",
        location: "Las Condes, Santiago, Chile",
        dates: "2014",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed aliquam quam, vitae gravida quam. Quisque tincidunt lorem nibh, non placerat sed.",
  }]
    },
    projects: [{
        title: "Project 1",
        dates: "2016",
        description: "Lorem ipsum",
        images: ["http://goo.gl/5HN3Wz", "http://goo.gl/5HN3Wz", "http://goo.gl/5HN3Wz"]
 }, {
        title: "Project 2",
        dates: "2015",
        description: "Lorem ipsum",
        images: ["http://goo.gl/5HN3Wz", "http://goo.gl/5HN3Wz", "http://goo.gl/5HN3Wz"]
 }
 ],
    getBio: function() {
      return this.bio;
    },
    getWorks: function() {
      return this.work;
    },
    getProjects: function() {
      return this.projects;
    },
    getSchools: function() {
      return this.education.schools;
    },
    getOnlineCourses: function() {
      return this.education.onlineCourses;
    },
    getBioContactLocation: function() {
      var location = this.bio.contacts.filter(function(e) {
        return e.name == 'location'
      });
      return [location[0].value];
    },
    getJobLocation: function() {
      var array = [];
      this.work.jobs.forEach(function(item) {
        array.push(item.location)
      });
      return array;
    },
    getSchoolLocation: function() {
      var array = [];
      this.education.schools.forEach(function(item) {
        array.push(item.location)
      });
      return array;
    },
  };
  var octopus = {
    init: function() {
      bioView.init();
      bioView.render();
      workView.init();
      workView.render();
      projectView.init();
      projectView.render();
      educationView.init();
      educationView.render();
      mapView.init();
    },
    getBio: function() {
      return model.getBio();
    },
    getWorks: function() {
      return model.getWorks();
    },
    getProjects: function() {
      return model.getProjects();
    },
    getSchools: function() {
      return model.getSchools();
    },
    getOnlineCourses: function() {
      return model.getOnlineCourses();
    },
    getBioContactLocation: function() {
      return model.getBioContactLocation();
    },
    getJobLocation: function() {
      return model.getJobLocation();
    },
    getSchoolLocation: function() {
      return model.getSchoolLocation();
    }
  };
  var bioView = {
    init: function() {
      this.$topContacts = $('#topContacts');
      this.$headerName = $('.header-name');
      this.$headerRole = $('.header-role');
      this.$headerPic = $('.header-pic');
      this.$headerMessage = $('.header-message');
      this.$headerSkills = $('.header-skills');
    },
    render: function() {
      var bio = octopus.getBio();
      this.$headerName.text(bio.name);
      this.$headerRole.text(bio.role);
      this.$headerPic.attr('src', bio.biopic);
      this.$headerMessage.text(bio.welcomeMessage);
      bio.contacts.forEach(function(item) {
        this.$topContacts.append('<li class="flex-item"><span class="orange-text">' + item.name +
          '</span><span class="white-text">' + item.value + '</span></li>')
      }, this);
      bio.skills.forEach(function(item) {
        this.$headerSkills.append('<li class="flex-item"><span class="white-text">' + item + '</span></li>');
      }, this);
    },
  };
  var workView = {
    init: function() {
      this.container = $('#workExperience');
    },
    render: function() {
      octopus.getWorks().jobs.forEach(function(item) {
        var $workEntry = $('<div class="work-entry"></div>');
        var $workEmployer = $('<a href="#">' + item.employer + ' - ' + item.title + '</a>');
        var $workDate = $('<div class="date-text">' + item.dates + '</div>');
        var $workLocation = $('<div class="location-text">' + item.location + '</div>');
        var $workDescription = $('<p><br>' + item.description + '</p>');
        $workEntry.append($workEmployer).append($workDate).append($workLocation).append($workDescription);
        this.container.append($workEntry);
      }, this);
    },
  };
  var projectView = {
    init: function() {
      this.container = $('#projects');
    },
    render: function() {
      octopus.getProjects().forEach(function(item) {
        var $projectEntry = $('<div class="project-entry"></div>');
        var $projectTitle = $('<a href="#">' + item.title + '</a>');
        var $projectDates = $('<div class="date-text">' + item.dates + '</div>');
        var $projectDescription = $('<p><br>' + item.description + '</p>');
        var $projectImages = '';
        item.images.forEach(function(item) {
          $projectImages += '<img class="projects-image" src="' + item + '">';
        });
        $projectEntry.append($projectTitle).append($projectDates).append($projectDescription).append(
          $projectImages);
        this.container.append($projectEntry);
      }, this);
    },
  };
  var educationView = {
    init: function() {
      this.container = $('#education');
    },
    render: function() {
      octopus.getSchools().forEach(function(item) {
        var $educationEntry = $('<div class="education-entry"></div>');
        var $educationName = $('<a href="#">' + item.name + ' - ' + item.degree + '</a>')
        var $educationDate = $('<div class="date-text">' + item.dates + '</div>')
        var $educationLocation = $('<div class="location-text">' + item.location + '</div>')
        var majors = "";
        item.majors.forEach(function(item) {
          majors += item + " ";
        });
        var $educationMajor = $('<em><br>Major: ' + majors + '</em>')
        $educationEntry.append($educationName).append($educationDate).append($educationLocation).append(
          $educationMajor);
        this.container.append($educationEntry);
      }, this);
      this.renderOnline();
    },
    renderOnline: function() {
      var $onlineContainer = $('<div class="education-entry"></div>');
      octopus.getOnlineCourses().forEach(function(item, index) {
        if (index == 0) $onlineContainer.append('<h3 class="title-online-education">Online Classes</h3>');
        var entry = $('<a href="#">' + item.title + ' - ' + item.school + '</a><div class="date-text">' +
          item.date + '</div><br><a href="' + item.url + '">' + item.url + '</a>');
        $onlineContainer.append(entry);
      });
      this.container.append($onlineContainer);
    },
  };
  var mapView = {
    init: function() {
      console.log(octopus.getBioContactLocation());
      console.log('2')
      console.log(octopus.getSchoolLocation());
      console.log('3')
      console.log(octopus.getJobLocation());
      console.log('4')
      window.addEventListener('load', initializeMap(octopus.getBioContactLocation(), octopus.getSchoolLocation(),
        octopus.getJobLocation()));
      window.addEventListener('resize', function(e) {
        map.fitBounds(mapBounds);
      });
    },
    render: function() {},
  }
  octopus.init();
});