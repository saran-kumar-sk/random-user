import React, { useState, useEffect } from "react";
import { FaUser, FaLock, FaMap } from "react-icons/fa";
import { BsEnvelopeFill } from "react-icons/bs";
import { FiPhone } from "react-icons/fi";
import { AiOutlineCalendar } from "react-icons/ai";

function App() {
  const [User, setUser] = useState(null);
  const [Title, setTitle] = useState("Random fPerson");
  const [Value, setValue] = useState("name");
  const getUser = async () => {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();  //data is converted into json file//
    const person = data.results[0];  //the json file response is in array type//
    const { phone, email } = person;
    // console.log(person.location.city); 
    const { large: image } = person.picture;
    const { password } = person.login;
    const { first, last } = person.name;
    const { location } = person.location;
    const {
      dob: { age },
    } = person;
    const {
      street: { number, name },
    } = person.location;

    const newPerson = {
      image,
      phone,
      email,
      password,
      age,
      street: `${number} ${name}`,  // number and name in a string variable
      name: `${first} ${last}`,
    };
    setUser(newPerson);  //new person
    setTitle("name");   
    setValue(newPerson.name);
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleValue = (e) => {
    if (e.target.classList.contains("icon")) {
      const newValue = e.target.dataset.label;
      setTitle(newValue);
      setValue(User[newValue]);
    }
  };

  return (
    <div className="App">
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={User && User.image}
            className="user-image"
            alt="random-image"
          />
          <p className="User-Title">My {Title} is</p>
          <p className="User-Value">{Value}</p>
          <button className="icon" data-label="name" onMouseOver={handleValue}>
            <FaUser />
          </button>
          <button className="icon" data-label="email" onMouseOver={handleValue}>
            <BsEnvelopeFill />
          </button>
          <button
            className="icon"
            data-label="Calender"
            onMouseOver={handleValue}
          >
            <AiOutlineCalendar />
          </button>
          <button
            className="icon"
            data-label="Location"
            onMouseOver={handleValue}
          >
            <FaMap />
          </button>
          <button className="icon" data-label="phone" onMouseOver={handleValue}>
            <FiPhone />
          </button>
          <button
            className="icon"
            data-label="password"
            onMouseOver={handleValue}
          >
            <FaLock />
          </button>
          <div>
            <button className="btn" type="submit" onClick={getUser}>
              RandomUser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
