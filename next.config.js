/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["utfs.io"],
	},
};
// module.exports = {
// 	webpack(config) {
// 		config.module.rules.push({
// 			test: /\.md$/,
// 			use: "raw-loader",
// 		});
// 		return config;
// 	},
// };

module.exports = nextConfig;
