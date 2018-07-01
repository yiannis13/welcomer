$( document ).ready(function() {
    
    $( "#login" ).click(function() {
        var chosenLanguage = $('#lang').find(":selected").val();
        
        // create a new welcomer object. The architecture allows us to not have to use the 'new' operator.
        // the name is hard coded. In real world scenario, we could have during sign-in process.
        var welcomer = W$('Yiannis', 'Ioannidis', chosenLanguage);
        
        $('#logindiv').hide();
        welcomer.htmlGreeting('#greeting', true).log();
    });
    
});
