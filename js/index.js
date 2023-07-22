document.addEventListener("DOMContentLoaded", function(){
    const userList = document.querySelector('#user-list')
    const form = document.querySelector("#github-form")
    const searchBar = document.querySelector("#search")
    const repoList = document.querySelector("#repos-list")
    form.addEventListener("submit", function(e){
        e.preventDefault()
        const searchTerm = searchBar.value
        async function userSearch(URL = "", data = {}) {
            terms = searchTerm
            const response = await fetch (`https://api.github.com/search/users?q=${terms}`,{
                header: {Accept: "application/vnd.github.v3+json"}
            });
        return data = await response.json();
        }

        userSearch(searchTerm)
        .then((data) => {
            for (user of data.items) {
                const userName = user.login
                const userNameLi = document.createElement("li")
                userList.appendChild(userNameLi).innerText = userName
                userNameLi.addEventListener("click", function(e) {
                    async function userRepoSearch(URL2 = "", data2 = {}) {
                        terms2 = e.target
                        const response2 = await fetch (`https://api.github.com/users/${terms}/repos`,{
                            header: {Accept: "application/vnd.github.v3+json"}
                        });
                    return data2 = await response2.json();
                    }
                
                userRepoSearch(userName)
                .then((data) => {
                    for (repo of data) {
                    console.log(repo.name)
                    const repoName = repo.name
                    const repoLi = document.createElement("li")
                    repoList.appendChild(repoLi).innerText = repoName
                    }
                })
                })
            }
        })
    });
})