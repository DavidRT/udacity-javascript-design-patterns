/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */

$(function() {
  // audiencia = attendance
  /* MODEL */
var model = {
    people: [{
        name: "Harry",
        audiencia: [],
        missed: 0
    }, {
        name: "Ron",
        audiencia: [],
        missed: 0
    }, {
        name: "Hermione",
        audiencia: [],
        missed: 0
    }],
    init: function() {
        model.generateRandomAudence();
    },

    /* generate random 12 audience (true or false) for every person in array */
    generateRandomAudence: function() {
        this.people.forEach(function(item) {
            for (var i = 0; i < 12; i++) {
                item.audiencia.push(model.getRandom());
                model.setMissed(item);
            }
        });
    },

    setMissed: function(people) {
        var missedAux = 0;
        people.audiencia.forEach(function(item) {
            if (!item) {
                missedAux++;
            }
        });
        people.missed = missedAux;
    },

    getPeople: function() {
        return this.people;
    },

    /* return random true or false */
    getRandom: function() {
        return (Math.random() >= 0.5);
    },
    updateAudence: function(indexPeople,indexAudence){
        var actual = this.people[indexPeople].audiencia[indexAudence];
        console.log(actual);
        var newValue = actual ? false : true; 
        if ( actual ){

        }

        this.people[indexPeople].audiencia[indexAudence] = newValue;
        model.setMissed(this.people[indexPeople]);
    },
    getPeopleByIndex: function(index){
        return this.people[index];
    }
};



var octopus = {

    init: function() {
        model.init();
        view.init();
        view.render();
    },
    getPeopleByIndex: function(index){
        console.log('===')
        console.log(model.getPeopleByIndex(index))
        console.log('===')
        return model.getPeopleByIndex(index);
    },
    getPeople: function() {
        return model.getPeople();
    },
    checkAudence: function(indexPeople,indexAudence){
        model.updateAudence(indexPeople,indexAudence);
        octopus.updateAudence();
    },
    updateAudence:function(){
       
    },

};


var view = {

    init: function() {
        this.bodyTable = $('#body-attendance');
        
    },
    renderAudence: function($tdMissed,people){
        $tdMissed.html(people.missed)
    },

    render: function() {
        octopus.getPeople().forEach(function(people,indexPeople) {

            var $tr = $('<tr class="student"></tr>');
            var $td = $('<td class="name-col">'+people.name+'</tr>');
            var $tdMissed = $('<td class="missed-col">' + people.missed + '</td>');
            $tr.append($td);
            people.audiencia.forEach(function(aud,indexAudence) {
           

                var $td = $('<td class="attend-col"></td>');
                var $check = $('<input type="checkbox" '+(aud ? 'checked' : '')+'>');

                // bind function to every check
                $check.on('click',function(){
                    octopus.checkAudence(indexPeople,indexAudence);               
                    view.renderAudence($tdMissed,people);
                });

                $td.append($check);
                $tr.append($td);
                
            });

            
            $tr.append($tdMissed);
            view.bodyTable.append($tr);
        });
    }
};


  octopus.init();
});

(function() {
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var nameColumns = $('tbody .name-col'),
            attendance = {};

        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}());


/* STUDENT APPLICATION */
$(function() {
    var attendance = JSON.parse(localStorage.attendance),
        $allMissed = $('tbody .missed-col'),
        $allCheckboxes = $('tbody input');

    // Count a student's missed days
    function countMissing() {
        $allMissed.each(function() {
            var studentRow = $(this).parent('tr'),
                dayChecks = $(studentRow).children('td').children('input'),
                numMissed = 0;

            dayChecks.each(function() {
                if (!$(this).prop('checked')) {
                    numMissed++;
                }
            });

            $(this).text(numMissed);
        });
    }

    // Check boxes, based on attendace records
    $.each(attendance, function(name, days) {
        var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
            dayChecks = $(studentRow).children('.attend-col').children('input');

        dayChecks.each(function(i) {
            $(this).prop('checked', days[i]);
        });
    });

    // When a checkbox is clicked, update localStorage
    $allCheckboxes.on('click', function() {
        var studentRows = $('tbody .student'),
            newAttendance = {};

        studentRows.each(function() {
            var name = $(this).children('.name-col').text(),
                $allCheckboxes = $(this).children('td').children('input');

            newAttendance[name] = [];

            $allCheckboxes.each(function() {
                newAttendance[name].push($(this).prop('checked'));
            });
        });

        countMissing();
        localStorage.attendance = JSON.stringify(newAttendance);
    });

    countMissing();
}());
