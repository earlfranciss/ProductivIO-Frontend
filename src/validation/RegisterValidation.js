export const validateRegister = ({ firstName, lastName, email, password, confirmPassword }) => {
  const errors = {};

  if (!firstName) {
    errors.firstName = "First name is required";
  }
  if (!lastName) {
    errors.lastName = "Last name is required";
  }
  if (!email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Enter a valid email";
  }
  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  }
  if (!confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};
