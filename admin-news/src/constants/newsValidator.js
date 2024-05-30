import { mixed, object, string } from "yup";
const minAndMaxError = (field, fieldLength, isMin = true) => {
  const message = isMin ? 'minimum' : 'maximum';
  return `${field} must contain ${message} ${fieldLength} characters`;
};
const requiredError = (field) => `${field} is required`;

const newsValidator = object({
  title: string().required(requiredError("Title")),
  image:string().required(requiredError("Image")),
content: string()
  .min(3, minAndMaxError("Content", 3))
  .max(1200, minAndMaxError("Content", 1200, false))
  .required(requiredError("Content")),
  type: string().required(requiredError("Type")),
});

export default newsValidator;
