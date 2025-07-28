import './waitlists.css'; 
import React from 'react';


const Waitlist = () => {
  const [showForm, setShowForm] = React.useState(false);
  const [formData, setFormData] = React.useState({
    firstName: '',
    email: '',
    company: '',
    designation: '',
    usageDescription: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (showForm) {
    return (
      <div className='waitlist-container'>
        <form className="waitlist-form fade-in-form" onSubmit={handleSubmit}>
          <div className='inputs'>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              placeholder="Your answer here..."
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className='inputs'>
            <label htmlFor="email">Email ID</label>
            <input
              type="email"
              id="email"
              placeholder="Your answer here..."
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className='inputs'>
            <label htmlFor="company">Company Name</label>
            <input
              type="text"
              id="company"
              placeholder="Your answer here..."
              name="company"
              required
              value={formData.company}
              onChange={handleChange}
            />
          </div>
          <div className='inputs'>
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
          <div className='inputs'>
            <label htmlFor="usageDescription">How do you want to use Adflyn?</label>
            <textarea
              id="usageDescription"
              placeholder="Your answer here..."
              name="usageDescription"
              required
              value={formData.usageDescription}
              onChange={handleChange}
            />
          </div>
          <button className='waitlist-button' type="submit">Submit</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2 className='fade-in-text'>You're Just in Time.</h2>
      <p className="subtitle fade-in-subtext">
        We’re on a mission to build a new kind of marketing system — one where <br/>
        automation does the heavy lifting, and you stay in control.
      </p>
      <button
        className="waitlist-button1 fade-in-button1"
        onClick={() => setShowForm(true)}
      >
        Join Waitlist!
      </button>
    </div>
  );
};

export default Waitlist;
