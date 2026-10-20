/** @type {import('tailwindcss').Config} */
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // All colours are CSS variables so the dark / light theme can swap them (see src/index.css)
        void: v('void'),
        white: v('fg'), // "white" follows the theme: white on dark, near-black on light
        navy: { 950: v('navy-950'), 900: v('navy-900'), 800: v('navy-800'), 700: v('navy-700') },
        accent: v('accent'), // lime (text / borders, theme aware)
        accent2: v('accent2'), // violet
        lime: v('lime'), // fixed brand lime used for buttons
        ink: { DEFAULT: v('ink'), muted: v('ink-muted'), faint: v('ink-faint') },
        ok: v('ok'),
        err: v('err'),
        warn: v('warn'),
      },
      fontFamily: {
        display: ['"Space Grotesk Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Inter Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        hand: ['"Caveat Variable"', 'cursive'],
      },
      boxShadow: {
        glow: '0 0 40px -12px rgb(var(--accent) / 0.5)',
        'glow-violet': '0 0 40px -12px rgb(var(--accent2) / 0.55)',
        card: '0 20px 50px -30px rgb(var(--shadow) / 0.6)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-7px) rotate(-1deg)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        wave: {
          '0%, 60%, 100%': { transform: 'rotate(0deg)' },
          '10%, 30%': { transform: 'rotate(16deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10deg)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 7s ease-in-out infinite',
        blink: 'blink 1.1s steps(1) infinite',
        wave: 'wave 2.4s ease-in-out 1.2s 2',
      },
    },
  },
  plugins: [],
}
