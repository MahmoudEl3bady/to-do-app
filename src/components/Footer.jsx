import { icon } from "@fortawesome/fontawesome-svg-core";
import { FaGithub, FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer
      class="container-fluid bg-dark text-light  mt-5 "
      data-wow-delay="0.1s"
    >
      <div class="container py-1 d-flex justify-content-center align-items-center gap-5">
        <div class="text-light text-start pt-3">
          <p>&copy; Mahmoud Elabady || all rights reserved</p>
        </div>
        <div className="links ps-3">
          <a
            href="https://twitter.com/m7moud_elabady"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaSquareXTwitter style={iconsStyle} />
          </a>
          <a
            href="https://github.com/MahmoudEl3bady/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub style={iconsStyle} />
          </a>
          <a
            href="https://www.linkedin.com/in/mahmoud-elabady-272b61239/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin style={iconsStyle} />
          </a>
        </div>
      </div>
    </footer>
  );
};

const iconsStyle = {
  fontSize: 25,
  color: "",
};

export default Footer;
