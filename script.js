// Assignment code here

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");
var passwordText = document.querySelector("#password");

var letters = 'abcdefghijklmnopqrstuvwxyz'.split("");
var numbers = '0123456789'.split("");
var specialCharacters = '"~`!#$%^&*+=-[];,/{}|:<>?'.split("");
var allowedCharTypes = [];

var passwordLength;
var index;

function generateIndex(arrLength) {
  return Math.floor(Math.random() * Math.floor(arrLength));
}

function getPasswordLength() {
  var pwLength;

  while (!pwLength) {
    pwLength = prompt('Enter desired length for the new password');

    pwLength = parseInt(pwLength);

    if (pwLength < 8 || pwLength > 128) {
      alert("Password must be at least 8 characters and no more than 128.");
      // Reset pwLength to null in order to continuue the while-loop
      pwLength = null;
    }
  }

  return pwLength;
}

// Function that determines which password rules to apply
function getAllowedCharTypes() {
  if (window.confirm("Allow uppercase letters?")) {
    allowedCharTypes.push('uppercase');
  }

  if (window.confirm("Allow lowercase letters?")) {
    allowedCharTypes.push('lowercase');
  }

  if (window.confirm("Allow numbers?")) {
    allowedCharTypes.push('numbers');
  }

  if (window.confirm("Allow special characters?")) {
    allowedCharTypes.push('special');
  }
}

// Function that generates the actual password
function generatePassword() {
  var newPassword = '';
  var charIndex;
  var charType;
  var nextChar;

  // Check if we have a value for passwordLength
  if (!passwordLength) {
    // Prompt the user for the length again
    passwordLength = getPasswordLength();
  }

  // DEFINE CONDITION FOR THE FOR-LOOP
  for (var i = 0; i < passwordLength; i++) {
    index = generateIndex(allowedCharTypes.length);
    charType = allowedCharTypes[index];

    switch (charType) {
      //numbers
      case 'numbers':
        charIndex = generateIndex(numbers.length);
        nextChar = numbers[charIndex];
        break;

      //lowercase
      case 'lowercase':
        charIndex = generateIndex(letters.length);
        nextChar = letters[charIndex];
        break;

      case 'uppercase':
        charIndex = generateIndex(letters.length);
        nextChar = letters[charIndex].toUpperCase();
        break;

      //default/special characters
      default:
        charIndex = generateIndex(specialCharacters.length);
        nextChar = specialCharacters[charIndex];
    }

    newPassword = newPassword + nextChar;
  }

  return newPassword;
}

function writePassword() {
  // Prompt the user for the desired length of the password
  passwordLength = getPasswordLength();

  // Get confirmation from user regarding password rules to apply
  getAllowedCharTypes();

  // Generate the password
  passwordText.value = generatePassword();;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);