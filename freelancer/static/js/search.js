    /*!
 * JavaScript Cookie v2.1.4
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
    var registeredInModuleLoader = false;
    if (typeof define === 'function' && define.amd) {
        define(factory);
        registeredInModuleLoader = true;
    }
    if (typeof exports === 'object') {
        module.exports = factory();
        registeredInModuleLoader = true;
    }
    if (!registeredInModuleLoader) {
        var OldCookies = window.Cookies;
        var api = window.Cookies = factory();
        api.noConflict = function () {
            window.Cookies = OldCookies;
            return api;
        };
    }
}(function () {
    function extend () {
        var i = 0;
        var result = {};
        for (; i < arguments.length; i++) {
            var attributes = arguments[ i ];
            for (var key in attributes) {
                result[key] = attributes[key];
            }
        }
        return result;
    }

    function init (converter) {
        function api (key, value, attributes) {
            var result;
            if (typeof document === 'undefined') {
                return;
            }

            // Write

            if (arguments.length > 1) {
                attributes = extend({
                    path: '/'
                }, api.defaults, attributes);

                if (typeof attributes.expires === 'number') {
                    var expires = new Date();
                    expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
                    attributes.expires = expires;
                }

                // We're using "expires" because "max-age" is not supported by IE
                attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

                try {
                    result = JSON.stringify(value);
                    if (/^[\{\[]/.test(result)) {
                        value = result;
                    }
                } catch (e) {}

                if (!converter.write) {
                    value = encodeURIComponent(String(value))
                        .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
                } else {
                    value = converter.write(value, key);
                }

                key = encodeURIComponent(String(key));
                key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
                key = key.replace(/[\(\)]/g, escape);

                var stringifiedAttributes = '';

                for (var attributeName in attributes) {
                    if (!attributes[attributeName]) {
                        continue;
                    }
                    stringifiedAttributes += '; ' + attributeName;
                    if (attributes[attributeName] === true) {
                        continue;
                    }
                    stringifiedAttributes += '=' + attributes[attributeName];
                }
                return (document.cookie = key + '=' + value + stringifiedAttributes);
            }

            // Read

            if (!key) {
                result = {};
            }

            // To prevent the for loop in the first place assign an empty array
            // in case there are no cookies at all. Also prevents odd result when
            // calling "get()"
            var cookies = document.cookie ? document.cookie.split('; ') : [];
            var rdecode = /(%[0-9A-Z]{2})+/g;
            var i = 0;

            for (; i < cookies.length; i++) {
                var parts = cookies[i].split('=');
                var cookie = parts.slice(1).join('=');

                if (cookie.charAt(0) === '"') {
                    cookie = cookie.slice(1, -1);
                }

                try {
                    var name = parts[0].replace(rdecode, decodeURIComponent);
                    cookie = converter.read ?
                        converter.read(cookie, name) : converter(cookie, name) ||
                        cookie.replace(rdecode, decodeURIComponent);

                    if (this.json) {
                        try {
                            cookie = JSON.parse(cookie);
                        } catch (e) {}
                    }

                    if (key === name) {
                        result = cookie;
                        break;
                    }

                    if (!key) {
                        result[name] = cookie;
                    }
                } catch (e) {}
            }

            return result;
        }

        api.set = api;
        api.get = function (key) {
            return api.call(api, key);
        };
        api.getJSON = function () {
            return api.apply({
                json: true
            }, [].slice.call(arguments));
        };
        api.defaults = {};

        api.remove = function (key, attributes) {
            api(key, '', extend(attributes, {
                expires: -1
            }));
        };

        api.withConverter = init;

        return api;
    }

    return init(function () {});
}));
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
	

        function toggleChevron(e) {
		$(e.target)
				.prev('.panel-heading')
				.find("i.indicator")
				.toggleClass('fa-caret-down fa-caret-right');
	}
	$('#accordion').on('hidden.bs.collapse', toggleChevron);
	$('#accordion').on('shown.bs.collapse', toggleChevron);
var skills=[];
var addSkills=function(skill)
{
	this.getSkillName=function()
	{
		return skill;
	}
}

var populateSkills = function(){
 	$.ajax({
 		url : 'skills',
 		method : 'GET',
 		success: function(response){
 			for( skill in response['skills'])
            {
            	skills.push(new addSkills(response['skills'][skill]));
            }
            var skillstr="<ul class=\"list-group\">"
            for(skill in skills)
            {
            	skillstr+="<li class=\"list-group-item\"><div class=\"checkbox\"><label><input type=\"checkbox\" name=\"checks\" value=\""+skills[skill].getSkillName()+"\">"+skills[skill].getSkillName()+
            	"</label></div></li>"
            }
            // skillstr+="<li class=\"list-group-item\"><div><input type=\"submit\" value=\"Show Results\"> </div></li>"
            skillstr+="</ul>"
            console.log(skillstr);
            $('#skillsBody').html(skillstr);
        }

});
}
// Object { skill_type: "js", budget: "12.00", Title: "prt", ProjectPoster: "testuser", description: "prt is bond" }

var projectMaker=function(project)
{
    this.getSkillType=function()
    {
        return project.skill_type;
    }
    this.getBudget=function()
    {
        return project.budget;
    }
    this.getTitle=function()
    {
        return project.Title;
    }
    this.getDescription=function()
    {
        return project.description;
    }
    this.getProjectPoster=function()
    {
        return project.ProjectPoster;
    }
    this.getProjectPoster=function()
    {
        return project.ProjectPoster;
    }
    this.getDeadline=function(){
    	return project.deadline;
    }
    this.getNoBids=function(){
    	return project.nobids;
    }
    this.getProjectPK=function()
    {
        return project.projectid;
    }
    this.getButtonClass=function()
    {
        return project.buttonVal;
    }
}
var test=[];
var pid="";
var search=function()
{
    var projects=[];
    var ordering=$('input[name="ordering"]:checked').val();
    var checks = new Array();
    $("input[name='checks']:checked").each(function(i) {
    checks.push($(this).val());
    });
    var name=$('input[name="search_pro_name"]').val();
    $.ajax({
    url : 'searchskill',
    data :{
        
        'checks':checks,
        'ordering':ordering,
        'nameSearch':name,
    },
    method : 'GET',
    success: function(response){
        test=response;
        console.log(response);
        var projectstr="";
        var noofProjects="";
        for(projs in response['proj_list'])
        {
           projects.push(new projectMaker(response['proj_list'][projs]));
        }
        noofProjects+="<strong class=\"text-danger\">"+response['proj_list'].length+"</strong> results were found"                               
        $('#searchResults').html(noofProjects);
        for(projs in projects)
        {
            projectstr+="<article class=\"search-result row\"><div class=\"col-xs-12 col-sm-12 col-md-3\"><ul class=\"meta-search\">"
                    +"<li><i class=\"glyphicon glyphicon-calendar\"></i>"+"<span>"+projects[projs].getDeadline()+"</span></li>"+
                    "<li><i class=\"glyphicon glyphicon-usd\"></i>"+"<span>"+projects[projs].getBudget()+"</span></li>"+
                    "<li><i class=\"glyphicon glyphicon-tags\"></i>"+"<span>"+projects[projs].getNoBids()+"</span></li></ul></div>";
            // if(projects[projs].getButtonClass() == 'disabled')
            //     x="return false;"
            // else
            //     x="pid=new idSelector(this.className)"
            projectstr+="<div class=\"col-xs-12 col-sm-12 col-md-7 excerpet\">"+
                "<h3><a href=\"#\" title=\"\">"+projects[projs].getTitle()+"</a></h3>"+
                "<p class=\"divp\">"+projects[projs].getDescription()+"</p>"                        
                +"<span class=\"plus\" id=\""+projects[projs].getProjectPK()+"\"><a href=\"#\" class=\""+projects[projs].getProjectPK()+"\" id='bidclick' data-toggle=\"modal\" data-target=\"#myModal\" onclick=\"pid=new idSelector(this.className)\">Bid</a></span></div>"
            +"<span class=\"clearfix borda\"></span></article>";
            projectstr+="<hr />";
        }
        $('#projectPopulate').html(projectstr);

    },
    error: function(response)
    {
        console.log(response.responseText);
    }
});

}
$(window).on('load',function(){
 	populateSkills();
 	search();
 });
$(document).ready(function() {
          $("#slider").slider({
              animate: true,
              value:1,
              min: 0,
              max: 1000,
              step: 10,
              slide: function(event, ui) {
                  update(1,ui.value); //changed
              }
          });

          $("#slider2").slider({
              animate: true,
              value:0,
              min: 0,
              max: 500,
              step: 1,
              slide: function(event, ui) {
                  update(2,ui.value); //changed
              }
          });

          //Added, set initial value.
          $("#amount").val(0);
          $("#duration").val(0);
          $("#amount-label").text(0);
          $("#duration-label").text(0);
          
          update();
      });

      //changed. now with parameter
      function update(slider,val) {
        //changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
        var $amount = slider == 1?val:$("#amount").val();
        var $duration = slider == 2?val:$("#duration").val();

        /* commented
        $amount = $( "#slider" ).slider( "value" );
        $duration = $( "#slider2" ).slider( "value" );
         */

         $total = "$" + ($amount * $duration);
         $( "#amount" ).val($amount);
         $( "#amount-label" ).text($amount);
         $( "#duration" ).val($duration);
         $( "#duration-label" ).text($duration);
         $( "#total" ).val($total);
         $( "#total-label" ).text($total);

         $('#slider a').html('<label><span class="glyphicon glyphicon-chevron-left"></span> '+$amount+' <span class="glyphicon glyphicon-chevron-right"></span></label>');
         $('#slider2 a').html('<label><span class="glyphicon glyphicon-chevron-left"></span> '+$duration+' <span class="glyphicon glyphicon-chevron-right"></span></label>');
      }
var idSelector=function(id)
{
    console.log("working");
    console.log(this)
    this.getProjectid=function()
    {
        return id;
    }
    
}
var placeBid=function(id)
{
    var csrftoken = Cookies.get('csrftoken');
    var projectid=pid.getProjectid();
    var amount=$('#amount-label').html();
    var duration=$('#duration-label').html();
    $.ajaxSetup({
    beforeSend: function(xhr, settings) 
    {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) 
        {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
    });

    $.ajax({
    url     : 'addbid',
    method  : 'POST',
    data    :{
                'project_id':projectid,
                    'amount':amount,
                    'duration':duration,
                    'csrfmiddlewaretoken': csrftoken
                },
    success: function(response)
    {
        location.reload()
    },
    error: function(response)
    {
        alert(response.responseText);
    }
});

}
