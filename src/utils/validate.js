import { toast } from "react-toastify";

export const validate = (variables) => {
  let result = true;
  Object.keys(variables).forEach((key, index) => {
    if (!variables[key] || /^\s*$/.test(variables[key])) {
      toast(`Confirm your ${key}`);
      result = false;
    }
  });
  return result;
};

export const validateParams = (variables) => {
  let result = true;
  console.log(variables);
  variables.forEach((variable) => {
    if (/^\s*$/.test(variable.data)) {
      toast(`Confirm your ${variable.name}`);
      result = false;
    }
  });
  return result;
};
