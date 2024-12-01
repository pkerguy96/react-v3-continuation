import React, { useEffect, useRef, useState } from "react";
import getGlobal from "../hooks/getGlobal";
import { CACHE_KEY_TvWaitingRoom } from "../constants";
import { tvWaitingListApiClient } from "../services/WaitingroomService";
import LoadingSpinner from "../components/LoadingSpinner";

const scroll = (i, waiting) => {
  var active = waiting.children[i + 1];
  if (!active) active = waiting.children[waiting.children.length - 1];
  active.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
};

const Lobby = () => {
  const { data, isLoading } = getGlobal(
    {},
    CACHE_KEY_TvWaitingRoom,
    tvWaitingListApiClient,
    {
      refetchInterval: 5000, // Fetch data every 5 seconds
    }
  );
  const [current, setCurrent] = useState(1);
  const waiting = useRef();

  useEffect(() => {
    if (!waiting.current) return;
    var current = 1;
    if (data) {
      data.forEach((carry, index) => {
        if (carry.status === "current") current = index + 1;
      });
    }

    scroll(current, waiting.current);
  }, [data]);

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <main className="flex items-center justify-center w-full h-[100dvh] p-4">
        <section className="h-[90dvh] w-full max-w-[1000px] relative">
          {data && data.length > 0 && (
            <div className="ui-grid-cursor rounded-2xl bg-green-500 bg-opacity-30"></div>
          )}
          {data && data.length > 0 ? (
            <ul
              ref={waiting}
              className="ui-grid w-full h-full scroll-smooth overflow-hidden"
            >
              <li></li>
              <li className="start"></li>
              {data.map((carry, index) => (
                <li
                  key={index}
                  className="flex flex-wrap bg-white rounded-2xl shadow-xl items-center p-4 px-10 gap-8"
                >
                  <h1 className="text-gray-900 font-black text-5xl w-max">
                    {index + 1}.
                  </h1>
                  <div className="block h-full aspect-square object-cover object-center bg-gray-200 rounded-full"></div>
                  <h1 className="text-gray-900 font-black text-3xl w-0 flex-1">
                    {carry.patient_name}
                  </h1>
                </li>
              ))}
              <li className="end"></li>
              <li></li>
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="z-50 text-white font-semibold text-2xl">
                Aucun patient n'attend actuellement
              </p>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Lobby;
