import $ from '../local_modules/jquery/dist/jquery.min'
$(document).ready(() => {
  // eslint-disable-next-line no-console
})

document.addEventListener(`DOMContentLoaded`, () => {

  const uploadInputs = document.querySelectorAll(`.upload-box__input`)
  const fileTypes = [
    `image/jpeg`,
    `image/pjpeg`,
    `image/png`
  ]

  function validFileType(file) {
    for (let i = 0; i < fileTypes.length; i++) {
      if (file.type === fileTypes[i]) {
        return true
      }
    }
    return false
  }

  uploadInputs.forEach((element) => {
    element.addEventListener(`change`, updateImageDisplay)
  })

  function updateImageDisplay() {
    // eslint-disable-next-line no-invalid-this
    const preview = this.closest(`.upload-box`).querySelector(`.upload-box__preview`)

    while (preview.firstChild) {
      preview.removeChild(preview.firstChild)
    }
    // eslint-disable-next-line no-invalid-this
    const curFiles = this.files

    if (curFiles.length === 0) {
      const para = document.createElement(`p`)
      para.textContent = `Файл не выбран`
      preview.appendChild(para)
    } else {
      for (let i = 0; i < curFiles.length; i++) {
        const para = document.createElement(`p`)
        if (validFileType(curFiles[i])) {
          const image = document.createElement(`img`)
          image.src = window.URL.createObjectURL(curFiles[i])
          preview.appendChild(image)
        } else {
          para.textContent = `: Некорректный тип файла.`
          preview.appendChild(para)
        }
        // preview.appendChild()
      }
    }
  }
})
