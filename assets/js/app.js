
$(document).ready(function(){

  var config = {
    apiKey: "AIzaSyAs-tqdZiFu5ad2KzZpj3-J_2Ps280qL1c",
    authDomain: "guestbook-8aaea.firebaseapp.com",
    databaseURL: "https://guestbook-8aaea.firebaseio.com",
    projectId: "guestbook-8aaea",
    storageBucket: "guestbook-8aaea.appspot.com",
    messagingSenderId: "417845094402"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();


/*// validations for users
  $("#login").validate({

    errorClass: 'invalid',
             errorPlacement: function (error, element) {
        $(element)
            .closest("form")
            .find("label[for='" + element.attr("id") + "']")
            .attr('data-error', error.text());
      },
      // Specify validation rules
      rules: {
        firstname: "required",
        email: {
          required: true,
          email: true
        },
        phone: {
           required: true,
             number: true
         }
        
      },
      // Specify validation error messages
      messages: {
        firstname: "Please enter your firstname",
        
        phone: {
                required: "Please enter your phone number",
                number: "Please enter only numeric value"
          },
        email: "Please enter a valid email address"
      },
      // Make sure the form is submitted to the destination defined
      // in the "action" attribute of the form when valid
      submitHandler: function(form) {
        event.preventDefault();
        // registeruser();
       }
    });
*/
  // add user data
  $("#addData").on("click", function(event){
    event.preventDefault();
    console.log("hi");
    
    var date1 = $("#date").val().trim();
    var firstName = $("#firstName").val().trim();
    var lastName = $("#lastName").val().trim();
    var email1 = $("#email").val().trim();
    var phone1 = $("#phoneNumber").val().trim();
    var addres = $("#address").val().trim();
    var city1 = $("#city").val().trim();
    var zipcode = $("#zipcode").val().trim();
    var about = $("#about").val().trim();
    var emailnotify = $("#emailnotify").val();
    var textnotify = $("#textnotify").val();

    var userinfo = {
        date1: date1,
        firstName: firstName,
        lastName: lastName,
        email1: email1,
        phone1: phone1,
        addres: addres,
        city1: city1,
        zipcode: zipcode,
        about: about,
        emailnotify: emailnotify,
        textnotify: textnotify
        }
        database.ref().push(userinfo);
        console.log(userinfo);
        alert("Angel's  Info successfully added");
        // Prevents moving to new page
        return false;


    });
  // for  entries from user
  database.ref().on("child_added", function(childSnapshot, prevChildKey){
    console.log(childSnapshot.val());

    var date =  childSnapshot.val().date1;
    var firstname = childSnapshot.val().firstName;
    var lastname = childSnapshot.val().lastName;
    var email = childSnapshot.val().email1;
    var ph = childSnapshot.val().phone1;
    var address = childSnapshot.val().addres;
    var city = childSnapshot.val().city1;
    var zip = childSnapshot.val().zipcode;
    var aboutUs = childSnapshot.val().about;
    var emailNotify = childSnapshot.val().emailnotify;
    var textNotify = childSnapshot.val().textnotify;

    // Add each user data into the table
  $("#userTable > tbody").prepend("<tr><td>" + date + "</td><td>" + firstname + "</td><td>" + lastname + "</td><td>" + email  + "</td><td>" + ph + "</td><td>"+ address + "</td><td>"+ city +"</td><td>"+ zip +"</td><td>"+ aboutUs +"</td><td>"+ emailNotify + "</td><td>"+ textNotify + "</td></tr>");
  
  }, function(err) {
        console.log(err);
});




  