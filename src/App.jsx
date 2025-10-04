import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Test from "./pages/Test";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} index />
				<Route path="/test" element={<Test />} />
				<Route path="/results" element={<Results />} />
			</Routes>
		</Router>
	);
}

export default App;
