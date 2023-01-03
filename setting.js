window.addEventListener("DOMContentLoaded", () => {
    const themes = document.querySelector(".themes");
    const balls = document.querySelector(".balls");

    themeData.forEach((theme, index) => {
        const themeEle = document.createElement("div");
        themeEle.innerHTML = `
        <div class="img-area flex column">
            <img src="${theme.image}" alt="${theme.name}">
        </div>`;

        themeEle.classList.add("theme", "flex", "column");
        if (index == selected.Theme) themeEle.classList.add("selected");

        themes.appendChild(themeEle);

        const ThemeBtns = themes.querySelectorAll(".img-area");
        clickStorage(ThemeBtns, "theme");
    });

    ballData.forEach((ball, index) => {
        const ballEle = document.createElement("div");
        ballEle.innerHTML = `<img src="${ball}" alt="">`;

        ballEle.classList.add("ball", "flex");
        if (index == selected.Ball) ballEle.classList.add("selected");

        balls.appendChild(ballEle);

        const BallsBtns = balls.querySelectorAll("img");
        clickStorage(BallsBtns, "ball");
    });

    function clickStorage(buttons, type) {
        buttons.forEach((button, index) => {
            button.onclick = () => {
                (type == "ball")
                    ? localStorage.setItem("selectedBall", index)
                    : localStorage.setItem("selectedTheme", index);
                location.reload();
            }
        })
    }
})