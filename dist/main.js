
$("button").on("click", function () {
    const search = $("#search-box")
    const input = search.val().toLowerCase()
    $.get(`/teams/${input}`, function (playersData) {
        setTemplate(playersData)
        $("img").on('error',function () {
            this.src="./default.png"
        })
    })
    search.val("")
})



function setTemplate(players) {
    const htmlTemp = $("#search-template")
    const source = htmlTemp.html()
    console.log(source);

    const template = Handlebars.compile(source);
    const newHtml = $(".search_container")
    newHtml.empty()
    newHtml.append(template({ players: players }))
}


