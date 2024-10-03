import Link from "next/link";

import "./homecinema.css";

export default function HomeCinema() {
  return (
    <>
      <section className="">
        <div className="relative overflow-hidden">
          <div className="relative w-full h-0 pb-[56.25%]">
            <Link href={"https://auxhomecinemas.com/"} target="_blank">
              <img
                className="absolute inset-0 w-full h-full"
                src="/assets/img/banner/aux-home-cinemas.jpeg"
              ></img>
            </Link>
          </div>
        </div>
      </section>
      {/* <section className="pb-12 md:py-20">
        <div className="relative overflow-hidden">
          <div className="relative w-full h-0 pb-[56.25%]">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/Jo5WgIPNK_A?autoplay=1&mute=1&loop=1&playlist=Jo5WgIPNK_A&si=nH9ac-_5LWmOyRcf"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
        </div>
      </section> */}
      <section className="relative w-full aspect-video overflow-hidden bg-gray-900 text-white h-[50vh] sm:h-[60vh] lg:h-[70vh]">
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src="assets/img/video/homeTheater_Cinema Interior_4096x2160.mp4"
              autoPlay
              loop
              muted
            />
          </div>
        </div>
      </section>
    </>
  );
}
