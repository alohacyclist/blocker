// We import other components to be able to use them inside of this component
import ImageOne from "./ImageOne";
import ImageTwo from "./ImageTwo";
import ImageThree from "./ImageThree";
import ImageFour from "./ImageFour";

// React Component <Gallery />

function Gallery() {
  return (
    <div>
      <h2>REACT PROJECTS</h2>

      <ImageOne />
      <ImageTwo />
      <ImageThree />
      <ImageFour />
    </div>
  );
}

export default Gallery;
