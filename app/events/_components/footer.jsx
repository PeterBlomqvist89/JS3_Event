import Image from "next/image";

const Footer = () => {
  return (
    <nav className="bg-blue-600 py-10 px-4">
      <ul className="flex justify-between">
        <li></li>
        <li>
        <Image className="" 
        src="/images/logo2.png" 
        width={100}
        height={100}
        alt="logo" 
         />
        </li>
          <li>
          <p className="text-white">© 2024 Events Inc.</p>

          </li>
      </ul>
    </nav>
  );
};

export default Footer;
