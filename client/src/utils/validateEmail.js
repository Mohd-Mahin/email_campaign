const validateEmail = (emails) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailArray = emails.split(",").map((email) => email.trim());
  const isEmailsValid = emailArray.some((email) => !emailRegex.test(email));
  return isEmailsValid;
};

module.exports = validateEmail;
