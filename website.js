const article = document.querySelectorAll('.article');
const article_shell = document.getElementById("article_shell");

async function link_articles() {
    article.forEach(element => {
        element.addEventListener('click', async function() {
            console.log(element.value);
    
            localStorage.setItem('currentArticle', element.value); //This is done to pass the article information to the article website
    
            window.location.href = 'article.html';
        })    
    });
}

//Function checks database for articles and then populates the screen for how much articles there are.  
async function pop_articles() {
    const url = "http://localhost:3000/GetAll";
        console.log(url);
    $.getJSON(url, async function(result) {

        //Sort by the createAt date to put the latest first
        result.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        const article_box = document.getElementById("article_box");
        result.forEach(function(item, index){
            var btn = document.createElement("BUTTON");
                btn.class = "article";
            btn.textContent = item.title;
            article_box.append(btn);

            btn.addEventListener('click', async function() {
                console.log(btn.value);
        
                localStorage.setItem('currentArticle', JSON.stringify(item)); //This is done to pass the article information to the article website
        
                window.location.href = 'article.html';
            })    
        })
    })
}
async function del_articles() {
    const article_box = document.getElementById("article_box");
    while (article_box.firstChild) {
        article_box.removeChild(article_box.firstChild);
    }
}

window.onload = function() {
    pop_articles();

    //link_articles();
}