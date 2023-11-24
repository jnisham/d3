
//
// This implements vector field visualization techniques and relies on
// flowvis.js to perform the data loading of vector fields in VTK's .vti
// format.
//
// It expects a a div with id 'vfplot' to where the vector field will be
// visualized
//




////////////////////////////////////////////////////////////////////////
// Global variables and helper functions


//this variable will hold the vector field upon loading
let vf = null;

//variables for the svg canvas
let svg = null;
let width = 800;
let height = 800;





////////////////////////////////////////////////////////////////////////
// Visual Encoding portion that handles the d3 aspects

// Function to create the d3 objects
function initializeSVG() {
  //Since we will call this function multiple times, we'll clear out the
  //svg if it exists
  if (svg != null) {
    svg.remove()
  }

  //vf.bounds will report the units of the vector field
  //use aspect ratio to update width/height
  let aspectRatio = (vf.bounds[3]-vf.bounds[2]) / (vf.bounds[1]-vf.bounds[0])

  //Initialize the SVG canvas
  svg = d3.select("#vfplot")
    .append("svg")
    .attr("width", width).attr("height", height);


  //TODO: Create scales for x, y, color and magnitude
  //vf.range will report the minimum/maximum magnitude



  //TODO append axes



  //TODO draw either glyphs or streamlines, based on user selection
}



////////////////////////////////////////////////////////////////////////
// Function to read data

// Function to process the upload
function upload() {
  if (input.files.length > 0) {
    let file = input.files[0];
    console.log("You chose", file.name);

    let fReader = new FileReader();
    fReader.readAsArrayBuffer(file);

    fReader.onload = function(e) {
      let fileData = fReader.result;

      //load the .vti data and initialize volren
      vf = parseVTKFile(fileData);

      initializeSVG();
    }
  }
}

// Attach upload process to the loadData button
var input = document.getElementById("loadData");
input.addEventListener("change", upload);


////////////////////////////////////////////////////////////////////////
// Functions to respond to selections

//TODO, depending on user input mechanism
