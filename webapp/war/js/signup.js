
$(document).ready(function() 
{
	$(document.body).keypress(function(event){
        if(event.keyCode == 13){
          $('#btn-signup').click();
        }
      });
	
	/*function sayHello2(name) {
	    var text = 'Hello ' + name; // Local variable
	    var say = function() { console.log(text); }
	    return say;
	}*/
	signup = function ()
	{
		//console.log("inside signup () ");
		var emailid	=	document.getElementById("email").value;
		var takeToServer	=	validate();
		console.log(emailid+" takeToServer = "+takeToServer);
		if(takeToServer)
			{
			var result=intoServer(emailid);
			//alert(result);
			return result;
			}
		else
			return takeToServer;
	}
	
	function intoServer(email)
	{console.log("intoServer------------------------------- ")
		var result=false;
$.ajax({
	async:false,
    type: 'GET', 
    url: '/ifExistingUser', 
    data:{id : email},
    dataType:'text',
    success: function(response)
             {
			    	//alert("1"+response);	
			    		
			    		
			    	if(response === "existingUser")
			    	{
			    		//alert("2");
			    		
			    	    $('#signupErr').html("Sorry, you are an existing user. Please "+"<a href='home'>Login</a>");
			    	    $('#messagebox').show();
			    		return false;
			    	}
			    	else if(response === "noAccount")
			    	{
			    		//alert("3");	
			    		result=true;
			    		return true;
			    		
			    	}
			    	else
			    		{
			    		//alert("4");	
			    		window.location="apologies";
			    		return false;
			    		}
			    	
			    	
             },
             error: function(){
             }
  
	});
//alert("6")
if(result)
	return result;
else
return false;
	}
	function validate()
	{
		 
		//alert("comes to validate in js");
		
		var email	=	document.getElementById("email").value;
		var firstname	=	document.getElementById("firstname").value;
		var lastname	=	document.getElementById("lastname").value;
		var password	=	document.getElementById("password").value;
		var confirmPassword	=	document.getElementById("retype-password").value;
		
		
		if(!isValid(email) && !isValid(firstname) && !isValid(lastname) && !isValid(password) && !isValid(confirmPassword))
			{
			document.getElementById("email").value="";  
	        document.getElementById("email").focus(); 
		    $('#signupErr').html("Please fill in the details");
		    $('#messagebox').fadeIn().delay(2000).fadeOut();
			return false;
			}
		else if(!isValid(email) || !isValidEmail(email))
			{
			document.getElementById("email").value="";  
	        document.getElementById("email").focus(); 
		    $('#signupErr').html("Please enter a valid email address");
		    $('#messagebox').fadeIn().delay(2000).fadeOut();
			return false;
			}
		else if(!isValid(firstname) || !isValidName(firstname))
		{
		document.getElementById("firstname").value="";  
	    document.getElementById("firstname").focus(); 
	    $('#signupErr').html("Please enter a valid name with letters only");
	    $('#messagebox').fadeIn().delay(2000).fadeOut();
		return false;
		}
	else if(!isValid(lastname) || !isValidName(lastname))
	{
	document.getElementById("lastname").value="";  
    document.getElementById("lastname").focus(); 
    $('#signupErr').html("Please enter a valid name with letters only");
    $('#messagebox').fadeIn().delay(2000).fadeOut();
	return false;
	}
	else if(!isValid(password) || !isValidPassword(password))
	{
	document.getElementById("password").value="";  
    document.getElementById("password").focus(); 
    $('#signupErr').html("Password should be of minimum 6 characters and contain letters and numbers only");
    $('#messagebox').fadeIn().delay(2000).fadeOut();
	return false;
	}
	else if(!isValid(confirmPassword)) 
	{
	document.getElementById("retype-password").value="";  
    document.getElementById("retype-password").focus(); 
    $('#signupErr').html("Please retype your password");
    $('#messagebox').fadeIn().delay(2000).fadeOut();
	return false;
	} 
	else
		{
			if(password !== confirmPassword)
			{
				document.getElementById("password").value=""; 
		        document.getElementById("retype-password").value="";  
		        document.getElementById("password").focus(); 
			    $('#signupErr').html("Password and retyped password should be the same");
			    $('#messagebox').fadeIn().delay(2000).fadeOut();
				return false;
			}
		}
		//console.log("final validate in signup");
	return true;
	}
	
	var isValid = function(someValue) {
        if (someValue === null || $.trim(someValue) === "") 
        	return false;
        else
        	return true;

    }
	
	 var isValidName = function(name) {
	        var flag = true;
	        var namePattern =  /^[a-z]+$/i;
	        flag = namePattern.test(name);
	        return flag;
	    }
	
    var isValidEmail = function(emailId) {
        var flag_email = true;
        var emailPattern =  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        flag_email = emailPattern.test(emailId);
        return flag_email;
    }
    
    var isValidPassword = function(password) {
        var flag = true;
        if (password.length<6) 
        	return false;
        var passwordPattern =  /^[a-z0-9]+$/i;
        flag = passwordPattern.test(password);
        return flag;
    }
	
	
});
