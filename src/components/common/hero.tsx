import "./hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="text_content">
        <p className="label">New Product</p>
        <h1 className="heading">XX99 Mark II HeadphoneS</h1>
        <p className="description">
          Experience natural, lifelike audio and exceptional build quality made
          for the passionate music enthusiast.
        </p>
        <button type="button">See Product</button>
      </div>
      <div className="image_content">
        <img src="/assets/hero_img.png" alt="hero image" />
      </div>
    </section>
  );
};

export default Hero;
