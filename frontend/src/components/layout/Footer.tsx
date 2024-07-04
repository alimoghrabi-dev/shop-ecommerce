import React from "react";

const Footer: React.FC = () => {
  return (
    <section className="mt-12 border-t border-black/15 px-8 py-10 flex flex-col sm:flex-row items-start justify-between gap-4">
      <div className="flex-1 flex flex-col gap-y-2">
        <h3 className="text-gray-700 font-bold text-2xl">Shop</h3>
        <p className="text-sm font-semibold text-gray-600 max-w-xs">
          Shop is the next step on our mission to make commerce better for
          everyone.
        </p>
      </div>
      <div className="flex-1 flex items-start gap-4 justify-between">
        <div className="flex flex-col gap-y-2">
          <span className="text-base font-semibold text-gray-800">
            Information
          </span>
          <div className="flex flex-col gap-y-1">
            <p className="text-gray-700 font-medium text-sm">Shop Pay</p>
            <p className="text-gray-700 font-medium text-sm">Help Center</p>
            <p className="text-gray-700 font-medium text-sm">For Brands</p>
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <span className="text-base font-semibold text-gray-800">Social</span>
          <div className="flex flex-col gap-y-1">
            <p className="text-gray-700 font-medium text-sm">X</p>
            <p className="text-gray-700 font-medium text-sm">Instagram</p>
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <span className="text-base font-semibold text-gray-800">Legal</span>
          <div className="flex flex-col gap-y-1">
            <p className="text-gray-700 font-medium text-sm">
              Terms of Service
            </p>
            <p className="text-gray-700 font-medium text-sm">Privacy Policy</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
