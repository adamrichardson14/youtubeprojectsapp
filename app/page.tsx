import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen bg-black">
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="text-center max-w-screen-sm mb-10">
          <h1 className="text-stone-200 font-bold text-2xl">
            The Number one Project Management Tool
          </h1>
          <p className="text-gray-200 text-lg my-2">
            Ready to boost your teams efficiency by 6000%?{" "}
          </p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/dashboard"
            prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
            className="text-stone-400 underline hover:text-stone-200 transition-all"
          >
            Dashboard
          </Link>
          <p className="text-white">·</p>
          <a
            href="https://github.com/adamrichardson14/youtubeprojectsapp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-400 underline hover:text-stone-200 transition-all"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
