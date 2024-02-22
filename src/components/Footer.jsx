const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="flex justify-center  h-[100px] items-center border-2  bg-gray-700">
      <div className="flex justify-center items-center">
        <h4 className="text-white p-2">
          © {year} Music Inc. All rights reserved.
        </h4>
      </div>
    </div>
  );
};

export default Footer;
