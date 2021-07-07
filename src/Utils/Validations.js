const validateEmail = (email) => {
  if (!email) {
    return true;
  }
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

const validateName = (name) => {
  if (!name) {
    return false;
  }

  return /^[a-zA-Z ]+$/.test(name);
};

const validateNumber = (number) => {
  if (!number) {
    return false;
  }

  return /^[0-9]*$/.test(number);
};

export { validateEmail, validateName, validateNumber };
