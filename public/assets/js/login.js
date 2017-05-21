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
