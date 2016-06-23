/*
This is empty on purpose! Your code to build the resume will go here.
 */
$(function() {
  // audiencia = attendance
  /* MODEL */
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
            value: "Santiago, Chile"
          }
        ]
        //location: "Santiago, Chile"
        ,
      welcomeMessage: "Lorem ipsum...",
      skills: ["Skill A", "Skill B", "Skill C"],
      biopic: "http://67.media.tumblr.com/4c2304e2c32b1a873ad77b3bfbb5f75c/tumblr_mgmz9bjakD1rnixfao1_r1_500.gif",
    },
    education: {
      schools: [{
        name: "A",
        location: "Av. Portales 345, Maipú, Santiago",
        degree: "a",
        majors: ["a1", "a2", "a3"],
        dates: "10-01-2000 - 10-11-2001",
        url: "string"
  }, {
        name: "B",
        location: "Metro Camino Agricola, Santiago",
        degree: "b",
        majors: ["b1", "b2", "b3"],
        dates: "10-01-2000 - 10-11-2001",
        url: "string"
  }],
      onlineCourses: [{
        title: "Title 1",
        school: "School 1",
        date: "2016",
        url: "some url"
  }, {
        title: "Title 2",
        school: "School 2",
        date: "2015",
        url: "some url"
  }]
    },
    work: {
      jobs: [{
        employer: "Employer A",
        title: "Title a",
        location: "Huelen 164, Providencia, Santiago",
        dates: "In progress",
        description: "Lorem ipsum"
  }, {
        employer: "Employer B",
        title: "Title b",
        location: "Huelen 164, Providencia, Santiago",
        dates: "In progress",
        description: "Lorem ipsum",
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
      return this.bio.contacts.location;
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
      workView.container.append(HTMLworkStart);
      octopus.getWorks().jobs.forEach(function(item) {
        var $workEntry = $('<div class="work-entry"></div>');
        var $workEmployer = $('<a href="#">' + item.employer + ' - ' + item.title + '</a>');
        var $workDate = $('<div class="date-text">' + item.dates + '</div>');
        var $workLocation = $('<div class="location-text">' + item.location + '</div>');
        var $workDescription = $('<p><br>' + item.description + '</p>');
        $workEntry.append($workEmployer).append($workDate).append($workLocation).append($workDescription);
        workView.container.append($workEntry);
      });
      workView.container.show();
    },
  }
  var mapView = {
    init: function() {
      this.container = $('#mapDiv');
      mapView.render();
      window.addEventListener('load', initializeMap(octopus.getBioContactLocation(), octopus.getSchoolLocation(),
        octopus.getJobLocation()));
      window.addEventListener('resize', function(e) {
        map.fitBounds(mapBounds);
      });
    },
    render: function() {
      mapView.container.append(googleMap);
    },
  }
  var educationView = {
    init: function() {
      this.container = $('#education');
    },
    render: function() {
      octopus.getSchools().forEach(function(item) {
        console.log(item)
        var $educationEntry = $('<div class="work-entry"></div>');
        var $educationName = $('<a href="#">' + item.name + ' -- ' + item.degree + '</a>')
        var $educationDate = $('<div class="date-text">' + item.dates + '</div>')
        var $educationLocation = $('<div class="location-text">%data%</div>')
        var $educationMajor = $('<em><br>Major: %data%</em>')
        $educationEntry.append($educationName).append($educationDate).append($educationLocation).append(
          $educationMajor);
        educationView.container.append($educationEntry);
      });
      educationView.container.append(educationView.renderOnline());
      educationView.container.show();
    },
    renderOnline: function() {
      var HTMLonlineClasses = '<h3>Online Classes</h3>';
      var HTMLonlineTitle = '<a href="#">%data%';
      var HTMLonlineSchool = ' - %data%</a>';
      var HTMLonlineDates = '<div class="date-text">%data%</div>';
      var $onlineContainer = $('<h3>Online Classes</h3>')
      octopus.getOnlineCourses().forEach(function(item) {
        var entry = $('<a href="#">' + item.title + ' - ' + item.school + '</a><div class="date-text">' +
          item.date + '</div><br><a href="#">%data%</a>');
        $onlineContainer.append(entry);
      });
      return $onlineContainer;
    },
  }
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
        projectView.container.append($projectEntry);
      });
      projectView.container.show();
    },
  }
  octopus.init();
});