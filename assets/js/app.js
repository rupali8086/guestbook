
$(document).ready(function(){
   // $('.modal').modal();

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


// validations for users
 $("#registration-form").validate({

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

        email: "Please enter a valid email address",
        
        phone: {
                required: "Please enter your phone number",
                number: "Please enter only numeric value"
          }
        
      }
      // Make sure the form is submitted to the destination defined
      // in the "action" attribute of the form when valid
      // submitHandler: function(form) {
      //   event.preventDefault();
      //   registeruser();
      //  }
    });

  // add user data
  // function registeruser(){

  //   event.preventDefault();

    $("#addData").on("click", function(event){
      
    event.preventDefault();
    console.log("");


    var date1 = moment($("#date").val().trim()).format('MM/DD/YYYY');
    var firstName = $("#firstName").val().trim();
    var lastName = $("#lastName").val().trim();
    var email1 = $("#email").val().trim();
    var phone1 = $("#phoneNumber").val().trim();
    var addres = $("#address").val().trim();
    var city1 = $("#city").val().trim();
    var zipcode = $("#zipcode").val().trim();
    var about = $("#about").val().trim();
    var emailnotify = false;
    var textnotify = false; 

    console.log("Email :: "+emailnotify+" TEXT :: "+textnotify);

    if($("#emailnotify").is(":checked")) 
      emailnotify = true; 
    else 
      emailnotify = false;

    if($("#textnotify").is(":checked")) 
      textnotify = true; 
    else 
      textnotify = false;

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


    
        // alert("Thank you , your Info successfully added");
        // $('.modal').modal();
        
        $("#exampleModalCenter").modal("show");

        $("#date").val("");
        $("#firstName").val("");
        $("#lastName").val("");
        $("#email").val("");
        $("#phoneNumber").val("");
        $("#address").val("");
        $("#city").val("");
        $("#zipcode").val("");
        $("#about").val("");
        $("#emailnotify").val("");
        $("#textnotify").val("");

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

/* // });

//on click command to delete key when user clicks the trash gliphicon
        $(document).on("click", ".glyphicon-trash", deleteUser);

         function deleteUser() {
          alert("are you sure , you want delete this data ??");
          // if()
          var deleteKey = $(this).attr("id");
            database.ref().child(deleteKey).remove();
            location.reload();
        }
  */
   });   

