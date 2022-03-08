import "./styles.css";
import Navbar from "./components/Navbar";
import Button from "./components/Button";
import CustomButton from "./components/CustomButton";

function App() {
  return (
    <div className="App">
      <Navbar />

      <h2>LEARN REACT</h2>

      <Button />

      <CustomButton text="REACT NATIVE" />

      <h2>REACT PROJECTS</h2>

      <img src="https://education-team-2020.s3.eu-west-1.amazonaws.com/web-dev/code-examples/react-intro-apps-1.png" />
      <img src="https://education-team-2020.s3.eu-west-1.amazonaws.com/web-dev/code-examples/react-intro-apps-2.png" />
      <img src="https://education-team-2020.s3.eu-west-1.amazonaws.com/web-dev/code-examples/react-intro-apps-3.png" />
      <img src="https://education-team-2020.s3.eu-west-1.amazonaws.com/web-dev/code-examples/react-intro-apps-4.png" />
    </div>
  );
}

export default App;
