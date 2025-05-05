const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

// Define input and output paths
const inputFile = path.resolve(__dirname, 'src/css/tailwind.css');
const outputFile = path.resolve(__dirname, 'public/build/tailwind.css');
const outputDir = path.dirname(outputFile);

// Read the input CSS file content
fs.readFile(inputFile, (err, css) => {
  if (err) {
    console.error("Error reading input CSS file:", err);
    process.exit(1); // Exit with error code
  }

  console.log(`Processing CSS from ${inputFile}...`);

  // Process CSS with PostCSS, Tailwind, and Autoprefixer
  postcss([
    tailwindcss(path.resolve(__dirname, 'tailwind.config.js')), // Pass config path
    autoprefixer
  ])
  .process(css, { from: inputFile, to: outputFile })
  .then(result => {
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      console.log(`Created output directory: ${outputDir}`);
    }

    // Write the processed CSS to the output file
    fs.writeFile(outputFile, result.css, () => {
      console.log(`Successfully built CSS to ${outputFile}`);
      // Optionally write map file if needed
      // if (result.map) {
      //   fs.writeFile(outputFile + '.map', result.map.toString(), () => true);
      // }
      process.exit(0); // Exit successfully
    });
  })
  .catch(error => {
    console.error("Error processing CSS:", error);
    process.exit(1); // Exit with error code
  });
});