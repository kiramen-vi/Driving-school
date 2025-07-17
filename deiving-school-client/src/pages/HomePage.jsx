import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import '../main.css';

export default function HomePage() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const btnRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(titleRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 1 });
    gsap.fromTo(subtitleRef.current, { opacity: 0 }, { opacity: 1, delay: 1 });
    gsap.fromTo(btnRef.current, { opacity: 0 }, { opacity: 1, delay: 2 });
  }, []);

  return (
    <div className="home-container">
      <h1 ref={titleRef}>Welcome to Master Driving School</h1>
      <p ref={subtitleRef}>Let’s get you on the road to success.</p>
      <button ref={btnRef} onClick={() => navigate('/client')}>Get Started</button>
    </div>
  );
}
