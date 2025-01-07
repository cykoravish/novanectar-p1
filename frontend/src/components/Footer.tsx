import logo from "../assets/nav-logo.png";
export default function Footer() {
  return (
    <footer className="mt-16 bg-gray-800 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
        {/* Logo Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">
            <img src={logo} alt="logo" className="text-white" />
            NOVANECTAR SERVICES PVT. LTD.
          </h3>
          <p className="text-sm">
            NovaNectar is a prominent provider of training and solutions,
            offering courses in areas such as MEAN Full-Stack Development, MERN
            Full-Stack Development, Data Analytics, Graphic Design, as well as
            web development technologies like Python, C/C++, and Java.
          </p>
        </div>

        {/* Pages Section */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Pages</h4>
          <ul className="text-sm space-y-2">
            <li>Privacy Policy</li>
            <li>Terms and Conditions</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <ul className="text-sm space-y-2">
            <li>Whatsapp: 8979891703</li>
            <li>Location: GMS Road Dehradun, Uttarakhand, India</li>
            <li>Email: info@novanectar.co.in</li>
          </ul>
        </div>

        {/* Social Network Section */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Social Network</h4>
          <ul className="flex justify-center md:justify-start space-x-4">
            <li>
              <a href="#" className="hover:text-blue-500">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
