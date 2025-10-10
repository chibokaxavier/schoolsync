import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="flex-1 p-4 gap-4 flex flex-col xl:flex-row">
      {/* left */}
      <div className="w-full xl:w-2/3">
        {/* top */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* User info card */}
          <div className="bg-blue-100 py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              {" "}
              <Image
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
                width={80}
                height={80}
                alt=""
                className="object-cover rounded-full size-36 "
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <h1>Leornado Da Vinci</h1>{" "}
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et
                autem
              </p>
            </div>
          </div>

          {/* smaller cards */}
          <div className="flex-1"></div>
        </div>
        {/* bottom */}
        <div>schedule</div>
      </div>
      {/* right */}
      <div className="w-full xl:w-1/3">r</div>
    </div>
  );
};

export default page;
