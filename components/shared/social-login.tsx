import Image from "next/image";

export default function SocialLogin() {
  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <button className="flex items-center justify-center gap-3 py-3.5 bg-white border border-[#EEEEEE] rounded-2xl shadow-sm hover:bg-gray-50 transition-all cursor-pointer">
        <Image
          src={require("@/public/google.png")}
          alt="Google"
          width={200}
          height={200}
          className="w-5 h-5"
        />
        <span className="text-sm font-bold text-[#424242]">Google</span>
      </button>
      <button className="flex items-center justify-center gap-3 py-3.5 bg-white border border-[#EEEEEE] rounded-2xl shadow-sm hover:bg-gray-50 transition-all cursor-pointer">
        <Image
          src={require("@/public/facebook.png")}
          alt="Facebook"
          width={200}
          height={200}
          className="w-5 h-5"
        />
        <span className="text-sm font-bold text-[#424242]">Facebook</span>
      </button>
    </div>
  );
}
