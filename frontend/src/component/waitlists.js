import "./waitlists.css";
import React from "react";
import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Waitlist = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [showForm, setShowForm] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    company_name: "",
    designation: "",
    usage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("You've been added to the waitlist!");
        navigate("/");
        setFormData({
          firstName: "",
          email: "",
          company: "",
          designation: "",
          usageDescription: "",
        });
        setShowForm(false);
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (showForm) {
    return (
      <div>
        <form className="waitlist-form fade-in-form" onSubmit={handleSubmit}>
          <div className="inputs">
            <label htmlFor="name">Full Name</label>
            <input
              type="name"
              id="name"
              placeholder="Your answer here..."
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="inputs">
            <label htmlFor="email">Email ID</label>
            <input
              type="email"
              id="email"
              placeholder="Your answer here..."
              name="email"
              pattern="^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$"
              title="Enter a valid email address"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="inputs">
            <label htmlFor="company_name">Company Name</label>
            <input
              type="text"
              id="company_name"
              placeholder="Your answer here..."
              name="company_name"
              required
              value={formData.company_name}
              onChange={handleChange}
            />
          </div>
          <div className="inputs">
            <label htmlFor="designation">Designation</label>
            <input
              type="text"
              id="designation"
              placeholder="Your answer here..."
              name="designation"
              required
              value={formData.designation}
              onChange={handleChange}
            />
          </div>
          <div className="inputs">
            <label htmlFor="usage">How do you want to use Adflyn?</label>
            <textarea
              id="usage"
              placeholder="Your answer here..."
              name="usage"
              required
              value={formData.usage}
              onChange={handleChange}
            />
          </div>
          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }

  return (
    <>
      <div>
        <h2 className="fade-in-text">You're Just in Time.</h2>
        <p className="subtitle fade-in-subtext">
          We’re on a mission to build a new kind of marketing system — one where{" "}
          <br />
          automation does the heavy lifting, and you stay in control.
        </p>
        <button
          className="waitlist-button1 fade-in-button1"
          onClick={() => setShowForm(true)}
        >
          Join Waitlist!
        </button>
      </div>
      <footer className="footer">
        &copy; {currentYear} Adflyn. All rights reserved
      </footer>
    </>
  );
};

export default Waitlist;
