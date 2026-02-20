import Image from "next/image";
import Link from "next/link";
import React from "react";

const About1 = () => {
  return (
    <section className="agk-about pt-130 pb-80">
      <div className="container">
        <div className="row">
          <div className="col-xl-9">
            <div className="agk-content-box style-one mb-50 pf_fadeup">
              <div className="section-title mb-20">
                <span className="sub-title">About Wise Code</span>
                <h2>
                  Leading Digital Agency for Web Development & Digital Marketing
                </h2>
              </div>
              <p>
                Wise Code is a premier digital agency specializing in custom web
                development, e-commerce solutions, and comprehensive digital
                marketing services. We transform businesses through innovative
                technology solutions and data-driven marketing strategies that
                deliver measurable results.
              </p>
              <p>
                Our expert team combines technical excellence with creative
                vision to deliver tailored solutions that accelerate growth,
                enhance online presence, and maximize ROI for clients worldwide.
              </p>
              <div className="agk-button mb-30">
                <Link href="/about" className="theme-btn style-one">
                  <span className="text-flip">
                    <span className="text">LEARN MORE</span>
                    <span className="text">LEARN MORE</span>
                  </span>
                </Link>
              </div>
              <ul>
                <li>
                  <div className="agenko-counter-box style-one">
                    <div className="content">
                      <h3 className="mb-10">
                        <span className="count">20</span>+
                      </h3>
                      <p>Successful Projects Delivered</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="agenko-counter-box style-one">
                    <div className="content">
                      <h3 className="mb-10">
                        <span className="count">10</span>+
                      </h3>
                      <p>Global Clients Served</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xl-3">
            <div className="agk-image-box style-one mb-50 pf_fadeup">
              <div className="agk-image">
                <Image
                  src="/assets/wise-code/home/about1.jpg"
                  alt="Wise Code Digital Agency Team"
                  title="Wise Code Digital Agency Team"
                  width={400}
                  height={500}
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About1;
