"use client";
import React, { useState } from "react";
import "./contact.css";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { toast } from "react-toastify";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    setShowToast(false);
    const formDatas = new FormData();
    formDatas.append("name", formData.name);
    formDatas.append("company", formData.company);
    formDatas.append("email", formData.email);
    formDatas.append("phone", formData.phone);
    formDatas.append("message", formData.message);

    try {
      const response = await axios.post("/api/contact", formDatas);
      if (response.data.success) {
        toast.success(response.data.msg);
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error("Error: " + response.data.msg || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Error: " + error.message || "Something went wrong.");
    }
  };

  return (
    <>
      <section className="allbanners mb-5 mt-0">
        <div className="banner-overlay">
          <div className="container">
            <div className="allbannercontent text-center">
              <h2 className="text-white">Contact</h2>
            </div>
          </div>
        </div>
      </section>

      <div className="contact-form-container">
        <div className="contact-form-background"></div>
        <div className="container">
          <div className="contact-info">
            <div className="text-center">
              <h3 className="contact-info-title">Get In Touch</h3>
            </div>
            <div className="contact-info">
              <div className="contact-info-item">
                <strong>Madurai:</strong>
                <p>
                  161, 3rd North Cross, Annanagar, Near Shenbagam Hospitals,
                  Madurai - 625020, Tamilnadu.
                </p>
              </div>

              <div className="contact-info-item">
                <strong>Phone:</strong>
                <a href="tel:0452 4376744">0452 4376744</a>
              </div>
              <div className="contact-info-item">
                <strong>Mobile:</strong>
                <span>
                  {/* <a href="tel:+91 99444 84844">+91 99444 84844</a>,{" "} */}
                  <a href="tel:+91 73395 66684">+91 73395 66684</a>,
                  <a href="tel:+91 73395 66682">+91 73395 66682</a>,
                  <a href="tel:+91 73395 66683">+91 73395 66683</a>
                </span>
              </div>
              <div className="contact-info-item">
                <strong>Email:</strong>
                <a href="mailto:auxtronics@gmail.com">auxtronics@gmail.com</a>
              </div>
              {/* <div className="contact-info-item">
              <strong>Website:</strong>
              <a
                href="https://www.auxtronics.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.auxtronics.in
              </a>
            </div> */}

              <div className="social-icons mt-3 ">
                <div className="social-icon" data-tooltip="Facebook">
                  <a
                    href="https://www.facebook.com/vutelevision.madurai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon facebook"
                  >
                    <FaFacebook />
                  </a>
                </div>
                <div className="social-icon" data-tooltip="X">
                  <a
                    href="https://twitter.com/VUTVstore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon twitter"
                  >
                    <FaXTwitter />
                  </a>
                </div>
                <div className="social-icon" data-tooltip="Instagram">
                  <a
                    href="https://www.instagram.com/auxtronics/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon instagram"
                  >
                    <FaInstagram />
                  </a>
                </div>
                <div className="social-icon" data-tooltip="Youtube">
                  <a
                    href="https://www.youtube.com/@VuTelevisionsOfficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon youtube"
                  >
                    <FaYoutube />
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-info mt-4">
              {" "}
              <div className="contact-info-item">
                <strong>Dindigul:</strong>
                <p>
                  7-A, Gughan Hospital Building, 80 Feet Road, R M Colony, (Opp.
                  to Bus stop), Dindigul - 624001, Tamilnadu.
                </p>
              </div>
              <div className="contact-info-item">
                <strong>Mobile:</strong>
                <span>
                  <a href="tel:+91 70944 46112">+91 70944 46112</a>,{" "}
                  <a href="tel:+91 96556 90008">+91 96556 90008</a>
                </span>
              </div>
              <div className="contact-info-item">
                <strong>Email:</strong>
                <a href="mailto:auxdgl@gmail.com">auxdgl@gmail.com</a>
              </div>
              {/* <div className="contact-info-item">
              <strong>Website:</strong>
              <a
                href="https://www.auxtronics.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.auxtronics.in
              </a>
            </div> */}
              <div className="social-icons mt-3 ">
                <div className="social-icon" data-tooltip="Facebook">
                  <a
                    href="https://www.facebook.com/vutelevision.madurai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon facebook"
                  >
                    <FaFacebook />
                  </a>
                </div>
                <div className="social-icon" data-tooltip="X">
                  <a
                    href="https://twitter.com/VUTVstore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon twitter"
                  >
                    <FaXTwitter />
                  </a>
                </div>
                <div className="social-icon" data-tooltip="Instagram">
                  <a
                    href="https://www.instagram.com/auxtronics/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon instagram"
                  >
                    <FaInstagram />
                  </a>
                </div>
                <div className="social-icon" data-tooltip="Youtube">
                  <a
                    href="https://www.youtube.com/@VuTelevisionsOfficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon youtube"
                  >
                    <FaYoutube />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-form">
            <h3 className="contact-form-title">Contact Us</h3>
            <form onSubmit={handleSubmit} className="contact-form-form">
              <div className="contact-form-field">
                <label htmlFor="name">Name : </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="contact-form-field">
                <label htmlFor="company">Company Name : </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
              <div className="contact-form-field">
                <label htmlFor="email">Email : </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="contact-form-field">
                <label htmlFor="phone">Phone : </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="contact-form-field">
                <label htmlFor="message">Requirements : </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit" className="contact-form-submit">
                Send
              </button>
            </form>
          </div>
          <ToastContainer theme="dark" />
        </div>
      </div>

      <div className="maps-area bg-gray overflow-hidden mt-5">
        <div className="google-maps grid grid-cols-1 md:grid-cols-2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d88929.29616444683!2d78.12749091593089!3d9.920898367082327!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c5a512b0c321%3A0x396b54f643d3cc1c!2sVu%20TV%20Showroom%20Madurai!5e0!3m2!1sen!2sin!4v1726225342776!5m2!1sen!2sin"
            className="w-full h-80"
            allowFullScreen=""
            loading="lazy"
          ></iframe>

          {/* <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.1348223404398!2d78.1435681!3d9.922727799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c5a512b0c321%3A0x396b54f643d3cc1c!2sVu%20TV%20Showroom%20Madurai!5e0!3m2!1sen!2sin!4v1725443312545!5m2!1sen!2sin"
            className="w-full h-80"
            allowFullScreen=""
            loading="lazy"
          ></iframe> */}

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d177581.18822825578!2d77.99245869208892!3d10.419434149171845!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00abef703a0fbd%3A0x591df4238c1d0a7d!2sVu%20Televisions%20Exclusive%20Brand%20Showroom!5e0!3m2!1sen!2sin!4v1723717933186!5m2!1sen!2sin"
            className="w-full h-80"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
