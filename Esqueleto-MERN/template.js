/**
 * Para renderizar nosso Front-End precisamos do template em HTML.
 */

export default () => {
    return `<!doctype html>
      <html lang="en">
          <head>
             <meta charset="utf-8">
             <title>MERN Skeleton</title>
             <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
             <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
          </head>
          <body>
            <div id="root"></div>
            <script type="text/javascript" src="/dist/bundle.js"></script>
          </body>
      </html>`
}