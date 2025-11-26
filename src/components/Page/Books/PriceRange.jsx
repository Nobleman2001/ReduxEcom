import { useState } from "react";

const PriceRange = () => {
  const [min, setMin] = useState("0");
  const [max, setMax] = useState("10000");
  const priceGap = 200;

  const safeMin = Number(min) || 0;
  const safeMax = Number(max) || 0;

  const handleInputMinPrice = (e) => {
    const value = e.target.value;
    if (value === "") {
      setMin("");
      return;
    }

    const num = Number(value);
    if (isNaN(num)) return;

    // Gap check
    if (num <= Number(max) - priceGap) {
      setMin(value);
    }
  };

  const handleInputPriceMax = (e) => {
    const value = parseInt(e.target.value);
    if (value >= max + priceGap) {
      setMax(value);
    }
  };

  const handleMin = (e) => {
    const value = parseInt(e.target.value);
    if (value <= max - priceGap) {
      setMin(value);
    }
  };

  const handleMax = (e) => {
    const value = parseInt(e.target.value);
    if (value >= min + priceGap) {
      setMax(value);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 ">
      <div className="flex justify-between text-sm mb-3">
        <div className="">
          <input
            type="number"
            value={min}
            onChange={handleInputMinPrice}
            className="border outline-none py-2 px-3 my-5 w-32 border-gray-400 rounded-md"
          />
        </div>
        <div className="">
          <input
            type="number"
            value={max}
            onChange={handleInputPriceMax}
            className="border outline-none py-2 px-3 my-5 w-32 border-gray-400 rounded-md"
          />
        </div>
      </div>

      <div className="relative w-full h-2 bg-gray-300 rounded-md">
        {/* Progress highlight */}
        <div
          className="absolute h-2 bg-[#d53e4f] rounded-md "
          style={{
            left: `${(safeMin / 10000) * 100}%`,
            right: `${100 - (safeMax / 10000) * 100}%`,
          }}></div>

        <input
          type="range"
          min="0"
          max="10000"
          value={min}
          onChange={handleMin}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none"
        />

        {/* Max Slider */}
        <input
          type="range"
          min="0"
          max="10000"
          value={max}
          onChange={handleMax}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none"
        />
      </div>

      <style>
        {`
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 16px;
            width: 16px;
            background: white;
            border: 3px solid #d53e4f;
            border-radius: 50%;
            cursor: pointer;
            pointer-events: auto;
          }
        `}
      </style>
    </div>
  );
};

export default PriceRange;
