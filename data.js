const themeData = [
    {
        image: "https://img.freepik.com/free-vector/space-game-background-neon-night-alien-landscape_107791-1624.jpg?size=626&ext=jpg",
        wall: {
            image:"Images/wall2.png",
            width: 30,
        }
    },
    {
        image: "https://img.freepik.com/free-vector/space-game-level-background-with-platforms_107791-3660.jpg?size=626&ext=jpg",
        wall: {
            image:"Images/wall1.png",
            width: 40,
        }
    },
    {
        image: "https://img.freepik.com/free-vector/alien-planet-landscape-cosmic-background-deserted-coastline-with-mountains-view-glowing-cleft-stars-shining-spheres-space-extraterrestrial-pc-game-backdrop-cartoon-vector-illustration_107791-8012.jpg?size=626&ext=jpg",
        wall: {
            image:"Images/wall2.png",
            width: 20,
        }
    },
    {
        image: "https://img.freepik.com/free-vector/game-level-landscape-african-desert-with-oasis_107791-14535.jpg?size=626&ext=jpg",
        wall: {
            image:"Images/wall4.png",
            width: 60,
        }
    },
    {
        image: "https://img.freepik.com/free-vector/mountain-landscape-nature-view-with-rock-peaks_107791-14262.jpg?size=626&ext=jpg",
        wall: {
            image:"Images/wall5.png",
            width: 50,
        },
    },
    {
        image: "https://static.vecteezy.com/system/resources/previews/007/357/531/non_2x/alien-planet-game-background-free-vector.jpg",
        wall: {
            image:"Images/wall2.png",
            width: 20,
        }
    },
    {
        image: "https://static.vecteezy.com/system/resources/previews/000/524/720/non_2x/fantasy-wide-sci-fi-martian-background-for-ui-game-vector.jpg",
        wall: {
            image:"Images/wall2.png",
            width: 20,
        }
    },
    {
        image: "https://img.freepik.com/free-vector/cartoon-nature-landscape-dirt-road-go-along-field_107791-11650.jpg?size=626&ext=jpg",
        wall: {
            image:"Images/wall8.png",
            width: 60,
        }
    }
];

const ballData = [
    "Images/ball1.png",
    "Images/ball2.png",
    "Images/ball3.png",
    "Images/ball4.png",
    "Images/ball5.png",
    "Images/ball6.png"
];

const selected = {
    Ball: localStorage.getItem("selectedBall") || 0,
    Theme: localStorage.getItem("selectedTheme") || 0
};