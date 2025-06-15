import Image from "next/image";

const Marquee = () => {
  return(
    <>
            <div className="fixed inset-0 flex items-center -rotate-2 select-none">
        <div className="relative">
          <div className="bg-white/0 animate-horizontal-scroll flex items-center gap-8 w-max px-8">
            <h1 className="shrink-0 text-white text-10xl font-black">
              <Image src={"/icons/groot-type.png"} alt={""} width={150} height={150} />
            </h1>
            <h2 className="shrink-0 text-white text-8xl italic font-light">
              Family Tree
            </h2>
            <h2 className="shrink-0 text-white text-12xl font-bold">
              <Image src={"/icons/squidNBG.png"} alt={"hehe"} width={150} height={150} />
            </h2>
            <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">
              Pics
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-medium">
              Roots
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-extralight italic">
              Events
            </h2>
            <h2 className="shrink-0 text-white text-13xl font-bold">
              <Image src={"/icons/icon.png"} alt={""} width={150} height={150} />
            </h2>
            <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
              History
            </h2>
          </div>
          <div className="absolute top-0 left-0 bg-white/0 animate-horizontal-scroll-2 flex items-center gap-8 px-8 w-max">
            <h1 className="shrink-0 text-white text-10xl font-black">
              <Image src={"/icons/groot-type.png"} alt={""} width={150} height={150} />
            </h1>
            <h2 className="shrink-0 text-white text-8xl italic font-light">
              Family Tree
            </h2>
            <h2 className="shrink-0 text-white text-12xl font-bold">
              <Image src={"/icons/squidNBG.png"} alt={"hehe"} width={150} height={150} />
            </h2>
            <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">
              Pics
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-medium">
              Roots
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-extralight italic">
              Events
            </h2>
            <h2 className="shrink-0 text-white text-13xl font-bold">
              <Image src={"/icons/icon.png"} alt={""} width={150} height={150} />
            </h2>
            <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
              History
            </h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default Marquee;