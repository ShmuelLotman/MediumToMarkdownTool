const mediumToMarkdown = require('medium-to-markdown');
const fs = require('fs')

const fileUrl = process.argv[2]
const destination = process.argv[3]
// Enter url here
mediumToMarkdown.convertFromUrl(fileUrl)
  .then(function (markdown) {
    console.log(markdown);
    fs.writeFile(`/Users/shmuellotman/Desktop/BlogPosts/${destination}`, markdown, err => {
      if (err) throw err;
      console.log('saved')
    })
  });

