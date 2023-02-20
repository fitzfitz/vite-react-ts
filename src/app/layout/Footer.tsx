import React from "react";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import monograf from "@tm-wear/monograf.config";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="bg-orange-50 py-12 px-4 text-gray-700 lg:px-6">
        <div className="mx-auto max-w-screen-xl">
          <div className="flex flex-wrap">
            <div className="w-full text-center md:w-1/3 md:text-left">
              <h4 className="mb-4 text-lg font-medium">The Monograf</h4>
              <div className="flex flex-col">
                <Link
                  to="/blog/about-us"
                  className="group inline-flex w-fit flex-col text-gray-700 transition duration-200"
                >
                  Tentang Kami
                  <span className="block h-0.5 max-w-0 bg-orange-500 transition-all duration-500 group-hover:max-w-full"></span>
                </Link>
              </div>
            </div>
            <div className="w-full text-center md:w-1/3">
              <h4 className="mb-4 text-lg font-medium">Ikuti Kami</h4>
              <ul className="list-none">
                <li className="mr-3 inline-block">
                  <a
                    target={"_blank"}
                    rel="noreferrer"
                    href={`https://instagram.com/${monograf.socials.instagram}`}
                    className="text-dark hover:text-orange-500"
                  >
                    <FaInstagram />
                  </a>
                </li>
                <li className="inline-block">
                  <a
                    target={"_blank"}
                    rel="noreferrer"
                    href={`https://tiktok.com/@${monograf.socials.tiktok}`}
                    className="text-dark hover:text-orange-500"
                  >
                    <FaTiktok />
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full text-center md:w-1/3 md:text-right">
              <h4 className="mb-4 text-lg font-medium">Kontak Kami</h4>
              <ul className="list-none">
                <li className="text-sm">Alamat: {monograf.address}</li>
                <li className="text-sm">Telepon: {monograf.phone}</li>
                <li className="text-sm">Email: {monograf.email}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-orange-50 px-4 text-gray-700 lg:px-6">
        <div className="mx-auto max-w-screen-xl text-center">
          <hr className="border-orange-100" />
        </div>
      </div>
      <div className="bg-orange-50 py-12 px-4 text-gray-700 lg:px-6">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between text-center">
          <img
            src={"https://assets.themonograf.com/web-assets/logo2-medium.png"}
            alt="Logo"
            width={50}
          />
          <p className="text-sm">
            &copy; {monograf.name} {monograf.initialYear}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
