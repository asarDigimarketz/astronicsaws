import React from "react";

import About from "@/Components/aboutfullpage/About";
import BrandSlider from "@/Components/brandslider/BrandSlider";

const page = () => {
  return (
    <>
      <About />

      <div className="container my-3">
        <BrandSlider />
      </div>
    </>
  );
};

export default page;
