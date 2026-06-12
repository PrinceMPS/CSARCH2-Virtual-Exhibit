# Inside a Digital Image: How Computers Store and Transform Visual Data

### Project Theme: **Digital Image Processing**

---

## Members
- Chu, Avery Simone  
- Saguin, VL Kirsten Camille "Kei"  
- Sia, Justin Michael  
- Sy, Prince Matthew  
- Tan, Paul Aiden  

---

## Overview

Every digital image undergoes a series of steps before it appears on a screen. Images may be stored in formats such as **PNG**, **BMP**, **HEIC**, etc, each using different methods for organizing and compressing data. However, before an image can be displayed or modified, the computer must **decode the file** and load its contents into memory as **pixel data**.

Once in memory, the image is represented as **numerical values** describing the color and transparency of each pixel, allowing the computer to perform processing operations regardless of the original file format.

This exhibit allows visitors to explore how computers represent and manipulate digital images through an **interactive simulation**. Users can upload or select an image, zoom into specific regions, and examine individual pixels within an enlarged pixel grid. A **format representation module** explains how common image formats differ in storage and compression while demonstrating that they ultimately become pixel data when loaded into memory.

By selecting individual pixels, users can inspect their:
- RGB values
- Opacity
- Hexadecimal and binary representations
- How those values are stored in memory

Visitors can also apply **image processing operations** such as grayscale conversion, brightness adjustment, scaling, and rotation while viewing the **mathematical formulas and matrix transformations** that drive these changes.

---

## Key Features

### Image Input
- Upload an image or select from a set of sample images
- Interactive **split-screen interface** displaying the original image and a data exploration panel
- **Region selection tool** for zooming into specific areas of an image
- Enlarged **pixel grid** for visualizing individual pixels and their spatial arrangement

### <mark>Image Format Representation Module</mark>
<mark>Supports:</mark>
- <mark>**PNG**</mark>
- <mark>**BMP**</mark>
- <mark>**HEIC**</mark>
- <mark>**JPG**</mark>

<mark>Educational comparison includes:</mark>
- <mark>**How image data is stored**</mark>
- <mark>**Compression methods used by each format**</mark>
- <mark>**Transparency support**</mark>
- <mark>**Relative storage requirements**</mark>
- <mark>How image files are **decoded into pixel data**</mark>

### <mark>Image Pipeline Visualization</mark>
1. <mark>Storage Device  </mark>
2. <mark>Image File  </mark>
3. <mark>Decoding Process  </mark>
4. <mark>Memory Representation  </mark>
5. <mark>Display Output  </mark>

### <mark>Interactive Pixel Inspection Tool
<mark>Activated when a pixel is selected, displaying:</mark>
- <mark>Pixel coordinates</mark>
- <mark>**RGB values**</mark>
- <mark>**HSB and HSL values**</mark>
- <mark>**Opacity (Alpha) values**</mark>
- <mark>**Hexadecimal representation**</mark>
- <mark>**Binary representation**</mark>
- <mark>Approximate memory layout of the pixel's data</mark>

### <mark>Memory Representation Visualization</mark>
<mark>Shows how pixels are stored as **numerical values** after decoding.</mark>

### Real-Time Image Processing Operations
- **Grayscale conversion**
- **Brightness adjustment**
- **Color inversion**
- **Scaling**
- **Rotation**

### <mark>Mathematical Visualizations</mark>
<mark>Accompanying image transformations, including:</mark>
- <mark>Arithmetic operations on pixel values</mark>
- <mark>**Matrix-based transformations** used for scaling and rotation</mark>

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | **Astro 6** |
| UI Library | **React 19** |
| Styling | **Tailwind CSS** |
| Graphics | **Native Canvas API** |
| Input Handling | **Native Pointer Events** |
| Math Engine | **Mathjs** |
| File Upload | **react-dropzone** |
| Animation | **Framer Motion** |
| Components | **shadcn/ui** |

---
 
## 🎨 Style Guide Snapshot
 
<img src="Revised_Snapshot.png" height="600">
 
 