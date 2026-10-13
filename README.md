# D3js-Data-Visualization-TP1

> A web-based data visualization project using D3.js to translate quantitative demographic data into meaningful visual aesthetics through horizontal bar charts, dot plots, and grid layouts.

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![D3.js](https://img.shields.io/badge/D3.js-v7.9.0-orange)
![HTML5](https://img.shields.io/badge/HTML5-Canvas-E34F26)
![Python](https://img.shields.io/badge/Python-Local_Server-blue)
![Master](https://img.shields.io/badge/Master-Computer_Science-lightgrey)

---

# 📖 Overview
This project presents a **data visualization pipeline** built entirely with **D3.js**. The objective is to convert raw CSV data into clear, readable graphics that make complex information easier to understand. By systematically mapping data values (such as population counts and city rankings) to quantifiable visual features (aesthetics like position, scale, and color), the project explores different ways to represent amounts and distributions. This project was developed as part of the **Master's Program in Computer Science** at **USTHB**, specifically for practical coursework in Data Visualization (VD).

---

# ✨ Features
- 🏙️ **Top 15 US Cities Extraction:** Automated sorting and slicing of demographic data.
- 📊 **Horizontal Bar Charts:** Visualizing population amounts with proportional scaling.
- 🎯 **Dot Plots:** Displaying city populations using `d3.scalePoint` and circular aesthetics to reduce visual clutter.
- 🎨 **Color Grids:** Mapping hex codes and names to a mathematical SVG grid.
- 📏 **Dynamic Scaling:** Utilizing `d3.scaleLinear`, `d3.scaleBand`, and `d3.scalePoint` to fit data seamlessly within responsive dimensions.
- 🌐 **Automated Axes Generation:** Implementing `d3.axisBottom` and `d3.axisLeft` with customized tick formatting.

---

# 📑 Project Report

## Project Objective
Raw data is not just numbers; it represents real-world entities that need to be interpreted. The goal of this project is to systematically convert data values from datasets (`us-cities_2.csv` and `named_colors_css_2.csv`) into visual elements. The problem is formulated as mapping data values onto **aesthetics**—specifically position (x, y coordinates), shape, size, and color. The resulting graphical DOM elements provide an intuitive way to compare the magnitudes of different categories, such as the populations of major US cities.

---

# 🧠 Why D3.js?
Choosing the right visualization library is crucial. **D3.js (Data-Driven Documents)** was selected because it provides low-level control over the Document Object Model (DOM). Instead of hiding the rendering process behind pre-built charts, D3 allows for:
- Direct manipulation of SVG elements (rectangles, circles, lines, text).
- Flexible scale functions to translate data domains to pixel ranges.
- Powerful data binding methods using the `.data().join()` pattern.
- High customizability to enforce specific visual spacing, padding, and margins.

---

# 🔬 Representing Data Through Aesthetics
Following the principles of data visualization, this project relies on **Scales** to create a one-to-one mapping between data values and aesthetic values. 
- **Continuous Numerical Data:** Population values are mapped to a continuous horizontal axis (x-axis) using `d3.scaleLinear()`.
- **Categorical Data:** Unordered factors (city names) are mapped to the vertical axis (y-axis) using discrete position scales like `d3.scaleBand()` and `d3.scalePoint()`.
- **Color Differentiation:** Colors are assigned programmatically using hex codes from CSV data to render categorical grids.

---

# ⚙️ Visualizing Amounts & Distributions
The project implements two primary visualization strategies to display the magnitude of numbers across categories.

## Strategy 1 — Horizontal Bar Charts
To show the populations of the Top 15 cities, a horizontal bar chart is used (`index_cities.js`). Horizontal bars are preferred over vertical bars because city name labels take up significant horizontal space; rotating them would make the plot hard to read. The bars are arranged in descending order by size to make the figure clear and intuitive, avoiding arbitrary alphabetical ordering.

## Strategy 2 — Dot Plots
Because bars must start at zero, they can sometimes obscure detailed differences between high-value categories. As an alternative, a Dot Plot (`index_cities2.js`) places circular markers at specific coordinates along the axes, supplemented with a dashed grid line for enhanced readability. This approach reduces ink usage and highlights the relative positions of the cities based on their population.

---

# 🏗️ Pipeline

## 1️⃣ Dataset Preparation
- Load `us-cities_2.csv` and `named_colors_css_2.csv` asynchronously using `d3.csv()`.
- Convert string values to numerical formats (`Number(row.population)`).
- Sort the dataset in descending order and slice the top 15 records.

## 2️⃣ Canvas Setup
- Define precise margins (`top`, `right`, `bottom`, `left`) to ensure labels are not cut off.
- Append an `<svg>` element to the target DOM container and apply a translation transform to respect the margins.
- Set a clean, legible background color (`#f9f9fc`).

## 3️⃣ Scale & Axis Generation
- Define the `domain` (min/max of data) and `range` (pixels on screen) for both X and Y axes.
- Call `d3.axisBottom()` and `d3.axisLeft()` to automatically generate tick marks, lines, and text.
- Apply custom tick formatting (e.g., `.tickFormat(d3.format('.2s'))` to convert large numbers into compact forms like '8M').

## 4️⃣ Rendering Data Geometries
- Bind the sorted dataset to SVG elements (e.g., `<rect>` for bars, `<circle>` for dots).
- Dynamically calculate `x`, `y`, `width`, and `height` based on the previously defined scales.
- Apply CSS styling (fill colors, strokes, font-weights) directly through D3 attributes.

---

# 📂 Project Structure
```text
D3js-Data-Visualization-TP/
│
├── index.html              # Main HTML entry point loading the D3 CDN
├── index_cities.js               # D3 script: Horizontal Bar Chart implementation
├── index_cities2.js              # D3 script: Dot Plot with grid lines implementation
├── index.js                # D3 script: Mathematical grid and color mapping
│
├── us-cities_2.csv           # Dataset containing US city names and populations
├── named_colors_css_2.csv    # Dataset containing CSS color names and hex codes
│
└── README.md                 # Project documentation
