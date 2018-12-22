 /*!
  * JavaScript Cookie v2.1.4
  * https://github.com/js-cookie/js-cookie
  *
  * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
  * Released under the MIT license
  */
 (function(factory) {
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
         api.noConflict = function() {
             window.Cookies = OldCookies;
             return api;
         };
     }
 }(function() {
     function extend() {
         var i = 0;
         var result = {};
         for (; i < arguments.length; i++) {
             var attributes = arguments[i];
             for (var key in attributes) {
                 result[key] = attributes[key];
             }
         }
         return result;
     }

     function init(converter) {
         function api(key, value, attributes) {
             var result;
             if (typeof document === 'undefined') {
                 return;
             }


             if (arguments.length > 1) {
                 attributes = extend({
                     path: '/'
                 }, api.defaults, attributes);

                 if (typeof attributes.expires === 'number') {
                     var expires = new Date();
                     expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
                     attributes.expires = expires;
                 }


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


             if (!key) {
                 result = {};
             }

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
         api.get = function(key) {
             return api.call(api, key);
         };
         api.getJSON = function() {
             return api.apply({
                 json: true
             }, [].slice.call(arguments));
         };
         api.defaults = {};

         api.remove = function(key, attributes) {
             api(key, '', extend(attributes, {
                 expires: -1
             }));
         };

         api.withConverter = init;

         return api;
     }

     return init(function() {});
 }));

 function csrfSafeMethod(method) {

     return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
 }
 var users = [];

 $(window).on("hashchange load", gethash);
 $(window).on("hashchange load", showInvalid);
 $(window).on("load", function() {
     $.ajax({
         url: 'usernames',
         method: 'GET',
         data: {},
         success: function(response) {
             console.log(response);
             for (user in response['username']) {
                 users.push(new existingUserNames(response['username'][user], response['email'][user]));
             }
         },
         error: function(response) {
             users = response;
         }
     });
 })

 function gethash() {
     a = '.' + window.location.hash.substring(1) + 'Modal';
     $(a).modal({
         show: true,
     })
 }
 $('#myCarousel').carousel({
     pause: 'none'
 })
 $().ready(function() {
     $('[rel="tooltip"]').tooltip();

 });

 jQuery(document).on('click', '.mega-dropdown', function(e) {
     e.stopPropagation()
 })

 function rotateCard(btn) {
     var $card = $(btn).closest('.card-container');
     console.log($card);
     if ($card.hasClass('hover')) {
         $card.removeClass('hover');
     } else {
         $card.addClass('hover');
     }
 }

 jQuery(document).on('click', '#inputOtp', function sendOtp() {
     $.ajax({
         url: '/sendOtp',
         method: 'POST',
         data: {
             email: $('#inputRegisterEmail').val(),
         },
         success: function(response) {
             console.log("suces")

         },
         error: function(response) {
             a = response;

         }
     });
     $('#inputOtp').text("Resend");
     console.log("otp");

 });

 function hashlogin() {
     window.location.hash = '#login';
 }

 function hashregister() {
     window.location.hash = '#register';
 }

 function showInvalid() {
     var str = window.location.hash;
     console.log(str)
     str = str.substr(1);
     if (str === "Login" || str === "Register") {
         $('.invalid').removeClass('hidden')
     } else $('.invalid').addClass('hidden');
 }
 var existingUserNames = function(username, email) {
     this.getUsername = function() {
         return username;
     }
     this.getEmail = function() {
         return email;
     }
 }
 var userMaker = function(username, firstname, lastname, email, userType, password, passwordConfirm, rating, otp) //make safe object // //validation//
 {
     for (existingUserName in users) {
         if (users[existingUserName].getUsername() === username) {
             alert("username already exists");
             return null;
         }
     }

     if ((/^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/.test(username) == false)) {
         alert("check username");
         return null;
     }

     if ((/^[a-zA-Z ]+$/.test(firstname) == false)) {
         alert("Check firstname");
         return null;
     }
     if ((/^[a-zA-Z ]+$/.test(lastname) == false)) {
         alert("Check lastname");
         return null;
     }
     if ((/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) == false)) {
         alert("check email");
         return null;
     }
     for (existingEmails in users) {
         if (users[existingEmails].getEmail() === email) {
             alert("email already exists");
             return null;
         }
     }
     if (password != passwordConfirm && password != "") {
         alert("passwords are not equal");
         return null;
     }
     var level = 0;
     var input = password;
     switch (true) {
         case /^(?:([A-Z])*){8,12}$/.test(input):
             level = 1;
             break;

         case /^(?:([a-z])*){8,12}$/.test(input):
             level = 1;
             break;

         case /^(?:([\d])*){8,12}$/.test(input):
             level = 1;
             break;

         case /^(?:([\W])*){8,12}$/.test(input):
             level = 1;
             break;

         case /^(?:([A-Z])*([a-z])*){8,12}$/.test(input):
             level = 2;
             break;

         case /^(?:([A-Z])*([a-z])*(\d)*){8,12}$/.test(input):
             level = 3;
             break;

         case /^(?:([A-Z])*([a-z])*(\d)*(\W)*){8,12}$/.test(input):
             level = 4;
             break;
     }
     if (level == 1 || input.length < 8) {
         alert("Enter a stronger password");
         return null;
     }
     this.getUsername = function() {
         return username;
     }
     this.getFirstName = function() {
         return firstname;
     }
     this.getLastName = function() {
         return lastname;
     }
     this.getEmail = function() {
         return email;
     }
     this.getOTP = function() {
         return otp;
     }
     this.getUserType = function() {
         return userType;
     }
     this.getPassword = function() {
         return password;
     }
     this.getPasswordConfirm = function() {
         return passwordConfirm;
     }
     this.getRating = function() {
         return rating;
     }

 }
 var makeUser = function() {
     var csrftoken = Cookies.get('csrftoken');
     var username = $('#inputRegisterUsername').val();
     var firstname = $('#inputRegisterFirstName').val();
     var lastname = $('#inputRegisterLastName').val();
     var email = $('#inputRegisterEmail').val();
     var userType = $('input[name="userType"]:checked').val();
     var password = $('#inputRegisterPassword').val();
     var passwordConfirm = $('#inputRegisterPasswordConfirm').val();
     var otp = $('#otp').val();
     var cookieValue = null;
     var userToRegister = new userMaker(username, firstname, lastname, email, userType, password, passwordConfirm, 0, otp)
     console.log(userToRegister);
     if (userToRegister === null) {
         return;
     }
     $.ajaxSetup({
         beforeSend: function(xhr, settings) {
             if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                 xhr.setRequestHeader("X-CSRFToken", csrftoken);
             }
         }
     });
     $.ajax({
         url: '/register',
         method: 'POST',
         data: {
             'csrfmiddlewaretoken': csrftoken,
             'username': userToRegister.getUsername(),
             'fname': userToRegister.getFirstName(),
             'lname': userToRegister.getLastName(),
             'email': userToRegister.getEmail(),
             'userType': userToRegister.getUserType(),
             'password': userToRegister.getPassword(),
             'confirm_password': userToRegister.getPasswordConfirm(),
             'otp': userToRegister.getOTP(),
         },
         success: function(response) {
             window.location.hash = "";
             window.location = response;
             a = response;
         },
         error: function(response) {
             alert(response.responseText);
             a = response;
         }
     });
     return;

 }
 var existingUserlogin = function() {
     var csrftoken = Cookies.get('csrftoken');
     var username = $('#inputUsername').val();
     var password = $('#inputPassword').val();
     $.ajaxSetup({
         beforeSend: function(xhr, settings) {
             if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                 xhr.setRequestHeader("X-CSRFToken", csrftoken);
             }
         }
     });
     $.ajax({
         url: '/authen',
         method: 'POST',
         data: {
             'csrfmiddlewaretoken': csrftoken,
             'username': username,
             'password': password
         },
         success: function(response) {
             console.log(response)
             window.location.hash = "";
             window.location = response;
             a = response;
         },
         error: function(response) {
             a = response;
         }
     });
     return;
 }