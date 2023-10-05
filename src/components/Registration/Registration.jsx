import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const dataForAPI1 = {
    firstname: formData.firstname,
    lastname: formData.lastname,
    username: formData.username,
    email: formData.email,
    password: formData.password,
  };
  const dataForAPI2 = {
    firstname: formData.firstname,
    lastname: formData.lastname,
    username: formData.username,
    email: formData.email,
    password: formData.password,
    usertype: "app",
    role: "user",
    status: "active",
  };
  const [registrationError, setRegistrationError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL1 = "http://bd-userservice-lb-staging-233784656.us-east-1.elb.amazonaws.com/api/v1/signup";
    const URL2 = "http://3.84.171.136:5000/user/add";
    try {
      const response = await fetch(URL1, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForAPI1),
      });

      if (response.ok) {
        const response2 = await fetch(URL2, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataForAPI2),
        });
        if (response2.ok) {

          setRegistrationSuccess(true);
          setRegistrationError(null);
          navigate("/");

        } else {
          const data2 = await response2.json();
          console.log("second response failed");
          console.log(data2.error);
          setRegistrationError(data2.error);
          setRegistrationSuccess(false);
        }
      } else {
        const data = await response.json();
        console.log("first response failed");
        setRegistrationError(data.error);
        setRegistrationSuccess(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setRegistrationError("An error occurred during registration.");
      setRegistrationSuccess(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-1/3">
        <h1 className="text-2xl font-bold mb-4">User Registration</h1>
        {registrationSuccess ? (
          <p className="text-green-600">
            Registration successful! You can now log in.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="firstname"
                className="block text-sm font-semibold text-gray-600"
              >
                First Name:
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
                className="border rounded px-3 py-2 w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="lastname"
                className="block text-sm font-semibold text-gray-600"
              >
                Last Name:
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                className="border rounded px-3 py-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-600"
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="border rounded px-3 py-2 w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-600"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="border rounded px-3 py-2 w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-600"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="border rounded px-3 py-2 w-full"
                required
              />
            </div>

            {registrationError && (
              <p className="text-red-600 mb-4">{registrationError}</p>
            )}

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default RegistrationForm;
