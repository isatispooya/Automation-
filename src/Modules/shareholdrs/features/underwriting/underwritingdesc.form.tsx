import { FC } from "react";
import { FaInstagram, FaTwitter, FaMapMarkerAlt } from "react-icons/fa";
import { IconType } from "react-icons";
import { useUnusedProcess } from "../../hooks";

const UnderwritingDescForm: FC = () => {
  const { data: unusedProcessData } = useUnusedProcess.useGetList();

  interface UnusedProcessData {
    picture: string;
    description_title: string;
    description: string;
    instagram_link: string;
    telegram_link: string;
    contact_number: string;
    location: string;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 text-center">
      {unusedProcessData?.map((item: UnusedProcessData, index: number) => (
        <div key={index} className="flex flex-col items-center">
          <div className="w-40 h-40 mb-8">
            <img
              src={item?.picture}
              alt={item?.description_title || "Description"}
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#424769] to-[#2C3333] mb-6 font-iransans">
            {item?.description_title}
          </h1>

          <p className="text-gray-600 max-w-lg mb-12 leading-relaxed text-lg">
            {item?.description}
          </p>

          <div className="flex gap-6 mb-12">
            <SocialIcon
              Icon={FaInstagram}
              color="from-pink-500 to-purple-500"
              href={item?.instagram_link}
            />
            <SocialIcon
              Icon={FaTwitter}
              color="from-blue-400 to-blue-500"
              href={item?.telegram_link}
            />
          </div>

          <div className="w-full max-w-md backdrop-blur-sm bg-white/30 p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-[#424769] mb-6">
              با ما در تماس باشید
            </h2>
            <a
              href={`tel:${item?.contact_number}`}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 mb-6 block text-center"
            >
              {item?.contact_number}
            </a>

            <div className="flex items-center justify-center space-x-2 text-gray-600 group cursor-pointer">
              <FaMapMarkerAlt className="text-2xl text-red-500 group-hover:text-red-600 transition-colors duration-300" />
              <a
                href={item?.location}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg group-hover:text-gray-800 transition-colors duration-300 mr-2"
              >
                مشاهده موقعیت در نقشه
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const SocialIcon: FC<{ Icon: IconType; color: string; href?: string }> = ({
  Icon,
  color,
  href,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`w-12 h-12 rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-300 bg-gradient-to-r ${color} shadow-md`}
  >
    <Icon className="text-white text-xl" />
  </a>
);

export default UnderwritingDescForm;