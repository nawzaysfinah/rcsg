"use client"; // top to the file

import MyMap from "./GoogleMap";

export default function Home() {
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center p-24">
        <h1 className="font-mono text-2xl text-green-500 text-center">
          Running Club So Good <br></br> 🏃🏽‍♀️🏃🏻🏃🏿
        </h1>
        <br></br>
        <MyMap />
        <br></br>

        <div>
          <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
            <a
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Why zone 2?{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Why should you do 90-150mins of zone 2 cardio a week?
              </p>
            </a>

            <a
              href="https://www.instagram.com/runningclub.sg"
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Connect{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Get a run in!
              </p>
            </a>

            <a
              href="https://www.google.com/maps/d/u/0/edit?mid=1nSCwf593sp78sel4fsxECp7o6huIq9Y&usp=sharing"
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Try a route{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
                10 routes we think you should try. Until we figure out the{" "}
                <a href="https://developers.google.com/maps/documentation/javascript/overview">
                  Maps Javascript API{" "}
                </a>
              </p>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
