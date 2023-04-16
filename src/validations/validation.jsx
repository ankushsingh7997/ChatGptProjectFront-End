


export const isValidEmail = function (email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };
  export const passwordVal = function (password) {
    var strongRegex = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,15}$/
    );
    
    return strongRegex.test(password);
  };
  
 

  export const isValidNo = function (number) {
    const validnumber = /^[6789]\d{9}$/
    return validnumber.test(number);
  };
 
  