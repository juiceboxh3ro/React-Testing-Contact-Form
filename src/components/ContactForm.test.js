import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ContactForm from "./ContactForm";

test("input form submits", () => {
  const { getByLabelText, getByTitle, findByText } = render(<ContactForm />);

  const fnameInput = getByLabelText(/first name/i),
  lnameInput = getByLabelText(/last name/i),
  emailInput = getByLabelText(/email/i),
  message = getByLabelText(/message/i),
  submitButton = getByTitle(/submit/i);
  ;

  fireEvent.change(fnameInput, {target: {name: 'firstName', value: 'jeff'}})
  fireEvent.change(lnameInput, {target: {name: 'lastName', value: 'jeffington'}})
  fireEvent.change(emailInput, {target: {name: 'email', value: 'j@mail.com'}})
  fireEvent.change(message, {target: {name: 'message', value: 'test message'}})

  fireEvent.click(submitButton);

  findByText(/jeff/i);
  findByText(/jeffington/i);
  findByText(/j@mail.com/i);
  findByText(/test message/i);
})