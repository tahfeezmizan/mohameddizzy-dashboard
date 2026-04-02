import Image from "next/image";

export default function SocialLogin() {
  return (
    <div className="w-full flex items-center justify-center gap-3">
      <button className="w-10 h-10 flex items-center justify-center border border-black rounded-full transition-all cursor-pointer">
        <Image
          src={require("@/public/google.png")}
          alt="Google"
          width={200}
          height={200}
          className="w-5 h-5"
        />
      </button>
      <button className="w-10 h-10 flex items-center justify-center border border-black rounded-full transition-all cursor-pointer">
        <Image
          src={require("@/public/facebook.png")}
          alt="Facebook"
          width={200}
          height={200}
          className="w-5 h-5"
        />
      </button>
      <button className="w-10 h-10 flex items-center justify-center border border-black rounded-full transition-all cursor-pointer">
        <Image
          src={require("@/public/apple.png")}
          alt="Facebook"
          width={200}
          height={200}
          className="w-5 h-5"
        />
      </button>
    </div>
  );
}
