import React, { useEffect, useState } from "react";
import "./ClientDashboard.css";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const ClientDashboard = () => {
  const [openServices, setOpenServices] = useState([]);
  const [completedServices, setCompletedServices] = useState([]);
  const [feedbacks, setFeedbacks] = useState({});
  const [rating, setRating] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchClientServices();
  }, []);

  const fetchClientServices = async () => {
    try {
      const response = await axios.get("/api/client/services", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { open, completed } = response.data;
      setOpenServices(open);
      setCompletedServices(completed);
    } catch (error) {
      console.error("Error fetching client services:", error);
    }
  };

  const handleFeedbackSubmit = async (serviceId) => {
    try {
      await axios.post(
        "/api/feedback",
        {
          serviceId,
          feedback: feedbacks[serviceId],
          rating: rating[serviceId],
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchClientServices();
      alert("Feedback submitted!");
    } catch (error) {
      console.error("Feedback error:", error);
    }
  };

  return (
    <div className="client-dashboard">
      <header className="client-header">
        <h1>Welcome to Master Driving School</h1>
        <p>Your personal dashboard</p>
      </header>

      <section className="client-section about-school">
        <h2>About Our Driving School</h2>
        <p>We provide top-notch driving training with certified instructors, flexible timing, and fully practical-focused classes.</p>
      </section>

      <section className="client-section open-requests">
        <h2>Open Service Requests</h2>
        {openServices.length === 0 ? (
          <p>No open services yet.</p>
        ) : (
          openServices.map((service) => (
            <div key={service._id} className="service-card">
              <h4>{service.title}</h4>
              <p>Status: {service.status}</p>
              <p>Technician: {service.technician?.name || "Not assigned"}</p>
            </div>
          ))
        )}
      </section>

      <section className="client-section completed-services">
        <h2>Completed Services</h2>
        {completedServices.length === 0 ? (
          <p>No services completed yet.</p>
        ) : (
          completedServices.map((service) => (
            <div key={service._id} className="service-card completed">
              <h4>{service.title}</h4>
              {service.closureImage && (
                <img src={`${import.meta.env.VITE_API_URL}${service.closureImage}`} alt="Service closure" />
              )}
              <p>Technician: {service.technician?.name}</p>
              <p>Status: {service.status}</p>
              {service.feedback ? (
                <>
                  <p>Feedback: {service.feedback.text || service.feedback.comment}</p>
                  <p>
                    Rating: {[...Array(service.feedback.rating)].map((_, i) => (
                      <FaStar key={i} color="gold" />
                    ))}
                  </p>
                </>
              ) : (
                <div className="feedback-form">
                  <textarea
                    placeholder="Leave your feedback"
                    value={feedbacks[service._id] || ""}
                    onChange={(e) =>
                      setFeedbacks((prev) => ({ ...prev, [service._id]: e.target.value }))
                    }
                  />
                  <div className="rating-input">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <FaStar
                        key={num}
                        color={(rating[service._id] || 0) >= num ? "orange" : "lightgray"}
                        onClick={() => setRating((prev) => ({ ...prev, [service._id]: num }))}
                      />
                    ))}
                  </div>
                  <button onClick={() => handleFeedbackSubmit(service._id)}>Submit</button>
                </div>
              )}
            </div>
          ))
        )}
      </section>

      <section className="client-section training-packages">
        <h2>Training Packages</h2>
        <p>[Placeholder for detailed training options]</p>
      </section>

      <section className="client-section meet-our-staff">
        <h2>Meet Our Staff</h2>
        <p>[Placeholder for instructor profiles]</p>
      </section>

      <section className="client-section testimonials">
        <h2>Testimonials</h2>
        <p>[Placeholder for client feedback and reviews]</p>
      </section>
    </div>
  );
};

export default ClientDashboard;
