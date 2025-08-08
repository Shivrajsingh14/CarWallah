
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				carwala: {
					yellow: 'hsl(var(--carwala-yellow))',
					black: 'hsl(var(--carwala-black))',
					white: 'hsl(var(--carwala-white))',
					gold: 'hsl(var(--carwala-gold))',
					'dark-gray': 'hsl(var(--carwala-dark-gray))',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in-right': {
					'0%': {
						transform: 'translateX(100%)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateX(0)',
						opacity: '1'
					}
				},
				'car-drive': {
					'0%': {
						transform: 'translateX(-200px) scale(0.8)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateX(0) scale(1)',
						opacity: '1'
					}
				},
				'road-scroll': {
					'0%': {
						transform: 'translateY(-50%)'
					},
					'100%': {
						transform: 'translateY(0)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-20px)'
					}
				},
				'drift': {
					'0%': {
						transform: 'translate(0, 0) rotate(0deg)'
					},
					'25%': {
						transform: 'translate(10px, -10px) rotate(5deg)'
					},
					'50%': {
						transform: 'translate(0, -20px) rotate(0deg)'
					},
					'75%': {
						transform: 'translate(-10px, -10px) rotate(-5deg)'
					},
					'100%': {
						transform: 'translate(0, 0) rotate(0deg)'
					}
				},
				'sparkle': {
					'0%, 100%': {
						opacity: 0.2,
						transform: 'scale(1)'
					},
					'50%': {
						opacity: 1,
						transform: 'scale(1.5)'
					}
				},				'pulse-grow': {
					'0%, 100%': {
						opacity: 0.3,
						transform: 'scale(1)'
					},
					'50%': {
						opacity: 0.7,
						transform: 'scale(1.5)'
					}
				},
				'float-1': {
					'0%, 100%': {
						transform: 'translate(0, 0)'
					},
					'25%': {
						transform: 'translate(10px, 10px)'
					},
					'50%': {
						transform: 'translate(15px, 0)'
					},
					'75%': {
						transform: 'translate(5px, 15px)'
					}
				},
				'float-2': {
					'0%, 100%': {
						transform: 'translate(0, 0)'
					},
					'25%': {
						transform: 'translate(-10px, 10px)'
					},
					'50%': {
						transform: 'translate(-15px, 0)'
					},
					'75%': {
						transform: 'translate(-5px, -15px)'
					}
				},
				'float-3': {
					'0%, 100%': {
						transform: 'translate(0, 0) rotate(0deg)'
					},
					'25%': {
						transform: 'translate(10px, 10px) rotate(5deg)'
					},
					'50%': {
						transform: 'translate(0, 15px) rotate(0deg)'
					},
					'75%': {
						transform: 'translate(-10px, 5px) rotate(-5deg)'
					}
				},
				'spin-slow': {
					'0%': {
						transform: 'rotate(0deg)'
					},
					'100%': {
						transform: 'rotate(360deg)'
					}
				},
				'pulse-slow': {
					'0%, 100%': {
						opacity: 0.3,
						transform: 'scale(1)'
					},
					'50%': {
						opacity: 0.6,
						transform: 'scale(1.2)'
					}
				}
			},			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'slide-in-right': 'slide-in-right 0.8s ease-out',
				'car-drive': 'car-drive 1.5s ease-out',
				'road-scroll': 'road-scroll 2s linear infinite',				'float': 'float 6s ease-in-out infinite',
				'drift': 'drift 10s ease-in-out infinite',
				'sparkle': 'sparkle 3s ease-in-out infinite',
				'pulse-grow': 'pulse-grow 4s ease-in-out infinite',
				'float-1': 'float-1 8s ease-in-out infinite',
				'float-2': 'float-2 10s ease-in-out infinite',
				'float-3': 'float-3 12s ease-in-out infinite',
				'spin-slow': 'spin-slow 20s linear infinite',
				'pulse-slow': 'pulse-slow 5s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
