/*!
 * Copyright 2018, Yiannis Ioannidis
 *
 * Date: 2018-07-01T12:21Z
 */

;(function(global, $) {
    
    var Welcomer = function(firstname, lastname, language) {
        return new Welcomer.init(firstname, lastname, language);
    }
    
    // function constructor for initializing a welcomer object.
    Welcomer.init = function(firstname, lastname, language) {
        
        var self = this;
        self.firstname = firstname || '';
        self.lastname = lastname || '';
        self.language = language || 'en';
        
        self.validate();
    }
    
    // hidden inside the IIFE and not directly exposable to global object.
    var supportedLanguages = ['en', 'el', 'de'];
    
    // informal greetings
    var greetings = {
        en : "Hello",
        el : "Γειά σου",
        de : "Hallo"
    };

    var formalGreetings = {
        en : "Greetings",
        el : "Χαιρετίζω",
        de : "Schöne Grüße"
    };
    
    var logMessages = {
        en : "Logged in",
        el : "Συνδέθηκε",
        de : "Angemeldet"
    }
    
    // the actual prototype object. Put all the methods here to save space.
    Welcomer.proto = {
        
        // 'this' refers to the calling object during execution.
        fullName : function() {
            return this.firstname + ' ' + this.lastname;
        },
        
        validate : function() {
            // check if a valid language has been put during initialization of the object.
            // references the externally inaccessible 'supportedLanguages' within the closure.
            var isIncluded = supportedLanguages.includes(this.language);
            if(!isIncluded) {
                throw new Error('Sorry but your language is not supported!');
            }
        },
        
        greeting : function() {
            return greetings[this.language] + ' ' + this.firstname + '!';
        },
    
        formalGreeting : function() {
            return formalGreetings[this.language] + ', ' + this.fullName();
        },
    
        greet : function(formal) {
            
            if(formal) {
                return this.formalGreeting();
            }
            
            return this.greeting();
        },
        
        htmlGreeting : function(selector, formal) {
            if(!$) {
                throw new Error('jQuery is not loaded');
            }
            
            if(!selector) {
                throw new Error('jQuery selector was not provided')
            }
            
            var element = $(selector);
            // inject the message in the chosen place in the DOM
            element.html(this.greet(formal));
            
            return this; // refers to the calling object during execution. Makes the method chainable.
        },
        
        log : function() {
            if(console) {
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }
            
            return this; // refers to the calling object during execution. Makes the method chainable.
        },
        
        setLanguage : function(lang) {
            this.language = lang;
            this.validate();
            
            return this; // refers to the calling object during execution. Makes the method chainable.
        }
    };
    
    // Every newly created object from Welcomer.init function construstor, will point to welcomer.proto object as its prototype.
    Welcomer.init.prototype = Welcomer.proto; 
    
    
    // Attach Welcomer to the global object.
    global.Welcomer = Welcomer;
    global.W$ = Welcomer; // an alias for easier typing
    
})(window !== "undefined" ? window : this, jQuery);