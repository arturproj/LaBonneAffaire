// some scripts

// jquery ready start
$(document).ready(function () {
  // jQuery code
  $("[id^=button]").on("click", function () {
    $("[id^=button]").removeClass( "active" )
    $(this).addClass( "active" )
    const templateID = $(this).attr("id").replace("button", "admin");
    console.log($(this).attr("id"), templateID);
    var template = $(`#${templateID}`).html();    
    // Compile the template data into a function    
    var templateScript = Handlebars.compile(template);    
    // Define data in JSON format.    
    var context = {    
        "WelcomMsg": "Hello World!",    
        "name": "Handlebars Template Engine"    
    };    
    // Pass Data to template script.    
    var html = templateScript(context);    
    // Insert the HTML code into the page    
    $(`#admin-container`).html(html); 
  });

  //////////////////////// Prevent closing from click inside dropdown
  $(document).on("click", ".dropdown-menu", function (e) {
    e.stopPropagation();
  });

  //////////////////////// Bootstrap tooltip
  if ($('[data-toggle="tooltip"]').length > 0) {
    // check if element exists
    $('[data-toggle="tooltip"]').tooltip();
  } // end if
});
// jquery end
