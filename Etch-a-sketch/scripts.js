const container = document.querySelector("#container");
const resizeBtn = document.querySelector("#resizeBtn");

function createGrid(size) {
    // Remove the old grid
    container.innerHTML = "";

    // Calculate the size of each square
    const squareSize = 960 / size;

    // Create size × size squares
    for (let i = 0; i < size * size; i++) {
        const square = document.createElement("div");

        square.classList.add("square");

        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;

        // Change color when mouse enters
        square.addEventListener("mouseenter", function () {
            square.style.backgroundColor = "black";
        });

        container.appendChild(square);
    }
}

// Create the initial 16 × 16 grid
createGrid(16);

// Ask for a new grid size
resizeBtn.addEventListener("click", function () {
    let size = prompt("Enter the number of squares per side (1-100):");

    // Cancel pressed
    if (size === null) {
        return;
    }

    size = Number(size);

    // Check if the input is valid
    if (size >= 1 && size <= 100) {
        createGrid(size);
    } else {
        alert("Please enter a number between 1 and 100.");
    }
});