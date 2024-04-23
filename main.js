let mainContainer = document.getElementById("main-container");
let addGridBtn = document.getElementById("add-grid-btn");
let generateGridBtn = document.getElementById("generate-grid-btn");
let addGridForm = document.getElementById("add-grid-form");
let grids = [];
let gridItems = [];

addGridBtn.addEventListener("click", function() {
	if (addGridForm.classList.contains("hidden")) {
		showAddGridForm();
	  } else {
		hideAddGridForm();
	  }
});

generateGridBtn.addEventListener("click", function() {
	generateGrid();
});

generateDeveloperConsole()


function generateGrid() {
    let gridX = document.getElementById("grid-x").value;
    let gridY = document.getElementById("grid-y").value;
    let gridContainer = document.createElement("div");
    gridContainer.classList.add("grid-container");
    
    for(let i = 0; i < gridY; i++) {
        let lineContainer = document.createElement("div");
        lineContainer.classList.add("line-container");
        
        for (let j = 0; j < gridX; j++) {
            let gridItem = document.createElement("div");
            gridItem.classList.add("grid-item");
            let itemId = i * gridX + j;
			let itemObj = {
				itemId: itemId,
				Title: "",
				Url: "",
				Shape: "empty"
			};
			gridItem.classList.add("empty"); /////////////////////////////////////
			gridItem.dataset.DefaultShape = itemObj.Shape;

			gridItem.addEventListener("click", function(event) {
				let activeElement = document.querySelector(".active");
				if (activeElement) {
				  activeElement.classList.remove("active");
				}
				event.target.classList.add("active");
			  
				let Shape = event.target.dataset.Shape;
				let titleInput = document.querySelector(".dc-el-title input");
				let urlInput = document.querySelector(".dc-el-url input");
				let shapeInputs = document.querySelectorAll(".dc-el-shape input");
			  
				if (Shape === "empty") {
				  disableInputs();
				} else if (Shape === "circle") {
				  titleInput.disabled = true;
				  urlInput.disabled = false;
				} else if (Shape === "rectangle") {
				  titleInput.disabled = false;
				  urlInput.disabled = false;
				}
			  
				let Title = event.target.dataset.Title;
				let Url = event.target.dataset.Url;
			  
				titleInput.value = Title;
				urlInput.value = Url;
			  
				shapeInputs.forEach(function(input) {
				  if (input.value === Shape) {
					input.checked = true;
				  }
				});
			  
				if (!Shape) {
				  let defaultShape = event.target.dataset.DefaultShape;
				  shapeInputs.forEach(function(input) {
					if (input.value === defaultShape) {
					  input.checked = true;
					}
				  });
				  disableInputs();
				}
			});

            gridItem.innerHTML = itemId;
            gridItem.dataset.itemId = itemId;
			let gridItemTitleDiv = document.createElement("div");
			gridItemTitleDiv.innerText = "";
			gridItemTitleDiv.setAttribute("class", "inside-div");
			gridItem.appendChild(gridItemTitleDiv);
            gridItems.push(itemObj);
            lineContainer.appendChild(gridItem);
        }
        
        gridContainer.appendChild(lineContainer);
    }
    
    mainContainer.appendChild(gridContainer);
    grids.push(gridContainer);
    hideAddGridForm();
}

function hideAddGridForm() {
    addGridForm.classList.remove("visible");
    addGridForm.classList.add("hidden");
}

function showAddGridForm() {
    addGridForm.classList.add("visible");
    addGridForm.classList.remove("hidden");
}
/**Disable all inputs */
function disableInputs() {
	let titleInput = document.querySelector(".dc-el-title input");
	let urlInput = document.querySelector(".dc-el-url input");
	titleInput.disabled = true;
	urlInput.disabled = true;
  }

function createIdDiv(gridItem, id) {
    let idDiv = document.createElement("div");
    idDiv.innerText = "#" + id;
    gridItem.appendChild(idDiv);
}

function generateDeveloperConsole(){
    const developerConsole = document.createElement("div");
    developerConsole.className = "developer-console";
    
    const activeElement = document.createElement("div");
    activeElement.className = "dc-el-id";
    activeElement.textContent = "ACTIVE ELEMENT: ";
    developerConsole.appendChild(activeElement);

    createDcShapeDiv(developerConsole)
    createDcTitleDiv(developerConsole)
    createDcUrlDiv(developerConsole)
    
    document.body.appendChild(developerConsole);
}

function createDcUrlDiv(developerConsole) {
    const urlDiv = document.createElement("div");
    urlDiv.className = "dc-el-url";
    urlDiv.textContent = "URL: ";
    developerConsole.appendChild(urlDiv);

    const urlInput = document.createElement("input");
    urlInput.type = "text";
    urlInput.name = "input-el-url";
    urlInput.value = "Url";
    urlInput.className = "input";
    urlInput.addEventListener("blur", function() {
        if (this.value === "") {
            this.value = "Url";
        } else {
            let activeElement = document.querySelector(".active");
            activeElement.dataset.Url = this.value;
            let itemId = activeElement.dataset.itemId;
            let itemObj = gridItems.find(item => item.itemId == itemId);
            itemObj.Url = this.value;
        }
    });

    urlDiv.appendChild(urlInput);
}

function createDcTitleDiv(developerConsole) {
    const titleDiv = document.createElement("div");
    titleDiv.className = "dc-el-title";
    titleDiv.textContent = "TITLE: ";
    developerConsole.appendChild(titleDiv);

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.name = "input-el-title";
    titleInput.value = "Title";
    titleInput.className = "input";
    titleInput.addEventListener("blur", function() {
        if (this.value === "") {
            this.value = "Title";
        } else {
            let activeElement = document.querySelector(".active");
            activeElement.dataset.Title = this.value;
            let itemId = activeElement.dataset.itemId;
            let itemObj = gridItems.find(item => item.itemId == itemId);
            itemObj.Title = this.value;
			let gridItemTitleDiv = activeElement.querySelector(".inside-div");
			gridItemTitleDiv.innerText = this.value;
        }
    });

    titleDiv.appendChild(titleInput);
}

function createDcShapeDiv(developerConsole) {
	const shapeDiv = document.createElement("div");
	shapeDiv.className = "dc-el-shape";
	shapeDiv.textContent = "SHAPE: ";
	developerConsole.appendChild(shapeDiv);
  
	const rectangleInput = document.createElement("input");
	rectangleInput.type = "radio";
	rectangleInput.name = "shape";
	rectangleInput.value = "rectangle";
	rectangleInput.addEventListener("click", function(event) {
	  let activeElement = document.querySelector(".active");
	  if (activeElement) {
		activeElement.dataset.Shape = "rectangle";
		let itemId = activeElement.dataset.itemId;
		let itemObj = gridItems.find(item => item.itemId == itemId);
		itemObj.Shape = "rectangle";
		let titleInput = document.querySelector(".dc-el-title input");
		let urlInput = document.querySelector(".dc-el-url input");
		titleInput.disabled = false;
		urlInput.disabled = false;
		checkTitleVisibilityBasedOnShape(activeElement, itemObj);
		activeElement.classList.remove("circle"); // make this into a separate function for all three shapes
		activeElement.classList.remove("empty");
		activeElement.classList.add("rectangle");
	  }
	});
	shapeDiv.appendChild(rectangleInput);
  
	const rectangleLabel = document.createElement("label");
	rectangleLabel.textContent = "Rectangle";
	shapeDiv.appendChild(rectangleLabel);
  
	const circleInput = document.createElement("input");
	circleInput.type = "radio";
	circleInput.name = "shape";
	circleInput.value = "circle";
	circleInput.addEventListener("click", function(event) {
	  let activeElement = document.querySelector(".active");
	  if (activeElement) {
		activeElement.dataset.Shape = "circle";
		let itemId = activeElement.dataset.itemId;
		let itemObj = gridItems.find(item => item.itemId == itemId);
		itemObj.Shape = "circle";
		let titleInput = document.querySelector(".dc-el-title input");
		let urlInput = document.querySelector(".dc-el-url input");
		titleInput.disabled = true;
		urlInput.disabled = false;
		checkTitleVisibilityBasedOnShape(activeElement, itemObj);
		activeElement.classList.remove("rectangle");
		activeElement.classList.remove("empty");
		activeElement.classList.add("circle");
	  }
	});
	shapeDiv.appendChild(circleInput);
  
	const circleLabel = document.createElement("label");
	circleLabel.textContent = "Circle";
	shapeDiv.appendChild(circleLabel);
  
	const emptyInput = document.createElement("input");
	emptyInput.type = "radio";
	emptyInput.name = "shape";
	emptyInput.value = "empty";
	emptyInput.addEventListener("click", function(event) {
	  let activeElement = document.querySelector(".active");
	  if (activeElement) {
		activeElement.dataset.Shape = "empty";
		let itemId = activeElement.dataset.itemId;
		let itemObj = gridItems.find(item => item.itemId == itemId);
		itemObj.Shape = "empty";
		checkTitleVisibilityBasedOnShape(activeElement, itemObj);
		disableInputs();
		activeElement.classList.remove("circle");
		activeElement.classList.remove("rectangle");
		activeElement.classList.add("empty");
	  }
	});
	shapeDiv.appendChild(emptyInput);
  
	const emptyLabel = document.createElement("label");
	emptyLabel.textContent = "Empty";
	shapeDiv.appendChild(emptyLabel);
}
  
function checkTitleVisibilityBasedOnShape(activeElement, itemObj) {
	let gridItemTitleDiv = activeElement.querySelector(".inside-div");
	if (itemObj.Shape === "empty" || itemObj.Shape === "circle") {
	  	gridItemTitleDiv.style.display = "none";
	} else if (itemObj.Shape === "rectangle") {
	  	gridItemTitleDiv.style.display = "block";
	}
}

