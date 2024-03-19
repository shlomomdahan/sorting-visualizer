"use client";

import { Select } from "@/components/input/Select";
import { Slider } from "@/components/input/Slider";
import { useSortingAlgorithmContext } from "@/context/Visualizer";
import { SortingAlgorithmType } from "@/lib/types";
import {
  algorithmOptions,
  generateAnimationArray,
  sortingAlgorithmsData,
} from "@/lib/utils";
import { FaPlayCircle } from "react-icons/fa";
import { RxReset } from "react-icons/rx";

export default function Home() {
  const {
    arrayToSort,
    isSorting,
    setAnimationSpeed,
    animationSpeed,
    selectedAlgorithm,
    setSelectedAlgorithm,
    requiresReset,
    resetArrayAndAnimation,
    runAnimation,
  } = useSortingAlgorithmContext();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAlgorithm(e.target.value as SortingAlgorithmType);
  };

  const handlePlay = () => {
    if (requiresReset) {
      resetArrayAndAnimation();
      return;
    }

    generateAnimationArray(
      selectedAlgorithm,
      isSorting,
      arrayToSort,
      runAnimation
    );
  };

  return (
    <main className="absolute top-0 h-screen w-screen z-[-2] bg-slate-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="flex h-full justify-center">
        <div
          id="content-container"
          className="flex max-w-[1020px] w-full flex-col lg:px-0 px-4 mb-4"
        >
          <div className="h-[66px] relative flex items-center justify-between w-full">
            <h1 className="text-gray-300 text-2xl font-light hidden md:flex">
              Sorting Visualizer
            </h1>
            <div className="flex items-center justify-center gap-4">
              <Slider
                isDisabled={isSorting}
                value={animationSpeed}
                handleChange={(e) => setAnimationSpeed(Number(e.target.value))}
              />
              <Select
                options={algorithmOptions}
                defaultValue={selectedAlgorithm}
                onChange={handleSelectChange}
                isDisabled={isSorting}
              />
              <button
                className="flex items-center justify-center"
                onClick={handlePlay}
              >
                {requiresReset ? (
                  <RxReset className="text-gray-400 h-8 w-8" />
                ) : (
                  <FaPlayCircle className="text-system-green60 h-8 w-8" />
                )}
              </button>
            </div>
          </div>
          <div className="relative h-[calc(100vh-66px)] w-full">
            <div className="absolute bottom-[32px] w-full mx-auto left-0 right-0 flex justify-center items-end">
              {arrayToSort.map((value, index) => (
                <div
                  key={index}
                  className="array-line relative w-1 mx-0.5 shadow-lg opacity-70 rounded-lg default-line-color"
                  style={{ height: `${value}px` }}
                ></div>
              ))}
            </div>
          </div>

          <div className="hidden w-full p-6 bg-gradient-to-r from-slate-700 to-slate-800 rounded-lg shadow-lg border border-gray-700 gap-8 sm:flex justify-between text-gray-200">
            <div className="flex flex-col w-3/4">
              <h3 className="text-xl font-semibold">
                {sortingAlgorithmsData[selectedAlgorithm].title}
              </h3>
              <p className="text-md text-gray-300 mt-2">
                {sortingAlgorithmsData[selectedAlgorithm].description}
              </p>
            </div>
            <div className="flex flex-col w-1/4 gap-4">
              <h3 className="text-xl font-semibold">Time Complexity</h3>
              <div className="flex flex-col gap-2">
                <p className="flex w-full text-md text-gray-300">
                  <span className="font-medium w-32">Worst Case:</span>
                  <span>
                    {sortingAlgorithmsData[selectedAlgorithm].worstCase}
                  </span>
                </p>
                <p className="flex w-full text-md text-gray-300">
                  <span className="font-medium w-32">Average Case:</span>
                  <span>
                    {sortingAlgorithmsData[selectedAlgorithm].averageCase}
                  </span>
                </p>
                <p className="flex w-full text-md text-gray-300">
                  <span className="font-medium w-32">Best Case:</span>
                  <span>
                    {sortingAlgorithmsData[selectedAlgorithm].bestCase}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
