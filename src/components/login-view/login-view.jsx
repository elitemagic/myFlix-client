import { useState, React } from "react";

export const LoginView = ({ onLoggedIn}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); 

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      access: username,
      secret: password
    };

    fetch("https://my-flix-service.onrender.com/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
})
.then((response) => {
  if (response.ok) {
    onLoggedIn(username);
  } else {
    response.text().then((text) => {
      const error = JSON.parse(text);
      console.log(error.message);
      alert("Login failed");
    }).catch((error) => {
      console.log(error.message);
      alert("An error occurred while logging in");
    });
  }
})
.catch((error) => {
  console.log(error.message);
  alert("An error occurred while logging in");
});
  };


  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        />
      </label>
      <label>
        Password:
        <input type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};


