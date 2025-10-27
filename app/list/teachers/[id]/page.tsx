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
            <div className="w-2/3">
              {" "}
              <Image
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
                width={144}
                height={144}
                alt=""
                className="object-cover rounded-full w-36 h-36 "
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <h1 className="text-xl font-semibold">Leornado Da Vinci</h1>{" "}
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et
                autem
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium ">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/blood.png" width={14} height={14} alt="" />
                  <span>A+</span>
                </div>{" "}
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/date.png" width={14} height={14} alt="" />
                  <span>January 2025</span>
                </div>{" "}
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/mail.png" width={14} height={14} alt="" />
                  <span>user@gmail.com</span>
                </div>{" "}
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/phone.png" width={14} height={14} alt="" />
                  <span>+1 234 5682</span>
                </div>
              </div>
            </div>
          </div>

          {/* smaller cards */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap ">
            {/* card */}
            <div className="w-full bg-white p-4 rounded-md  flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%] ">
              <Image
                src="/singleAttendance.png"
                alt=""
                width={24}
                height={24}
                className="size-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            {/* card */}
            <div className="w-full bg-white p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%] ">
              <Image
                src="/singleBranch.png"
                alt=""
                width={24}
                height={24}
                className="size-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">2</h1>
                <span className="text-sm text-gray-400">Branches</span>
              </div>
            </div>
            {/* card */}
            <div className="w-full bg-white p-4 rounded-md  flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%] ">
              <Image
                src="/singleLesson.png"
                alt=""
                width={24}
                height={24}
                className="size-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">6</h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>

            {/* card */}
            <div className="w-full bg-white p-4 rounded-md  flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%] ">
              <Image
                src="/singleClass.png"
                alt=""
                width={24}
                height={24}
                className="size-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">6</h1>
                <span className="text-sm text-gray-400">Classes</span>
              </div>
            </div>
          </div>
        </div>
        {/* bottom */}
        <div>Teacher&apos;s Schedule</div>
      </div>
      {/* right */}
      <div className="w-full xl:w-1/3">r</div>
    </div>
  );
};

export default page;
