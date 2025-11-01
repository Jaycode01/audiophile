import "./zx9speaker.css";

const Zx9Speaker = () => {
  return (
    <section className="display_section_wrapper">
      <div className="display_section">
        <img src="/assets/speaker.png" alt="zx9 speaker" />
        <div className="speaker_details">
          <h2 className="heading">ZX9 SPEAKER</h2>
          <p className="description">
            Upgrade to premium speakers that are phenomenally built to deliver
            truly remarkable sound.
          </p>
          <button type="button">See Product</button>
        </div>
      </div>
    </section>
  );
};

export default Zx9Speaker;
