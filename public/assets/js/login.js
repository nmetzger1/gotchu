// Removes Place holder on click USERNAME
$(document).on("focus" , ".username" , function () {

           $(this).removeAttr('placeholder');
       });
$(document).on("focusout" , ".username" , function () {

         if($(this).val() == ''){
             $(this).attr('placeholder' , "Username");
         }
   });
// Removes Place holder on click PASSWORD
$(document).on("focus" , ".password" , function () {

           $(this).removeAttr('placeholder');
       });
$(document).on("focusout" , ".password" , function () {

         if($(this).val() == ''){
             $(this).attr('placeholder' , "Password");
         }
   });

// Removes Place holder on click Email
$(document).on("focus" , ".email" , function () {

           $(this).removeAttr('placeholder');
       });
$(document).on("focusout" , ".email" , function () {

         if($(this).val() == ''){
             $(this).attr('placeholder' , "Email");
         }
   });
// Removes Place holder on click confirm Password
$(document).on("focus" , ".confirmPass" , function () {

           $(this).removeAttr('placeholder');
       });
$(document).on("focusout" , ".confirmPass" , function () {

         if($(this).val() == ''){
             $(this).attr('placeholder' , "Confirm Password");
         }
   });

// Removes Place holder on click confirm Password
$(document).on("focus" , ".zipcode" , function () {

           $(this).removeAttr('placeholder');
       });
$(document).on("focusout" , ".zipcode" , function () {

         if($(this).val() == ''){
             $(this).attr('placeholder' , "Zipcode");
         }
   });
