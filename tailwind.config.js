/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0e1f48',
          dark:    '#050d1f',
          mid:     '#1a3270',
          light:   '#2d4d9e',
          pale:    '#8899cc',
        },
        violet: {
          DEFAULT: '#8e31a4',
          dark:    '#3d1047',
          mid:     '#5e1f70',
          light:   '#b85fca',
          pale:    '#dba8e6',
        },
        coral: {
          DEFAULT: '#ff5757',
          dark:    '#8a1f1f',
          mid:     '#c43737',
          light:   '#ff8080',
          pale:    '#ffc2c2',
        },
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body:    ['Syne', 'sans-serif'],
      },
      animation: {
        'pulse-slow':  'pulseSlow 2s ease-in-out infinite',
        'wave':        'wave var(--dur, 1.4s) ease-in-out infinite',
        'scroll-line': 'scrollLine 2.2s ease-in-out infinite',
        'fade-up':     'fadeUp .8s ease both',
      },
      keyframes: {
        pulseSlow: { '0%,100%': { opacity: '.6' }, '50%': { opacity: '1' } },
        wave: {
          '0%,100%': { transform: 'scaleY(.15)', opacity: '.4' },
          '50%':      { transform: 'scaleY(1)',   opacity: '.9' },
        },
        scrollLine: {
          '0%,100%': { opacity: '.35', transform: 'scaleY(.85)' },
          '50%':      { opacity: '.85', transform: 'scaleY(1)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'galaxy-gradient': 'linear-gradient(135deg, #8e31a4 0%, #0e1f48 45%, #050d1f 100%)',
        'arm-a':  'linear-gradient(135deg,#1a3270 0%,#3d1047 60%,#050d1f 100%)',
        'arm-b':  'linear-gradient(135deg,#8a1f1f 0%,#3d1047 60%,#050d1f 100%)',
        'arm-c':  'linear-gradient(135deg,#0e1f48 0%,#1a3270 50%,#2d4d9e 100%)',
        'arm-d':  'linear-gradient(135deg,#1a3270 0%,#5e1f70 70%,#050d1f 100%)',
        'arm-e':  'linear-gradient(135deg,#0e1f48 0%,#3d1047 40%,#8a1f1f 100%)',
      },
    },
  },
  plugins: [],
}
