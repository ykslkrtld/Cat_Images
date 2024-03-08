const button = document.querySelector(".btn")
const clock = document.getElementById("time")
const loadingDiv = document.querySelector(".loading")
const containerDiv = document.querySelector(".container")


window.onload = () =>{
    setTimeout(() => {
        loadingDiv.style.display = "none"
        containerDiv.classList.remove("d-none")
        containerDiv.classList.add("d-flex")
      }, 3000)

      setInterval(showTime, 1000);
}

const showTime = () => {
  let date = new Date();
  clock.textContent = date.toLocaleString(); 
}


const randomCat = async () => {
  try {
  const res = await fetch("https://api.thecatapi.com/v1/images/search?limit=10")
  if(!res.ok){
    throw new Error(`${res.status}`)
  }
  const data = await res.json()
  displayCats(data)

  } catch (error) {
    const catImg = document.querySelector(".pictures")
    catImg.innerHTML = `<img src="./img/error.gif" class="w-100 h-100">`
  }
}

const displayCats = (item) => {

  const catImg = document.querySelector(".pictures")
  item.forEach(({url}) => {
      catImg.innerHTML += `
    <div class="col-12 col-sm-6 col-lg-4 mb-3">
      <div style="height:200px;">
        <img src="${url}" class="w-100 h-100 rounded-4">
      </div>
    </div>
      `
  });
}

randomCat()

button.addEventListener("click", () => {
  const catImg = document.querySelector(".pictures")
  catImg.innerHTML = ""
  randomCat()
})