// import config from 'eslint-config-xo';
import {defineConfig} from 'eslint/config';

export default defineConfig([
	{
		files: ["**/*.js"],
		rules: {
			"no-undef": 1,
		},
	}
]);
