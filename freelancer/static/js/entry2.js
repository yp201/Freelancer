$(document).ready(function() {
    $('[data-toggle="offcanvas"]').click(function() {
        $("#navigation").toggleClass("hidden-xs");
    });
    $('#fill').text($('.active')[0].className.substr(7));
});
$('#options').change(function() {
    selected()
});

function remover(str) {
    $('.active').removeClass('active')
    $('.common').addClass('hidden')
    clas = '\.' + str
    clasdiv = clas + 'div'
    console.log(clas)
    $(clas).addClass('active')
    $(clasdiv).removeClass('hidden')
    str=str.split(/(?=[A-Z])/);
    str=str.join(" ");
    $('#fill').text(str)
}
var skills=[];
var addSkills=function(skill)
{
    this.getSkillName=function()
    {
        return skill;
    }
}


function selected() {
    console.log('1')
    var selected = [];
    selected = $('#options').val();
    str = selected.join(',')
    console.log(str);
    if (str === '') {
        str = 'Please select something from the skills list!'
    } else
        str = 'You selected : \n ' + str;
    $('#sel').text(str);
}

var makeProjectGiver = function(response) {
    var csrftoken = response['csrf_token']
    var f_name = response['first_name'];
    var l_name = response['last_name'];
    var email = response['emailAddress'];
    var rating = response['rating'];
    var ongo_projects = response['ongoproj'];
    var comp_projects = response['pastproj'];
    var username = response['username'];
    console.log(username);
    var profile_image = response['profile_image'];
    var currbids = response['bids']
    var projectgiver = {};

    function getF_name() {
        return f_name;
    }

    function getL_name() {
        return l_name;
    }

    function getCsrf() {
        return csrftoken;
    }

    function getEmail() {
        return email;
    }

    function getRating() {
        return rating;
    }

    function getOngo_projects() {
        return ongo_projects;
    }

    function getComp_projects() {
        return comp_projects;
    }

    function getUsername() {
        return username;
    }

    function getImage() {
        return profile_image;
    }
    function getBids(){
        return currbids;
    }
    projectgiver.getF_name = getF_name;
    projectgiver.getL_name = getL_name;
    projectgiver.getCsrf = getCsrf;
    projectgiver.getEmail = getEmail;
    projectgiver.getRating = getRating;
    projectgiver.getOngo_projects = getOngo_projects;
    projectgiver.getComp_projects = getComp_projects;
    projectgiver.getUsername = getUsername;
    projectgiver.getImage = getImage;
    projectgiver.getBids = getBids;
    return projectgiver
}
var pid;
// var imgsrc;
var projectgiver;
var populateProjectGiverPage = function() {
    $.ajax({
        url: 'renderpage',
        method: 'GET',
        success: function(response) {
            console.log("lalalsuccess")
            console.log(response)
            for( skill in response['skills'])
            {
                skills.push(new addSkills(response['skills'][skill]));
            }
            console.log(skills)
            var skillstr="<option selected=\"selected\" disabled>Choose appropriate skills</option>"

            for(skill in skills)
            {
                skillstr+="<option value=\""+skills[skill].getSkillName()+"\">"+skills[skill].getSkillName()+"</option>";
            }
            $('#options').html(skillstr);
            console.log(skillstr);   
            projectgiver = makeProjectGiver(response);
            var str = '';
            var str = projectgiver.getF_name() + ' ' + projectgiver.getL_name();
            // alert(projectgiver.getImage());
            //imgsrc=projectgiver.getImage().split("/").splice(1).join("/");
            // alert(imgsrc);
            $('.image').attr('src','/'+projectgiver.getImage())
            $('#f-l-name').text(str);
            $('.e-id').text("  "+projectgiver.getEmail());
            $('#head4').text(str);
            $('#username').text("  "+projectgiver.getUsername());
            $('.stars').attr('data-rating', projectgiver.getRating());
            var table = '';
            for (project in projectgiver.getOngo_projects()) {
                var curr=projectgiver.getOngo_projects()[project]
                table += '<tr>';
                table += '<td align="center">';
                // table += '<a class="btn btn-success btn-xs"><span id=\"' + curr['id'] + '\"class="glyphicon glyphicon-ok select" onclick=\"completeId(this.id);\"></span></a>'
                table += '<button class=\"btn btn-success btn-xs\" data-toggle=\"modal\" data-target=\".bs-example-modal-lg\" onclick=\"completeId(' + curr['id'] + ')\"><span id=\"' + curr['id'] + '\"class=\"glyphicon glyphicon-ok select\" ></span></button>'
                table = table + '<td>' + curr['Title'] + '</td>'
                table = table + '<td>' + curr['description'] + '</td>'
                table += '</tr>';

            }
            $('#Ongotable').html(table);
            var table = '';
            for (project in projectgiver.getComp_projects()) {
                var curr=projectgiver.getComp_projects()[project]
                table += '<tr>';
                table = table + '<td>' + curr['Title'] + '</td>'
                table = table + '<td>' + curr['description'] + '</td>'
                table += '</tr>';

            }
            $('#compTable').html(table);
            var table = '';
            var currbids = projectgiver.getBids();
            console.log(currbids)
            // str = '<div class="modal fade bs-example-modal-lg modal2" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"><div class="modal-dialog modal-lg modal2"><div class="modal-content modal2"><div class="modal-body modal2"><h2 style="text-weight:bold">Please Rate The Freelancer</h2><fieldset class="rating"><input type="radio" id="star5" name="rating" value="5" /><label for="star5" title="Rocks!">5 stars</label><input type="radio" id="star4" name="rating" value="4" /><label for="star4" title="Pretty good">4 stars</label><input type="radio" id="star3" name="rating" value="3" /><label for="star3" title="Meh">3 stars</label><input type="radio" id="star2" name="rating" value="2" /><label for="star2" title="Kinda bad">2 stars</label><input type="radio" id="star1" name="rating" value="1" /><label for="star1" title="Not that great">1 star</label></fieldset><br /><br /><button type="button" class="btn btn-danger"><span>Submit Rating</span></button><br /><br /></div></div></div></div>'
            for (bid in currbids) {
                console.log(bid)
                table += '<tr>';
                table += '<td>';
                table += '<button class=\"btn btn-success btn-xs\" onclick=\"saveId(' + currbids[bid]['id'] + ')\"><span id=\"' + currbids[bid]['id'] + '\"class=\"glyphicon glyphicon-ok select\" ></span></button>'
                table += '</td>'
                table = table + '<td>' + currbids[bid]['Title'] + '</td>'
                table = table + '<td>' + currbids[bid]['freelancer'] + '</td>'
                table = table + '<td>' + '$ '+currbids[bid]['amount'] + '</td>'
                table = table + '<td>' + currbids[bid]['duration'] +' days' + '</td>'
                table = table + '<td>' + currbids[bid]['budget'] + '</td>'
                
                table += '</tr>';
            }
            $('#bidsTable').html(table);
            var rating=projectgiver.getRating();
            rating=parseFloat(rating);
            var numStars = 5;
            console.log(rating);
            console.log(Math.floor(rating + 1))
            var fullStar = new Array(Math.floor(rating + 1)).join('<i class="glyphicon glyphicon-star"></i>');
            var halfStar = ((rating%1) !== 0) ? '<i class="glyphicon glyphicon-star half"></i>': '';

            var noStar = new Array(Math.floor(numStars + 1 - rating)).join('<i class="glyphicon glyphicon-star-empty"></i>');
            // console.log(halfStar)
            // console.log(fullStar + halfStar + noStar)
            $('#stars').html(fullStar + halfStar + noStar);
            $('#rating').text(rating+'/'+numStars);
            $('#csrf').val(projectgiver.getCsrf());
            // $('#csrf').val()=projectgiver.getCsrf();
            // var table = '';
            // for (project in projectgiver['find_pro']){
            //  table+='<tr>';
            //  table+='<td align="center">';
            //           table+='<a class="btn btn-default"><em class="fa fa-pencil"></em></a>'
            //           table=table + '<a class="btn btn-danger"><em class="fa fa-trash"></em></a>' + '</td>'
            //           table=table + '<td>' + projectgiver.project.name + '</td>'
            //           table=table + '<td>' + projectgiver.project.description + '</td>'
            //           table+='</tr>';

            // }
            // $('#findTable').html(table);
            $('input[name="fname"]').attr('value', projectgiver.getF_name());
            $('input[name="lname"]').attr('value', projectgiver.getL_name());
            $('input[name="email"]').attr('value', projectgiver.getEmail());

        },
        error: function(xhr, display, eThrow) {
            console.log("error");
            return display;
        }
    });
}

var makeId = function(id){
    var pid ={};
    var getId = function(){
        return id;
    }
    pid.getId = getId;
    return pid;
}

var saveId = function(id){
    pid = makeId(id);
    $.ajax({
        url: 'confirm',
        method: 'POST',
        data: {
            'csrfmiddlewaretoken' : projectgiver.getCsrf(),
            'bid_id' : pid.getId(),
        },
        success : function(response){
            location.reload();
        },
        error: function(xhr, display, eThrow) {
            console.log("error");
            return display;
        },
    });
}
var completeId = function(id){
    
    pid = makeId(id);
    
}
var complete = function(){
    console.log(pid.getId())
    console.log($('input[name=rating]:checked').val());
    $.ajax({
        url: 'completed',
        method: 'POST',
        data: {
            'csrfmiddlewaretoken' : projectgiver.getCsrf(),
            'proj_id' : pid.getId(),
            'rating' : $('input[name=rating]:checked').val(),
        },
        success : function(response){
            location.reload();
            //console.log(response)
        },
        error: function(response) {
            //console.log("error");
            //console.log(response);
            return display;
        },
    });
}

$(window).on('load',function(){
populateProjectGiverPage();
});

// var idSelector=function(id)
// {
//     console.log("working");
//     console.log(this)
//     this.getProjectid=function()
//     {
//         return id;
//     }
// }

var selectfree = function(){

}
var notificationMaker=function(notification)
{
    var projectName=notification['project'];
    var projectGiver=notification['project_poster'];
    console.log(projectName);
    this.getProjectName=function()
    {
        return projectName; 
    }
    this.getProjectGiver=function()
    {
        return projectGiver;
    }

} 
var makeNotifications=function()
{
    var notification=[];
    $.ajax({
        url:'notifications',
        method:'GET',
        success:function(response)
        {
            test=response;
            console.log(response);
            for (i in response['notification_list'])
            {
                console.log(i);
                notification.push(new notificationMaker(response['notification_list'][i]));
            }
            var str="<a href=\"#\" class=\"icon-info\" data-toggle=\"dropdown\"><span class=\"glyphicon glyphicon-bell\" aria-hidden=\"true\"></span>\""+
                    "<span class=\"label label-primary\" id=\"notification\">"+notification.length+"</span></a><ul class=\"dropdown-menu\"><li>"
            for(currentNotfications in notification)
            {
                str+="<div class=\"navbar-content\">"+"<span id=\"Ongoing\"></span>"+
                "<p class=\"text-muted small\" class=\"e-id\">"+notification[currentNotfications].getProjectName()+"</p>"+
                "</div></li></ul>";
            }
            $('#viewNotification').html(str);
        },
        error:function(response)
        {
            alert(response.responseText)
        }
    });

}
$(window).on('load',function(){
        makeNotifications();
});
setInterval(function() {
    makeNotifications();
  // This will be executed every 5 seconds
}, 10000);
var makeEditedUser = function() {
    console.log('dfd')
    firstname = $('input[name="fname"]').val();
    lastname = $('input[name="lname"]').val();
    email = $('input[name="email"]').val();
    if ((/^[a-zA-Z ]+$/.test(firstname) == false)) {
        alert("Check firstname");
        return null;
    }
    if ((/^[a-zA-Z ]+$/.test(lastname) == false)) {
        alert("Check lastname");
        return null;
    }
    if ((/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) == false)) {
        alert("check emaiol");
        return null;
    }
    console.log(firstname);
    editer(firstname, lastname, email);
}

function editer(firstname, lastname, email) {
    $.ajax({
        url: 'editprofile',
        method: 'POST',
        data: {
            'csrfmiddlewaretoken': projectgiver.getCsrf(),
            'fname': firstname,
            'lname': lastname,
            'email': email,
        },
        success: function(response) {
            window.location = '/projectgiver'
        },
        error: function(xhr, display, eThrow) {
            console.log(display);
        }
    });
}

var add = function() {
    var pro_name = $('input[name="Title"]').val();
    var budget = $('input[name="budget"]').val();
    var deadline = $('input[name="deadline"]').val();
    var selected = $('#options').val();
    var description = $('textarea[name="description"]').val();
    if ((/^[a-zA-Z ]+$/.test(pro_name) == false) || pro_name=="") {
        alert("Check Title");
        return null;
    }
    if(/\D/.test(budget) || budget=="") {
        alert("Check budget");
        return null
    }
    if((((/^([0-9]{2})[-\/]([0-9]{2})[-\/]([0-9]{4})+$/).test(deadline))==false) || deadline==""){
        alert("Check Deadline");
        return null;
    }   
       console.log('here')
       console.log(selected)
    addpro(pro_name,budget,selected,deadline,description);
}

var addpro = function(pro_name,budget,selected,deadline,description){
$.ajax({
        url: 'addPro',
        method: 'POST',
        data: {
            'csrfmiddlewaretoken': projectgiver.getCsrf(),
            'Title': pro_name,
            'budget' : budget,
            'project_skills' : selected,
            'deadline': deadline,
            'description' : description,
        },
        success: function(response) {
            alert("DFDF")
            window.location='/projectgiver'
        },
        error: function(xhr, display, eThrow) {
            console.log(display);
        }
    });   
}


$(window).on('load',function(){
    $('input[name="Title"]')[0].value = "";
    $('input[name="budget"]')[0].value="";
    $('input[name="deadline"]')[0].value="";
    // var selected = $('#options').val();
    $('textarea[name="description"]')[0].value="";
})
