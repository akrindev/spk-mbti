import { HeroUIProvider } from "@heroui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import { TestProvider } from './context/TestContext';
import "./index.css";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<HeroUIProvider>
 			<TestProvider>
 				<App />
 			</TestProvider>
		</HeroUIProvider>
	</StrictMode>,
);
