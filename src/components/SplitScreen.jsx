// SplitScreen + RegionSelector (~20% of work) kei
// Build SplitScreen.jsx — resizable split view (left: original image canvas, right: controls panel) using Pointer Events for the divider
// Build RegionSelector.jsx — draggable selection rectangle overlay on the image canvas, emits {x, y, w, h} for PixelGrid
// Wire the original-image canvas display on the left side

import React from 'react';

export default function SplitScreen() {
  return (
    <div id="container">
      <div id="button-container">
        <button type="button">Change Image</button>
        <button type="button">filler</button>
      </div>

      <div id="squares-image-container">
        <div id="image" className="square">
            <img></img>
        </div>

        <div id="pixels" className="square">
          {/*
            - render pixel grid array here
            - hover div for RGB, HSB, Opacity, and Coordinates
          */}
        </div>
      </div>

      <div id="explainer-container">
        <div id="math-container">
          <div>
            <h3>How it works in math</h3>
            <p>Explanation text here</p>
          </div>
          <div>
            <span>[Math Matrix Visual Placeholder]</span>
          </div>
        </div>

        <div id="memory-container">
          <div>
            <h3>How it works in memory</h3>
            <p>Explanation text here</p>
          </div>
          <div>
            <span>[Memory Layout Visual Placeholder]</span>
          </div>
        </div>
      </div>
    </div>
  );
} 