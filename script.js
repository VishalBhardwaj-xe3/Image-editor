let filters = {
  Brightness: {
    value: 100,
    min: 0,
        max: 200,
    unit: "%",
  },
  Contrast: {
    value: 100,
    min: 0,
      max: 200,
    unit: "%",
  },
//   Exposure: {
//     value: 100,
//     min: 0,
//       max: 200,
//     unit: "%",
//   },
  Saturation: {
    value: 100,
    min: 0,
      max: 200,
    unit: "%",
  },
    HueRotation: {
    value: 0,
    min: 0,
    max: 360,
    unit: "deg",
  },
    Blur: {
    value: 0,
    min: 0,
        max: 20,
    unit: "px",
  },
    Grayscale: {
    value: 0,
    min: 0,
        max: 100,
    unit: "%",
  },
    Sepia: {
    value: 0,
    min: 0,
        max: 100,
    unit: "%",
  },
    Opacity: {
    value: 100,
    min: 0,
        max: 100,
    unit: "%",
  },
  Invert: {
    value: 0,
    min: 0,
      max: 100,
    unit: "%",
  },
};

const imageCanvas = document.querySelector("#image-canvas")

const imageInput = document.querySelector("#image-input");

const canvasCtx = imageCanvas.getContext("2d")

const filterContainers = document.querySelector(".filters")

const resetBtn = document.querySelector("#reset-btn")

const downBtn = document.querySelector("#download-btn")

const presetsContainer = document.querySelector(".presets")

let file = null

let image = null

function craeteFilterElement(name, unit = "%", value, min, max) {
    const div = document.createElement("div");
    div.classList.add("filter")

    const input = document.createElement("input")
    input.type = "range"
    input.min = min
    input.max = max
    input.value = value
    input.id = name

    const p = document.createElement("p")
    p.innerText = name

    div.appendChild(p)
    div.appendChild(input)

    input.addEventListener("input", (event) => {
        filters[name].value = input.value
        applyFilters();
    })

    

    return div
}

function createFilter() {
      Object.keys(filters).forEach(filter => {
        // console.log(filters[filter]);
        const filetrElement = craeteFilterElement(
            filter,
            filters[filter].unit,
            filters[filter].value,
            filters[filter].min,
            filters[filter].max,
        );

        filterContainers.appendChild(filetrElement);
    
    })
}

createFilter()

imageInput.addEventListener("change", (event) => {
    const file = event.target.files[0]
    const imagePlaceholder = document.querySelector(".placeholder")
    imageCanvas.style.display = "block"

    imagePlaceholder.style.display = "none"

    // console.log(file);
    

    const img = new Image()
    img.src = URL.createObjectURL(file)

    img.onload = () => {
        image = img
        imageCanvas.width = img.width
        imageCanvas.height = img.height
        canvasCtx.drawImage(img, 0, 0)
    }
})

function applyFilters() {
    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height)
    canvasCtx.filter =
        `brightness(${filters.Brightness.value}${filters.Brightness.unit})`
        + `contrast(${filters.Contrast.value}${filters.Contrast.unit})`
        + `hue-rotate(${filters.HueRotation.value}${filters.HueRotation.unit})`
        + `saturate(${filters.Saturation.value}${filters.Saturation.unit})`
        + `blur(${filters.Blur.value}${filters.Blur.unit})`
        + `grayscale(${filters.Grayscale.value}${filters.Grayscale.unit})`
        + `sepia(${filters.Sepia.value}${filters.Sepia.unit})`
        + `opacity(${filters.Opacity.value}${filters.Opacity.unit})`
        + `invert(${filters.Invert.value}${filters.Invert.unit})`
        .trim()
    canvasCtx.drawImage(image, 0,0)
}

resetBtn.addEventListener("click", () => {
    filters = {
      Brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
      },
      Contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
      },
      //   Exposure: {
      //     value: 100,
      //     min: 0,
      //       max: 200,
      //     unit: "%",
      //   },
      Saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
      },
      HueRotation: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg",
      },
      Blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: "px",
      },
      Grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
      },
      Sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
      },
      Opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%",
      },
      Invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
      },
    };
    applyFilters()
    filterContainers.innerHTML = ""
    createFilter()
})

downBtn.addEventListener("click", () => {
    const link = document.createElement("a")
    link.download = "edited-image.png"
    link.href = imageCanvas.toDataURL()
    link.click()
})

const presets = {
  Normal: {
    Brightness: 100,
    Contrast: 100,
    Saturation: 100,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },

  Drama: {
    Brightness: 90,
    Contrast: 150,
    Saturation: 120,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 10,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },

  Vintage: {
    Brightness: 105,
    Contrast: 90,
    Saturation: 85,
    HueRotation: 10,
    Blur: 0,
    Grayscale: 15,
    Sepia: 40,
    Opacity: 100,
    Invert: 0,
  },

  OldSchool: {
    Brightness: 95,
    Contrast: 85,
    Saturation: 70,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 35,
    Sepia: 60,
    Opacity: 100,
    Invert: 0,
  },

  Cinematic: {
    Brightness: 95,
    Contrast: 130,
    Saturation: 110,
    HueRotation: 350,
    Blur: 0,
    Grayscale: 0,
    Sepia: 10,
    Opacity: 100,
    Invert: 0,
  },

  CoolTone: {
    Brightness: 100,
    Contrast: 110,
    Saturation: 105,
    HueRotation: 200,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },

  WarmGlow: {
    Brightness: 110,
    Contrast: 105,
    Saturation: 115,
    HueRotation: 15,
    Blur: 0,
    Grayscale: 0,
    Sepia: 25,
    Opacity: 100,
    Invert: 0,
  },

  Fade: {
    Brightness: 110,
    Contrast: 80,
    Saturation: 90,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 10,
    Sepia: 20,
    Opacity: 90,
    Invert: 0,
  },

  Noir: {
    Brightness: 90,
    Contrast: 140,
    Saturation: 0,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 100,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },

  Dreamy: {
    Brightness: 115,
    Contrast: 90,
    Saturation: 110,
    HueRotation: 300,
    Blur: 3,
    Grayscale: 0,
    Sepia: 10,
    Opacity: 95,
    Invert: 0,
  },

  HighKey: {
    Brightness: 130,
    Contrast: 110,
    Saturation: 105,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },

  Negative: {
    Brightness: 100,
    Contrast: 100,
    Saturation: 100,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 100,
  },
};

Object.keys(presets).forEach(presetName => {
    const presetBtn = document.createElement("button")
    presetBtn.classList.add("btn")
    presetBtn.innerHTML = presetName
    presetsContainer.appendChild(presetBtn)
    

    presetBtn.addEventListener("click", () => {
        const preset = presets[presetName]

        Object.keys(preset).forEach(filtername => {
            filters[filtername].value = preset[filtername]
        })

        applyFilters()
        filterContainers.innerHTML = ""
        createFilter()
    })
})