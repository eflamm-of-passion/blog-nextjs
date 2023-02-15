# Development

This document describe various information about how the project is implemented.

## TODO

- env to store path of browser
-

## Architecture choices

### Print the resume

The choice was made to implement the visual of the resume using HTML, so I chose to do it with React, as it would be easy to inject data in it (and this is what I use regularly, so I know how it works).  
I first tried to implement a printable page (with CSS properties) displayed on the user browser. But then I thought the resume would be displayed differently according to the user's browser. So I thought it would be more robust to print it on the server side using the NextJS functions.  
This is why I came to use ReactDOMServer to generate the HTML. I would then use Puppeteer to launch a headless browser on the server side, and print a pdf out of the web page.  
But as Netlify is using AWS functions, the size of the browser embedded in Puppeteer is higher than the limitation. So I had to use the package chrome-aws-lambda to use instead a lightweight browser. As a side note I have to use my own browser when I'm developping.

To download the Material UI icons I used this link https://fonts.google.com/icons?selected=Material+Icons. I couldn't load the icons using a library beacause it took too much resources to the function.
