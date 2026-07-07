import { useState } from "react";
import ImageInput from "../components/ImageInput.jsx";
import SplitScreen from "../components/SplitScreen.jsx";
// import PixelInspector from "../components/PixelInspector.jsx";
// import PixelGrid from "../components/PixelGrid.jsx";
// import ImageProcessor from "../components/ImageProcessor.jsx";
// import FormatModule from "../components/FormatModule.jsx";
// import MathVisualizer from "../components/MathVisualizer.jsx";
import RegionSelector from "../components/RegionSelector.jsx";
// import PipelineVisualizer from "../components/PipelineVisualizer.jsx";
// import MemoryVisualization from "../components/MemoryVisualization.jsx";

/**
 * The main exhibit application component that manages the state of the current image and renders the appropriate UI based on whether an image is loaded or not.
 *
 * Sidenote:
 * apparently we can't put this in the index.mdx file because of the way Astro handles JSX components. So we have to put it in a separate file and import it into index.mdx.
 *
 * @returns {JSX.Element}
 */
export default function App() {
    return (
        <div className="w-full h-full bg-[#111111] p-10">
            <div className="flex flex-col gap-10">
                <h1 className="text-blue-400 font-bold text-[32px]">
                    How Computers See Images
                </h1>
                <p className="text-white text-justify m-4 max-w-4xl">
                    Every digital image undergoes a series of steps before it appears on a
                    screen. Images may be stored in formats such as PNG, JPG/JPEG, BMP,
                    HEIC, with each using different methods for organizing and compressing
                    data. Before an image can be displayed or modified, the computer must
                    decode the file and load its contents into memory as pixel data.
                </p>
                <SplitScreen />
            </div>
        </div>
    );
}
