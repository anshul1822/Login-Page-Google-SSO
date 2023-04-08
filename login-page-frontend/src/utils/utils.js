import passwordValidator from 'password-validator';

const passwordSchema = new passwordValidator();

  // Add properties to it
   passwordSchema
  .is().min(5)                                    // Minimum length 8
  .is().max(10)                                   // Maximum length 10
  .has().uppercase()                              // Must have uppercase letters
  .has().lowercase()                              // Must have lowercase letters
  .has().digits(1)                                // Must have at least 2 digits
  .has().not().spaces()                           // Should not have spaces
  .is().not().oneOf(['Passw0rd', 'Password123','12345']); // Blacklist these values  
  
  export {passwordSchema};