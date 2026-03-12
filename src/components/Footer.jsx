import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer font-poppins py-6">
      <hr className="border-slate-200 mb-4" />

      <div className="flex flex-col items-center gap-4">

        {/* Contact Links */}
        <div className="flex flex-wrap gap-6 items-center justify-center text-gray-700">

          <a
            href="mailto:shubham.verma.dev@gmail.com"
            className="flex items-center gap-2 hover:text-blue-600 transition"
          >
            <FaEnvelope className="text-lg" />
            shubhamdev@gmail.com
          </a>

          <a
            href="https://linkedin.com/in/shubhamwebdev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-blue-600 transition"
          >
            <FaLinkedin className="text-lg" />
            shubhamwebdev.linkedin
          </a>

          <a
            href="https://github.com/ShubhamVermaDev9"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-blue-600 transition"
          >
            <FaGithub className="text-lg" />
            ShubhamVermaDev9.github
          </a>

        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-500">
          © <strong>Shubham Verma</strong>. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;