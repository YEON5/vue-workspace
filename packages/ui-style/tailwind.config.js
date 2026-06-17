/** @type {import('tailwindcss').Config} */
const tokenValue = require("./src/design-tokens");
const { PREFIX, PREFIX_DASH } = require("./src/tokens-config");

module.exports = {
  // PREFIX가 있을 때만 safelist 적용
  // PREFIX가 빈 문자열이면 ^bg- 처럼 모든 Tailwind 기본 클래스까지 포함되어 번들이 불필요하게 커짐
  safelist: PREFIX ? [
    { pattern: new RegExp(`^bg-${PREFIX_DASH}`) },
    { pattern: new RegExp(`^text-${PREFIX_DASH}`) },
    { pattern: new RegExp(`^border-${PREFIX_DASH}`) },
    { pattern: new RegExp(`^rounded-${PREFIX_DASH}`) },
    { pattern: new RegExp(`^p-${PREFIX_DASH}`) },
    { pattern: new RegExp(`^px-${PREFIX_DASH}`) },
    { pattern: new RegExp(`^py-${PREFIX_DASH}`) },
    { pattern: new RegExp(`^pt-${PREFIX_DASH}`) },
    { pattern: new RegExp(`^pb-${PREFIX_DASH}`) },
    { pattern: new RegExp(`^pl-${PREFIX_DASH}`) },
    { pattern: new RegExp(`^pr-${PREFIX_DASH}`) },
    { pattern: new RegExp(`^m-${PREFIX_DASH}`) },
    { pattern: new RegExp(`^mx-${PREFIX_DASH}`) },
    { pattern: new RegExp(`^my-${PREFIX_DASH}`) },
    { pattern: new RegExp(`^mt-${PREFIX_DASH}`) },
    { pattern: new RegExp(`^mb-${PREFIX_DASH}`) },
    { pattern: new RegExp(`^ml-${PREFIX_DASH}`) },
    { pattern: new RegExp(`^mr-${PREFIX_DASH}`) },
    { pattern: new RegExp(`^gap-${PREFIX_DASH}`) },
  ] : [],

  content: [
    // @ui/style 자체 소스
    "./src/**/*.{js,ts,jsx,tsx,vue}",

    // Vue UI 컴포넌트 (패키지 추가 시 아래에 경로 추가)
    "../../packages/ui-vue/src/**/*.{js,ts,jsx,tsx,vue}",
    "../../packages/ui-vue/index.html",

    // Next.js App (react-docs)
    // "../../apps/react-docs/app/**/*.{js,ts,jsx,tsx,mdx}",
    // "../../apps/react-docs/components/**/*.{js,ts,jsx,tsx,mdx}",

    // Nuxt App (vue-docs)
    // "../../apps/vue-docs/app/**/*.{js,ts,jsx,tsx,vue}",
    // "../../apps/vue-docs/layouts/**/*.{js,ts,jsx,tsx,vue}",
    // "../../apps/vue-docs/pages/**/*.{js,ts,jsx,tsx,vue}",

    // React UI Components
    // "../../packages/ui-react/src/**/*.{js,ts,jsx,tsx}",
    // "../../packages/ui-react/index.html",
  ],

  theme: {
    extend: {
      colors: {
        border: "rgb(var(--border))",
        input: "rgb(var(--input))",
        ring: "rgb(var(--ring))",
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
        primary: {
          DEFAULT: "rgb(var(--primary))",
          foreground: "rgb(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary))",
          foreground: "rgb(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive))",
          foreground: "rgb(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "rgb(var(--muted))",
          foreground: "rgb(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "rgb(var(--accent))",
          foreground: "rgb(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "rgb(var(--popover))",
          foreground: "rgb(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "rgb(var(--card))",
          foreground: "rgb(var(--card-foreground))",
        },
        ...tokenValue.colors,
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        ...tokenValue.borderRadius,
      },

      spacing: tokenValue.spacing,
      fontSize: tokenValue.fontSize,

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },

  plugins: [require("tailwindcss-animate")],
};