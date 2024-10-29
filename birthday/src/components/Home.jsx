import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const [name, setName] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [linkGenerated, setLinkGenerated] = useState(false); // State to track if the link is generated

  const navigate = useNavigate(); // Hook from react-router-dom for navigation

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const payload = { name: name, day: day, month: month };
      const response = await axios.post(
        "http://localhost:3001/create",
        payload
      );

      console.log(response.data);
      localStorage.setItem("id", JSON.stringify(response.data._id));
      setLinkGenerated(true); // Set link as generated when the form is submitted
    } catch (error) {
      console.error("Error submitting form: ", error);
      // Optionally handle error by showing feedback to the user
    }
  };

  const handleVisitLink = () => {
    navigate("/visit-link", { state: { name } }); // Pass 'name' as state to the new page
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Birthday Wisher</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="day">Day:</label>
            <input
              type="number"
              id="day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              placeholder="Enter birthday"
              min="1"
              max="31"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="month">Month:</label>
            <select
              id="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              required
            >
              <option value="" disabled>
                Select month
              </option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>

          <button type="submit">Create Link</button>
        </form>

        {/* Display the generated link and a button if form is filled and link is generated */}
        {linkGenerated && (
          <div className="generated-link-box">
            <p>Your birthday wish link is ready!</p>
            <button onClick={handleVisitLink}>Visit Link</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
