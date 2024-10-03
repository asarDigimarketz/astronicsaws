import React from "react";
import "./brand.css";
import Image from "next/image";

const Brand = () => {
  return (
    <>
      <section className="allbanners  mt-0">
        <div className="banner-overlay">
          <div className="container">
            <div className="allbannercontent text-center">
              <h2 className="text-white">Brand</h2>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="box special features container">
            <div className="row features-row">
              <h2 className="text-white fw-bold">Exclusive Partner</h2>
              <div className=" col-md-12 h-72 sectionn">
                <Image
                  className="mx-auto img-fluid"
                  src="/assets/img/brand/vu.png"
                  alt="Vu tv"
                  width={300}
                  height={400}
                />
                {/* <h1>Spotify</h1> */}
                {/* <p>
                  Spotify is a music, podcast, and video streaming service,
                  officially launched on 7 October 2008. It is developed by
                  startup Spotify AB in Stockholm, Sweden. It provides digital
                  rights management-protected content from record labels and
                  media companies.
                </p> */}
              </div>
            </div>
            <div className="row features-row">
              <h2 className="text-white fw-bold">Other Partners</h2>
              <div className="section col-md-4">
                <Image
                  src="/assets/img/brand/hisense.png"
                  alt="Vu tv"
                  width={300}
                  height={250}
                />

                {/* <h1>Spotify</h1> */}
                {/* <p>
                  Spotify is a music, podcast, and video streaming service,
                  officially launched on 7 October 2008. It is developed by
                  startup Spotify AB in Stockholm, Sweden. It provides digital
                  rights management-protected content from record labels and
                  media companies.
                </p> */}
              </div>
              <div className="section col-md-4 third">
                <Image
                  src="/assets/img/brand/iffalcon.png"
                  alt="Vu tv"
                  width={300}
                  height={250}
                />

                {/* <h1>Apple</h1> */}
                {/* <p>
                  Apple is an American multinational technology company
                  headquartered in Cupertino, California that designs, develops,
                  and sells consumer electronics, computer software, and online
                  services.
                </p> */}
              </div>
              <div className="section col-md-4">
                <Image
                  src="/assets/img/brand/tcl.png"
                  alt="Vu tv"
                  width={300}
                  height={250}
                />

                {/* <h1>Firefox</h1> */}
                {/* <p>
                  Mozilla Firefox (or simply Firefox) is a free and open-source
                  web browser developed by the Mozilla Foundation and its
                  subsidiary the Mozilla Corporation.
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Brand;
