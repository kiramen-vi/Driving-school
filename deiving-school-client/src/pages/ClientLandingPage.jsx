import RegisterForm from './ClientAccess';
import '../main.css';
import ClientAccess from './ClientAccess';

export default function ClientLandingPage() {
  return (
    <div className="client-landing">
      <div className="sidebar">
        <h2>Client Area</h2>
        <ClientAccess />
        {/* Add LoginForm component here if needed */}
      </div>
      <div className="content">
        <section>
          <h3>About Our Driving School</h3>
          <p>We provide top-quality driving education for all vehicle classes...</p>
        </section>
        <section>
          <h3>Meet Our Staff</h3>
          <p>Highly trained professionals to guide you on your journey.</p>
        </section>
        <section>
          <h3>Testimonials</h3>
          <p>(Placeholder for future testimonial carousel)</p>
        </section>
        <section>
          <h3>Training Packages</h3>
          <p>(Placeholder for future training packages)</p>
        </section>
        <section>
          <h3>Location</h3>
          <p>(Placeholder for embedded map)</p>
        </section>
      </div>
    </div>
  );
}
