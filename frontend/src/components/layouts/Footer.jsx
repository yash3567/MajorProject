import "../../index.css";
import {
  TiSocialFacebook,
  TiSocialInstagram,
  TiSocialTwitter,
} from "react-icons/ti"; // Combine imports for better readability
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div
        className="container-fluid flex footer-container"
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          backgroundColor: "#0B192C",
          color: "white",
        }}
      >
        <div
          className="row w-100 h-50"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {/* ###################### LEFT SIDE CONTENT ######################### */}
          <div
            className="col-lg-4 col-sm-12 left-side p-5"
            style={{
              padding: "20px",
              textAlign: "center",
              flex: "1 1 100%",
              marginBottom: "20px",
            }}
          >
            <h3 style={{ padding: "10px" }}>Project Work Station</h3>
            <p style={{ padding: "10px" }}>We help You</p>

            {/* ########## SOCIAL LINKS ########## */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "10px",
                gap: "20px",
              }}
            >
              <Link to="/" className="text-decoration-none text-white">
                <span style={{ fontSize: "1.5rem", color: "white" }}>
                  <TiSocialFacebook />
                </span>
              </Link>
              <Link to="/" className="text-decoration-none text-white">
                <span style={{ fontSize: "1.5rem", color: "white" }}>
                  <TiSocialInstagram />
                </span>
              </Link>
              <Link to="/" className="text-decoration-none text-white">
                <span style={{ fontSize: "1.5rem", color: "white" }}>
                  <TiSocialTwitter />
                </span>
              </Link>
            </div>
          </div>

          {/* ################ RIGHT SIDE CONTENT ################ */}
          <div
            className="col-lg-8 col-sm-12 right-side"
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
              textAlign: "center",
              flex: "1 1 100%",
            }}
          >
            {/* ################ FIRST COLUMN ################ */}
            <div style={{ margin: "20px" }}>
              <ul style={{ listStyleType: "none", padding: "0" }}>
                <li style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
                  Information
                </li>
                <Link
                  to="/"
                  className="text-decoration-none"
                  style={{ color: "white", marginBottom: "5px" }}
                >
                  <li>About</li>
                </Link>
                <Link
                  to="/"
                  className="text-decoration-none"
                  style={{ color: "white", marginBottom: "5px" }}
                >
                  <li>Products</li>
                </Link>
                <Link
                  to="/"
                  className="text-decoration-none"
                  style={{ color: "white" }}
                >
                  <li>Blog</li>
                </Link>
              </ul>
            </div>

            {/* ################ SECOND COLUMN ################ */}
            <div style={{ margin: "20px" }}>
              <ul style={{ listStyleType: "none", padding: "0" }}>
                <li style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
                  Contact
                </li>
                <Link
                  to="/"
                  className="text-decoration-none"
                  style={{ color: "white", marginBottom: "5px" }}
                >
                  <li>Community</li>
                </Link>
                <Link
                  to="/"
                  className="text-decoration-none"
                  style={{ color: "white", marginBottom: "5px" }}
                >
                  <li>Career</li>
                </Link>
                <Link
                  to="/"
                  className="text-decoration-none"
                  style={{ color: "white" }}
                >
                  <li>Our Story</li>
                </Link>
              </ul>
            </div>

            {/* ################ THIRD COLUMN ################ */}
            <div style={{ margin: "20px" }}>
              <ul style={{ listStyleType: "none", padding: "0" }}>
                <li style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
                  Resources
                </li>
                <Link
                  to="/"
                  className="text-decoration-none"
                  style={{ color: "white", marginBottom: "5px" }}
                >
                  <li>Getting Started</li>
                </Link>
                <Link
                  to="/"
                  className="text-decoration-none"
                  style={{ color: "white", marginBottom: "5px" }}
                >
                  <li>Pricing</li>
                </Link>
                <Link
                  to="/"
                  className="text-decoration-none"
                  style={{ color: "white" }}
                >
                  <li>Resources</li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
        <p className="p-2 md:p-5 text-sm md:text-base">
          2024 All Rights Reserved Term Of @ProjectStation
        </p>
      </div>
    </>
  );
};

export default Footer;
