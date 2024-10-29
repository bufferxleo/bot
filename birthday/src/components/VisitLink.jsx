import { useEffect, useState } from "react";
import "./VisitLink.css";
const VisitLink = () => {
  const id = JSON.parse(localStorage.getItem("id"));

  // console.log(id);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      const User = await fetch(`http://localhost:3001/get/${id}`);
      const user = await User.json();
      // console.log(user);
      setUser(user);
    };
    getUser();
    // console.log(user);
  }, [id]);

  // Check if user is defined before destructuring
  const { name, day, month } = user || {}; // {{ edit_1 }}

  console.log(name, day, month);
  // const name="harsha";
  // const day=8;
  // const month="january";

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (day && month) {
      const birthday = new Date(
        `${month} ${day}, ${new Date().getFullYear()} 00:00:00`
      );

      // If birthday has already passed this year, calculate for next year
      if (birthday < new Date()) {
        birthday.setFullYear(birthday.getFullYear() + 1);
      }

      const calculateTimeLeft = () => {
        const now = new Date();
        const difference = birthday - now;

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      };

      // Call the function every second
      const timer = setInterval(calculateTimeLeft, 1000);

      // Clear the timer when the component unmounts
      return () => clearInterval(timer);
    }
  }, [day, month]);

  const MonthToNumber = (month) => {
    const months = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];
    return months.indexOf(month) + 2;
  };

  return (
    <div className="Visit">
      <div className="Link">
        {name ? <h2>Happy Birthday {name}!</h2> : <h2>Happy Birthday!</h2>}
        <h3>Time left until your birthday</h3>
        {day && month ? (
          <>
            <div className="timer">
              <div>
                {timeLeft.days} <br></br>Days
              </div>
              <div>
                {timeLeft.hours} <br></br>Hours
              </div>
              <div>{timeLeft.minutes} Minutes</div>
              <div>{timeLeft.seconds} Seconds</div>
            </div>
            <button
              className="share-button"
              onClick={() => {
                window.open(
                  // `http://localhost:5500/?name=${name}&month=${MonthToNumber(
                  `https://bot-site-chi.vercel.app/?name=${name}&month=${MonthToNumber(

                    month
                  )}&day=${day}`,
                  "_blank"
                );
              }}
            >
              open sharable link
            </button>
          </>
        ) : (
          <p>No birthday date provided.</p>
        )}

        <a href="/">Go back to Home</a>
      </div>
    </div>
  );
};

export default VisitLink;
