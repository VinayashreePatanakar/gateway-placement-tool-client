import React from "react";
import Banner from "../Banner/Banner.jsx";
import SiteMap from "../../../components/SiteMap.jsx";
import { useMapStore } from "../../../store/mapStore.js";

import { useLocation } from "react-router-dom";


function Home() {
  const { counts, addElement, removeElementByType } = useMapStore();
const location = useLocation();
const selectedFloor = location.state?.floor || "Ground Floor"; // fallback

  

  return (
    <div className="overflow-y-auto max-h-[100vh] p-3">
      <h2 className="text-xl font-semibold mb-2">Gateway Placement Tool</h2>
            <h2 className="text-xl font-semibold mb-2">
   {selectedFloor}
</h2>
      <Banner />




      <section className="grid grid-cols-4 gap-4 min-h-[80vh] w-full p-4">
        {/* Left side: Buttons & counters */}
        <div className="col-span-1 flex flex-col justify-start border-2 border-gray-400 p-4 rounded-lg">
          <div className="flex flex-col gap-4 w-full">
            {/* SENSOR Row */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="w-20 font-semibold text-gray-700">Sensor</label>
              <div className="flex flex-wrap items-center gap-2 flex-1 justify-end">
                <button
                  onClick={() => addElement("sensor")}
                  className="btn btn-success w-10 h-10 min-h-0 text-lg"
                >
                  +
                </button>
                <span className="text-lg font-bold w-6 text-center">{counts.sensor}</span>
                <button
                  className="btn btn-outline btn-error w-10 h-10 min-h-0 text-lg"
                  onClick={() => removeElementByType("sensor")}
                >
                  -
                </button>
              </div>
            </div>

            {/* GATEWAY Row */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="w-20 font-semibold text-gray-700">Gateway</label>
              <div className="flex flex-wrap items-center gap-2 flex-1 justify-end">
                <button
                  onClick={() => addElement("gateway")}
                  className="btn btn-success w-10 h-10 min-h-0 text-lg"
                >
                  +
                </button>
                <span className="text-lg font-bold w-6 text-center">{counts.gateway}</span>
                <button
                  className="btn btn-outline btn-error w-10 h-10 min-h-0 text-lg"
                  onClick={() => removeElementByType("gateway")}
                >
                  -
                </button>
              </div>
            </div>

            {/* REPEATER Row */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="w-20 font-semibold text-gray-700">Repeater</label>
              <div className="flex flex-wrap items-center gap-2 flex-1 justify-end">
                <button
                  onClick={() => addElement("repeater")}
                  className="btn btn-success w-10 h-10 min-h-0 text-lg"
                >
                  +
                </button>
                <span className="text-lg font-bold w-6 text-center">{counts.repeater}</span>
                <button
                  className="btn btn-outline btn-error w-10 h-10 min-h-0 text-lg"
                  onClick={() => removeElementByType("repeater")}
                >
                  -
                </button>
              </div>
            </div>

            {/* Save & Export Section */}
            <div className="mt-4">
              <h2 className="mb-2 font-semibold">Save and Export</h2>
              <div className="flex gap-2 flex-wrap">
                <button className="btn btn-wide border-2 border-black px-4 py-2 rounded sm:w-auto">
                  Save
                </button>
                <button className="btn btn-wide border-2 border-black px-4 py-2 rounded sm:w-auto">
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Middle: Interactive map */}
        <div className="col-span-3 w-full bg-white border-2 border-gray-400 rounded-lg flex justify-center items-center">
          <SiteMap />
        </div>
      </section>
    </div>
  );
}

export default Home;
