// SplitScreen + RegionSelector (~20% of work) kei
// Build SplitScreen.jsx — resizable split view (left: original image canvas, right: controls panel) using Pointer Events for the divider
// Wire the original-image canvas display on the left side

import React from 'react';
import RegionSelector from './RegionSelector';

export default function SplitScreen() {
  return (
  <div id="container" className="p-6 bg-neutral-900 text-white min-h-screen flex flex-col gap-6">
      <div id="button-container" className="flex gap-4">
        <button 
          type="button"
          className="px-4 py-2 bg-sky-500 rounded font-medium"
        >
          Change Image
        </button>
      </div>

      <div id="panels-container" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div id="image-panel" className="relative aspect-square w-full overflow-hidden">
            <RegionSelector
              imageUrl={imageUrl}
              onRegionChange={handleRegionChange}
            />

            <div id="floating-controls" 
            className="absolute bottom-4 left-4 z-50 flex items-center gap-2 bg-neutral-900/90 px-3 py-1.5 rounded-full border border-neutral-700 pointer-events-auto select-none">
              <button
                type="button"
                title="Rotate Clockwise"
                className="p-1.5 text-neutral-300"
              >
                ↻
              </button>
              <button
                type="button"
                title="Zoom Out"
                className="p-1.5 text-neutral-300"
              >
                -
              </button>
              <button
                type="button"
                title="Zoom In"
                className="p-1.5 text-neutral-300"
              >
                +
              </button>
            </div>
        </div>

        <div id="pixel-grid-panel">
          {/*
            - render pixel grid array here
            - hover div for RGB, HSB, Opacity, and Coordinates
          */}
        </div>
      </div>

      <div id="explainer-container" className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        <div id="math-container" className="p-6">
            <h3 className="text-lg font-semibold text-sky-400 mb-2">How it works in math</h3>
            <p className="text-neutral-400 text-sm">Explanation text here</p>
            <span>[Math Matrix Visual Placeholder]</span>
        </div>

        <div id="memory-container" className="p-6">
            <h3 className="text-lg font-semibold text-sky-400 mb-2">How it works in memory</h3>
            <p className="text-neutral-400 text-sm">Explanation text here</p>
            <span>[Memory Layout Visual Placeholder]</span>
        </div>
      </div>
    </div>
  );
} 