import "./styles.css";
// We import other components to be able to use them inside of this component
import Navbar from "./components/Navbar";
import Button from "./components/Button";
import CustomButton from "./components/CustomButton";
import Headline from "./components/Headline";
import Gallery from "./components/Gallery";

// React Component <App />

function App() {
  return (
    <div className="App">
      <Navbar />
      <Headline />

      <Button />
      <CustomButton btnText="REACT NATIVE" url="https://reactjs.org" />
      <CustomButton btnText="REDUX" url="hhttps://redux.js.org/" />

      <Gallery />
    </div>
  );
}

export default App;
