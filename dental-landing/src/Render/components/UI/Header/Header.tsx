import { useState } from "react";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import logo from "../../../../assets/img/platform/navbar/logo.png";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    scroll.scrollTo(parseInt(sectionId), {
      duration: 800,
      smooth: "easeInOutQuart",
    });
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-lightgray poppins-semibold sticky top-0 z-50">
      <nav
        className="mx-auto flex max-w-[1920px] items-center justify-center py-0 px-4 nav-medium"
        aria-label="Global"
      >
        <div className="flex me-auto lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-black"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="flex lg:flex-1">
          <a href="#" className="p-1.5">
            <span className="sr-only">Grinpol - Clínica Dental</span>
            <img src={logo} alt="Grinpol - Clínica Dental" className="w-16 lg:w-28 logo-medium" />
          </a>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-40 mx-10 gap-medium">
          <ScrollLink
            to="especialidades"
            spy={true}
            smooth={true}
            duration={800}
            onClick={() => scrollToSection("especialidades")}
            className="header-text-medium text-lg cursor-pointer"
          >
            Especialidades
          </ScrollLink>
          <ScrollLink
            to="nosotros"
            spy={true}
            smooth={true}
            duration={800}
            onClick={() => scrollToSection("nosotros")}
            className="header-text-medium text-lg cursor-pointer"
          >
            Nosotros
          </ScrollLink>
          <ScrollLink
            to="faq"
            spy={true}
            smooth={true}
            duration={800}
            onClick={() => scrollToSection("faq")}
            className="header-text-medium text-lg cursor-pointer"
          >
            FAQ
          </ScrollLink>
          <ScrollLink
            to="contactanos"
            spy={true}
            smooth={true}
            duration={800}
            onClick={() => scrollToSection("contactanos")}
            className="header-text-medium text-lg cursor-pointer"
          >
            Contáctanos
          </ScrollLink>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link to="/login" className="text-lg">
            <button className="flex items-center bg-acento p-3 rounded-lg header-button-medium">
              Profesional
              <ChevronRightIcon
                className="h-5 w-5 flex-none text-black"
                aria-hidden="true"
              />
            </button>
          </Link>
        </div>
      </nav>

      <Dialog
        className="lg:hidden bg-lightgray poppins-semibold"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-40" />
        <DialogPanel className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-lightgray px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-black"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-8 w-8" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-9 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <ScrollLink
                  to="especialidades"
                  spy={true}
                  smooth={true}
                  duration={800}
                  onClick={() => scrollToSection("especialidades")}
                  className="-mx-3 block rounded-lg px-3 py-2 text-lg font-semibold leading-7 cursor-pointer"
                >
                  Especialidades
                </ScrollLink>
                <ScrollLink
                  to="nosotros"
                  spy={true}
                  smooth={true}
                  duration={800}
                  onClick={() => scrollToSection("nosotros")}
                  className="-mx-3 block rounded-lg px-3 py-2 text-lg font-semibold leading-7 cursor-pointer"
                >
                  Nosotros
                </ScrollLink>
                <ScrollLink
                  to="faq"
                  spy={true}
                  smooth={true}
                  duration={800}
                  onClick={() => scrollToSection("faq")}
                  className="-mx-3 block rounded-lg px-3 py-2 text-lg font-semibold leading-7 cursor-pointer"
                >
                  FAQ
                </ScrollLink>
                <ScrollLink
                  to="contactanos"
                  spy={true}
                  smooth={true}
                  duration={800}
                  onClick={() => scrollToSection("contactanos")}
                  className="-mx-3 block rounded-lg px-3 py-2 text-lg font-semibold leading-7 cursor-pointer"
                >
                  Contáctanos
                </ScrollLink>
              </div>
              <div className="py-6">
                <Link to="/login" className="text-lg">
                  <button className="flex items-center bg-acento p-3 rounded-lg">
                    Profesional
                    <ChevronRightIcon
                      className="h-5 w-5 flex-none text-black"
                      aria-hidden="true"
                    />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};
