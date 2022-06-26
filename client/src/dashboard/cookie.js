const  setCookie = (name, value, daysToLive) => {
    // Encode value in order to escape semicolons, commas, and whitespace
    var cookie = name + "=" + encodeURIComponent(value);
    
    if(typeof daysToLive === "number") {
        /* Sets the max-age attribute so that the cookie expires
        after the specified number of days */
        cookie += "; max-age=" + (daysToLive*24*60*60);
        
        document.cookie = cookie;
    }
};

const getCookie = (name) => {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");
    
    // Loop through the array elements
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        
        /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
        if(name === cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
        }
    }
    
    // Return null if not found
    return null;
}

const checkCookie = (name) => {
    // Get cookie using our custom function
    var visitorName = getCookie(name);
    
    if(visitorName !== "") {
        alert("Welcome again, " + visitorName);
    } else {
        visitorName = prompt("Please enter your first name:");
        if(visitorName !== "" && visitorName != null) {
            // Set cookie using our custom function
            setCookie("visitorName", visitorName, 30);
        }
    }
}

/* // Creating a cookie
document.cookie = "visitorName=Christopher; path=/; max-age=" + 30*24*60*60;

// Updating the cookie
document.cookie = "visitorName=Alexander; path=/; max-age=" + 365*24*60*60;
// Deleting a cookie
document.cookie = "visitorName=; max-age=0";

// Specifying path and domain while deleting cookie
document.cookie = "visitorName=; path=/; domain=example.com; max-age=0";

from
https://www.tutorialrepublic.com/javascript-tutorial/javascript-cookies.php#:~:text=Creating%20a%20Cookie%20in%20JavaScript.%20In%20JavaScript%2C%20you,to%20this%20property%2C%20like%20this%3A%20document.cookie%20%3D%20%22visitorName%3DChristopher%22%3B
*/

module.exports.setCookie=setCookie;
module.exports.getCookie=getCookie;
module.exports.checkCookie=checkCookie;