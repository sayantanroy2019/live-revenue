import Image from 'next/image';

export const Navbar = () => {
  return (
    <div className="w-full flex rounded-bl-xl rounded-br-xl py-3 px-10 justify-between items-center bg-[#151515]">
      <Image src="/brand/logo.png" alt="" height={40} width={100} />
    </div>
  );
};
