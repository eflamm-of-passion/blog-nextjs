module.exports = {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontSize: {
          'sizeable': '12rem',
          'giant': '14rem',
          'enormous': '17rem',
          'gargantua': '24rem'
        },
        dropShadow: {
          'white': [
              '0px 0px 1px rgba(255, 255, 255, 0.3)',
          ]
        },
      }
    }
  };
  