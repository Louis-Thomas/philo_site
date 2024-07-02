window.onload = function() {
    //retrieving article information
    const articleString = localStorage.getItem('currentArticle');

    const article_info = JSON.parse(articleString);
        console.log(article_info)
        updateElements(article_info);
        ArticlePopulator(article_info);

}

// Update Headers
function updateElements(article_info) {
    // Selecting the elements by ID
    const titleElement = document.getElementById('dynamicTitle');
    const nameElement = document.getElementById('dynamicName');

    // Setting new values
    const newTitle = article_info.title;
    var newName;
    if((article_info.author).length > 1) 
        {newName = "Authors: " + article_info.author.join(", ");}
    else { newName = "Author: " + article_info.author}

    // Updating the elements
    titleElement.textContent = newTitle;
    nameElement.textContent = newName;
}

function ArticlePopulator(article_info) {
    console.log(article_info.title + " clicked. Looking for: " + article_info.location);
    const pdfPath = 'http://localhost:3000/pdfs/sample.pdf'; // Adjust the path to your PDF file
    const article_frame = document.createElement('iframe');

    fetch(pdfPath)
      .then(response => response.blob())
      .then(blob => {
            const objectUrl = URL.createObjectURL(blob);
            article_frame.src = objectUrl;

            article_shell.append(article_frame)
        })
      .catch(error => console.error('Error fetching PDF:', error));
    
    article_frame.style = "width: 70%; height: 700px; border: none;";
}
