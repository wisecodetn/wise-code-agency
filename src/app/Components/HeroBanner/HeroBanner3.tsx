import Image from "next/image";
import React from "react";

const HeroBanner3 = () => {
  return (
    <section className="agk-hero">
      <div className="hero-wrapper-three">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="hero-content mb-70 pf_fadeup">
                <h1>
                  Wise Code - <span>Digital Excellence</span> Through Innovation
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-image-box text-center pf_fadeup">
          <Image
            src="/assets/wise-code/home/hero.jpg"
            alt="Wise Code Digital Agency Hero Image"
            title="Wise Code Digital Agency Hero Image"
            width={1815}
            height={658}
          />
          <svg
            width="835"
            height="172"
            viewBox="0 0 835 172"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M42 92V41.5C42 18.5802 23.4198 0 0.5 0H834.5V171.999C834.5 149.907 816.591 132 794.5 132H82C59.9086 132 42 114.091 42 92Z"
              fill="#0E0F11"
            />
          </svg>
          <div className="text-box">
            <p>
              A <span>leading digital agency</span> specializing in web
              development, digital marketing, e-commerce solutions, and
              innovative strategies to accelerate your business growth and
              enhance online presence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner3;
