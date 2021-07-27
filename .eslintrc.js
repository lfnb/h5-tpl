module.exports = {
	parser: "babel-eslint",
	extends: ["airbnb", "plugin:prettier/recommended"],
	plugins: ["react", "prettier"],
	env: {
		serviceworker: true, // React Native项目不需要添加这行
		browser: true,
		es6: true,
		node: true,
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: "module",
	},
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly",
		window: true,
		WeixinJSBridge: true,
	},
	rules: {
		"react/jsx-filename-extension": [
			1,
			{
				extensions: [".js", ".jsx", ".tsx", ".ts"],
			},
		],
		"linebreak-style": 0,
		"react/forbid-prop-types": 0,
		"no-plusplus": [
			1,
			{
				allowForLoopAfterthoughts: true,
			},
		],
		"react/jsx-indent": "off",
		"jsx-a11y/alt-text": "off",
		"jsx-a11y/no-static-element-interactions": "off",
		"jsx-a11y/click-events-have-key-events": "off",
		"jsx-a11y/anchor-is-valid": "off",
		"import/no-extraneous-dependencies": "off",
		"no-new": "off",
		"react/jsx-wrap-multilines": "off",
		"react/jsx-one-expression-per-line": "off",
		"react/jsx-indent-props": "off",
		"consistent-return": "off",
	},
};
