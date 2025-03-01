import "./contact.css"; // Import the CSS for styling
import Layout from "./../../components/layouts/Layout";
import { Link } from "react-router-dom";
import "./contactForm.css";

const ContactUs = () => {
  return (
    <Layout>
      <div className="contact-containerrrr ">
        {/* Contact Us Header */}
        <div className="contact-headerrrr ">
          <h1>Contact Us</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </div>

        {/* Main Contact Section */}
        <div className="contact-contentttt row">
          {/* Map Section */}
          <div className="contact-map col-lg-7 col-sm-12 mb-5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3512.3604675912125!2d79.0782934104715!3d21.16513828299988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c10437c37685%3A0xa2949c9d9fc2f903!2sAnjuman%20college%20of%20Engineering%20and%20Technology!5e1!3m2!1sen!2sin!4v1729168922347!5m2!1sen!2sin"
              width="500"
              height="500"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Contact Info & Form */}
          <div className="form_div col-lg-5 col-sm-12 ">
            <div className="details">
              <h1 className="text-center fs-2">Get In Touch</h1>
              <h3 className="mt-3">Contact: 00110101010</h3>
              <h3 className="mt-2">
                Address: Mangalwari Bazar Road, Nagpur, Maharashtra 440001{" "}
              </h3>
              <h3 className="mt-3">Our Email: xyz@gmail.com</h3>
            </div>
            <form className="form-contact ">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control input-cl"
                  id="name"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control  input-cl"
                  id="email"
                  placeholder=" Your Email"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control  input-cl"
                  id="text"
                  placeholder="Your Address"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>{" "}
                <br />
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  cols="40"
                ></textarea>
              </div>

              <button type="submit" className="w-50 btn btn_color">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
