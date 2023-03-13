module.exports = {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        // https://coolors.co/000000-000c0e-fde047-d946ef-eaf47c
        fontSize: {
          'sizeable': '10rem',
          'giant': '14rem'
        },
        colors: {
          primary: {
            DEFAULT: '#FDE047'
          },
          primaryGradient: {
            DEFAULT: '#d946ef'
          },
          secondary: {
            DEFAULT: '#EAF47C'
          },
          third: {
            DEFAULT: '#000'            
          },
          thirdGradient: {
            DEFAULT: '#000C0E'            
          },
          disabled: "gray"
        },
      },
    }
  };
  