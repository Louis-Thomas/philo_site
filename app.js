const article = document.querySelectorAll('.article');
const article_shell = document.getElementById("article_shell");

article.forEach(element => {
    element.addEventListener('click', async function() {
        console.log(element.value)
        var article_info = JSON.parse(element.value);
        console.log(article_info.title + " clicked. Looking for: " + article_info.location);

        //fetch article_file from server using element.value
        // try {
        //     const response = await fetch('http://localhost:3000/retrieve', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(article_info),
        //     });

        //     if (!response.ok) throw new Error(`HTTP error status: ${response.status}`);
            
        //     const blob = await response.blob();
        //     const url = URL.createObjectURL(blob);
        // } catch (error) {
        //     console.error('Failed to load PDF:', error);
        // }
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
    })    
});