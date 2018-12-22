// Starrr plugin (https://github.com/dobtco/starrr)
var __slice = [].slice;
var rate={};


$(document).ready(function(){
    $('[data-toggle="offcanvas"]').click(function(){
        $("#navigation").toggleClass("hidden-xs");
    });
    $('#fill').text($('.active')[0].className.substr(7))
});
var skills=[];
var addSkills=function(skill)
{
    this.getSkillName=function()
    {
        return skill;
    }
}

function remover(str){
    $('.active').removeClass('active')
    $('.common').addClass('hidden')
    clas = '\.' + str
    clasdiv = clas + 'div'
    // console.log(clas)
    $(clas).addClass('active');
    $(clasdiv).removeClass('hidden');
    str=str.split(/(?=[A-Z])/);
    str=str.join(" ");
    // console.log(str);
    $('#fill').text(str)
}

function opening(){
    if($('#search-bar').is(':hidden')){
        $('#search-bar').removeClass('hidden')
    }
    else $('#search-bar').addClass('hidden');
}


 var makeFreelancer = function(response){
    var csrftoken = response['csrf_token'];
    var f_name = response['first_name'];
    var l_name = response['last_name'];
    var email = response['emailAddress'];
    var rating = response['rating'];
    var ongo_projects = response['ongo_proj_list'];
    var comp_projects = response['compl_proj_list'];
    var profile_image = response['profile_image'];
    var bids = response['bids'];
    var username = response['username'];
    var skills = response['freelancer_skill'];


    var freelancer = {};
    function getF_name(){
        return f_name;
    }
    function getL_name(){
        return l_name;
    }
    function getCsrf(){
        return csrftoken;
    }
    function getEmail(){
        return email;
    }
    function getImagePath(){
        return profile_image;
    }
    function getRating(){
        return rating;
    }
    function getOngo_projects(){
        return ongo_projects;
    }
    function getComp_projects(){
        return comp_projects;
    }
    function getUsername(){
        return username;
    }

    function getCurrentBid(){
        return bids;
    }
    function getSkills(){
        return skills

    }
    freelancer.getF_name = getF_name;
    freelancer.getL_name = getL_name;
    freelancer.getCsrf = getCsrf;
    freelancer.getEmail = getEmail;
    freelancer.getRating = getRating;
    freelancer.getOngo_projects = getOngo_projects;
    freelancer.getComp_projects= getComp_projects;
    freelancer.getSkills = getSkills;
    freelancer.getUsername = getUsername;
    freelancer.getImagePath = getImagePath;
    freelancer.getCurrentBid = getCurrentBid;
    return freelancer
 }

 var freelancer;
 var populateUserPage = function(){
    $.ajax({
        url : 'renderpage',
        method : 'GET',
        success: function(response){
            // console.log("lalalsuccess")
            // console.log(response)
            for( skill in response['skills'])
            {
                skills.push(new addSkills(response['skills'][skill]));
            }
            var skillstr="";
            freelancer_skill_list = []
            for (skill in response['freelancer_skill'])
            {
                console.log(skill)
                freelancer_skill_list.push(response['freelancer_skill'][skill]['name']);
            }
            console.log(freelancer_skill_list[1])
            for(skill in skills)
            {
                if (freelancer_skill_list.indexOf(skills[skill].getSkillName()) != -1)
                    skillstr+="<div class=\"checkbox\"><label><input type=Checkbox name=skill value="+skills[skill].getSkillName()+" disabled=true checked=checked >"+skills[skill].getSkillName()+"</label></div>";
                else    
                    skillstr+="<div class=\"checkbox\"><label><input type=Checkbox name=skill value="+skills[skill].getSkillName()+">"+skills[skill].getSkillName()+"</label></div>";
            }
            $('#skillsBody').html(skillstr);
            freelancer = makeFreelancer(response);
            var str = ''
            var str = freelancer.getF_name() + ' ' + freelancer.getL_name();
            var path=freelancer.getImagePath();
            // path=path.split('/').slice(1).join('/');
            console.log(freelancer.getF_name());
            $('#f-l-name').text(str);
            $('.e-id').text("  "+freelancer.getEmail());
            $('#head4').text(str);
            $(".profile_pic").attr("src",'/' + path);
            $('.usen').text("  "+ freelancer.getUsername());
            $('.stars').attr('data-rating',freelancer.getRating());
            var table = '';
            for (project in freelancer.getOngo_projects()){
                var curr=freelancer.getOngo_projects()[project]
                table+='<tr>';
                table=table + '<td>' + curr['Title'] + '</td>'
                table=table + '<td>' + curr['description'] + '</td>'
                table+='</tr>';

            }
            $('#Ongotable').html(table);
            var table = '';
            for (project in freelancer.getComp_projects()){
                var curr=freelancer.getComp_projects()[project]
                table+='<tr>';
                table=table + '<td>' + curr['Title'] + '</td>';
                table=table + '<td>' + curr['description'] + '</td>';
                table=table + '<td>' + '<div class=\"container-fluid\"><div class=\"row lead\">';
                if(curr['projectPosterRating']!='0'){
                    console.log("true")
                    table+= '<div id=\"' + curr['id'] + '\" class=\"hearts\">'
                        for(i=0;i<curr['projectPosterRating'];i++){
                            table += '<span class=\"glyphicon .glyphicon-star-empty glyphicon-star\"></span>';
                        }
                        for(i=0;i<5-curr['projectPosterRating'];i++){
                            table += '<span class=\"glyphicon .glyphicon-star-empty glyphicon-star-empty\"></span>';
                        }
                    table=table + '</div></div></div>';
                }
                else{
                    var i= curr['id'];
                    i = i.toString();
                    rate[i] = 0; 
                    table+= '<div id=\"' + curr['id'] + '\" class=\"hearts starrr\"';
                    table=table + '</div></div></div>';
                  table=table + '<button onclick=giverating(\"' +curr['id']+ 'button\") type=\"button\" class=\"btn btn-success\">Give Rating</button>';
                }
                table+='</td>';
                table+='</tr>';
        
              }
      $('#compTable').html(table);
      var table = '';
      console.log(freelancer.getSkills()[0])
      for(skill in freelancer.getSkills()){
        table+='<tr>';
                table=table+ '<td style=\'text-align:center\'><button class=\'btn btn-danger\'><span class=\'fa fa-trash\'></span></button></td>'
        table=table + '<td>' + freelancer.getSkills()[skill]['name'] + '</td>'
                table+='</tr>'
            }
            $('#skillTable').html(table);
            currbids = freelancer.getCurrentBid();
            var table = '';
            for(bids in currbids){
                table+='<tr>';
                table=table + '<td>' + currbids[bids]['Title'] + '</td>'
                table=table + '<td>' + currbids[bids]['projectgiver'] + '</td>'
                table=table + '<td>' + '$ '+ currbids[bids]['amount'] + '</td>'
                table=table + '<td>' + currbids[bids]['duration'] + ' days' + '</td>'
                table+='</tr>';
            }
            // console.log(table)
            $('#bidsTable').html(table);
            var rating=freelancer.getRating();
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
            $('#csrf').val(freelancer.getCsrf());
            // $('#csrf')
    // var table = '';
    // for (project in freelancer['find_pro']){
    //  table+='<tr>';
    //  table+='<td align="center">';
//           table+='<a class="btn btn-default"><em class="fa fa-pencil"></em></a>'
//           table=table + '<a class="btn btn-danger"><em class="fa fa-trash"></em></a>' + '</td>'
//           table=table + '<td>' + freelancer.project.name + '</td>'
//           table=table + '<td>' + freelancer.project.description + '</td>'
//           table+='</tr>';

    // }
    // $('#findTable').html(table);
    $('input[name="fname"]').attr('value',freelancer.getF_name());
    $('input[name="lname"]').attr('value',freelancer.getL_name());
    $('input[name="email"]').attr('value',freelancer.getEmail());

},
error : function(xhr,display,eThrow){
    console.log("error");
    return display;
}
});
 }

var giverating = function(id){
  console.log("hello");
  var str = id;
  str = str.substr(0,str.length-6);
  console.log(str)
  var rati = rate[str];
  if(rati=='0'){
    alert("please give some rating");
    return null;
  } 
  $.ajax({
    url: 'rating',
    method: 'POST',
    data: {
      'csrfmiddlewaretoken' : freelancer.getCsrf(),
      'rating' : rati,
      'project_id' : str,
    },
    success: function(response){
      window.location = '/freelancer';
    },
    error: function(xhr,display,eThrow){
      console.log('error')
    },
  });
}

 $(window).on('load',function(){
    
    populateUserPage();
     // $('.stars').stars();

 });


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
        url: 'completed',
        method: 'POST',
        data: {
            'csrfmiddlewaretoken' : freelancer.getCsrf(),
            'proj_id' : pid.getId(),
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


 var makeEditedUser = function(){
    // console.log('dfd')
    firstname = $('input[name="fname"]').val();
    lastname = $('input[name="lname"]').val();
    email = $('input[name="email"]').val();
    if((/^[a-zA-Z ]+$/.test(firstname)==false))
    {
        alert("Check firstname");
        return null;
    }
    if((/^[a-zA-Z ]+$/.test(lastname)==false))
    {
        alert("Check lastname");
        return null;
    }
    if((/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)==false))
    {
        // alert("check emailAddressl");
        $('#checkEmail').removeClass('hidden');
    return null;
    }
    console.log(firstname);
    editer(firstname,lastname,email);
 }

 var makeEditPic = function(){
    firstname = $('input[name="fname"]').val();
    lastname = $('input[name="lname"]').val();
    email = $('input[name="email"]').val();
    if((/^[a-zA-Z ]+$/.test(firstname)==false))
    {
        alert("Check firstname");
        return null;
    }
    if((/^[a-zA-Z ]+$/.test(lastname)==false))
    {
        alert("Check lastname");
        return null;
    }
    if((/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)==false))
    {
        alert("check emaiol");
        return null;
    }
    console.log(firstname);
    editer(firstname,lastname,email);
 }

 function editer(firstname,lastname,email){
    $.ajax({
        url: 'editprofile',
        method: 'POST',
        data : {
            'csrfmiddlewaretoken' : freelancer.getCsrf(),
            'fname' : firstname,
            'lname' : lastname,
            'email' : email,
        },
        success: function(response){
            window.location='/freelancer'
        },
        error: function(xhr,display,eThrow){
            console.log(display);
        }
    });
 }

var notificationMaker=function(notification)
{
    var projectName=notification['project'];
    var projectGiver=notification['project_poster'];
    var notificationType=notification['noti_type'];
    var notificationId=notification['notification_id'];
    console.log(projectName);
    this.getProjectName=function()
    {
        return projectName; 
    }
    this.getProjectGiver=function()
    {
        return projectGiver;
    }
    this.getType=function()
    {
      return notificationType;
    }
    this.getId=function()
    {
      return notificationId;
    }

} 

var notification=[];
var makeNotifications=function()
{
    notification.length=0;
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
            var str="<a href=\"#\" class=\"icon-info\" data-toggle=\"dropdown\" onclick=\"notificationRemover()\"><span class=\"glyphicon glyphicon-bell\" aria-hidden=\"true\"></span>\""+
                    "<span class=\"label label-primary\" id=\"notification\">"+notification.length+"</span></a><ul class=\"dropdown-menu\"><li>"
            for(currentNotfications in notification)
            {
                if(notification[currentNotfications].getType()=="ongoing")
                {
                  str+="<div class=\"navbar-content\">"+"<span id=\"Ongoing\">Ongoing</span>"+
                  "<p class=\"text-muted small\" class=\"e-id\">"+notification[currentNotfications].getProjectName()+"</p>"+
                  "</div></li></ul>";
                }
                else
                {
                  str+="<div class=\"navbar-content\">"+"<span id=\"Completed\">Completed</span>"+
                  "<p class=\"text-muted small\" class=\"e-id\">"+notification[currentNotfications].getProjectName()+"</p>"+
                  "</div></li></ul>";

                }
            }
            $('#viewNotification').html(str);
        },
        error:function(response)
        {
            alert(response.responseText)
        }
    });

}
var notificationRemover=function()
{
  seenarr=[];
  for(notis in notification)
  {
    seenarr.push(notification[notis].getId())  
  }
  $.ajax({
    url:'clicknotification',
    method:'POST',
    data:{
          'csrfmiddlewaretoken' : freelancer.getCsrf(),
          'seenarr' : seenarr,
    },
    success: function(response)
    {
      console.log(response);
    },
    error:function(response)
    {
      console.log(response.responseText);
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
    // console.log("ready");
$(document).ready(function()
{

(function($, window) {
  var Starrr;

  Starrr = (function() {
    Starrr.prototype.defaults = {
      rating: void 0,
      numStars: 5,
      change: function(e, value) {}
    };

    function Starrr($el, options) {
      var i, _, _ref,
        _this = this;

      this.options = $.extend({}, this.defaults, options);
      this.$el = $el;
      _ref = this.defaults;
      for (i in _ref) {
        _ = _ref[i];
        if (this.$el.data(i) != null) {
          this.options[i] = this.$el.data(i);
        }
      }
      this.createStars();
      this.syncRating();
      this.$el.on('mouseover.starrr', 'span', function(e) {
        return _this.syncRating(_this.$el.find('span').index(e.currentTarget) + 1);
      });
      this.$el.on('mouseout.starrr', function() {
        return _this.syncRating();
      });
      this.$el.on('click.starrr', 'span', function(e) {
        return _this.setRating(_this.$el.find('span').index(e.currentTarget) + 1);
      });
      this.$el.on('starrr:change', this.options.change);
    }

    Starrr.prototype.createStars = function() {
      var _i, _ref, _results;

      _results = [];
      for (_i = 1, _ref = this.options.numStars; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--) {
        _results.push(this.$el.append("<span class='glyphicon .glyphicon-star-empty'></span>"));
      }
      return _results;
    };

    Starrr.prototype.setRating = function(rating) {
      if (this.options.rating === rating) {
        rating = void 0;
      }
      this.options.rating = rating;
      this.syncRating();
      return this.$el.trigger('starrr:change', rating);
    };

    Starrr.prototype.syncRating = function(rating) {
      var i, _i, _j, _ref;

      rating || (rating = this.options.rating);
      if (rating) {
        for (i = _i = 0, _ref = rating - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
          this.$el.find('span').eq(i).removeClass('glyphicon-star-empty').addClass('glyphicon-star');
        }
      }
      if (rating && rating < 5) {
        for (i = _j = rating; rating <= 4 ? _j <= 4 : _j >= 4; i = rating <= 4 ? ++_j : --_j) {
          this.$el.find('span').eq(i).removeClass('glyphicon-star').addClass('glyphicon-star-empty');
        }
      }
      if (!rating) {
        return this.$el.find('span').removeClass('glyphicon-star').addClass('glyphicon-star-empty');
      }
    };

    return Starrr;

  })();
  return $.fn.extend({
    starrr: function() {
      var args, option;

      option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return this.each(function() {
        var data;

        data = $(this).data('star-rating');
        if (!data) {
          $(this).data('star-rating', (data = new Starrr($(this), option)));
        }
        if (typeof option === 'string') {
          return data[option].apply(data, args);
        }
      });
    }
  });
})(window.jQuery, window);

$(function() {
  return $(".starrr").starrr();
});

$( document ).ready(function() {
  $('.hearts').on('starrr:change', function(e, value){
    console.log(value)
    console.log(this.id);
    value = value.toString();
    var i = this.id;
    i = i.toString();
    rate[i]=value;
  });
});
});
    