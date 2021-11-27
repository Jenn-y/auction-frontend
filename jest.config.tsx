import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
	verbose: true,
	modulePaths: ["<rootDir>/src"],
	moduleDirectories: ["node_modules", "src"],
	moduleFileExtensions: [
		"ts",
		"tsx"
	],
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest",
	},
	moduleNameMapper: {
		"^@Login/(.*)": "<rootDir>/src/components/Login/Login/$1",
		"^@Registration/(.*)": "<rootDir>/src/components/Registration/Registration/$1",
	},
};

export default config;
