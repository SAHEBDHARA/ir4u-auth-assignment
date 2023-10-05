import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm() {
  const [loginError, setLoginError] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "user",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const api1Url =
      "http://bd-userservice-lb-staging-233784656.us-east-1.elb.amazonaws.com/api/v1/login";
    const api2Url = "http://3.84.171.136:5000/user/login";

    try {
      const response1 = await axios.post(
        api1Url,
        `username=${formData.username}&password=${formData.password}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const response2 = await axios.post(
        api2Url,
        {
          username: formData.username,
          password: formData.password,
          usertype: "app",
          role: "user",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }
      );

     
      if (response1.status === 200 && response2.status === 200) {
        const jwtToken1 = response1.headers.authorization;
        const jwtToken2 = response2.data.data.token;

        if(jwtToken1 && jwtToken2) {
        console.log(jwtToken1)
        console.log(jwtToken2)

        }else{
          console.log('jwtToken is not found')
        }
        setLoginError(null);
        navigate("/");
      } else {
        setLoginError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      setLoginError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-1/3">
        <h1 className="text-2xl font-bold mb-4">User Login</h1>

        <form onSubmit={handleSubmit}>
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

          {loginError && <p className="text-red-600 mb-4">{loginError}</p>}

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
