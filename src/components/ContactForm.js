import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ContactForm = () => {
  const [data, setData] = useState();

  const [values, setValues] = useState(
    {
      firstName: '1',
      lastName: '2',
      email: '3',
      message: '4'
    }
  );

  const { register, errors, handleSubmit, reset } = useForm({
    mode: "onBlur"
  });

  const handleChanges = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = data => {
    setData(data);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://reqres.in/api/users', true)
    xhr.onload = function(){
      console.log(xhr.responseText);
    };
    xhr.send(JSON.stringify(data));

    reset();
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name*</label>
          <input
            id="firstName"
            name="firstName"
            placeholder="justin"
            onChange={e => handleChanges(e)}
            ref={register({ required: true, minLength: 2 })}
          />
          {errors.firstName && (
            <p>Looks like there was an error: {errors.firstName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName">Last Name*</label>
          <input
            id="lastName"
            name="lastName"
            placeholder="time"
            onChange={e => handleChanges(e)}
            ref={register({ required: true, minLength: 2 })}
          />
          {errors.lastName && (
            <p>Looks like there was an error: {errors.lastName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="email">
            Email*
          </label>
          <input
            id="email"
            placeholder="email@mail.com"
            name="email"
            onChange={e => handleChanges(e)}
            ref={register({ required: true })}
          />
          {errors.email && (
            <p>Looks like there was an error: {errors.email.type}</p>
          )}
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            onChange={e => handleChanges(e)}
            ref={register({ required: false })}
          />
        </div>
        {data && (
          <pre style={{ textAlign: "left", color: "white" }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
        <input title="submit" type="submit" />
      </form>
    </div>
  );
};

export default ContactForm;
