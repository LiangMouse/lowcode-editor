/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // 意图是将以上文件都作为内容文件进行编译提取className
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
