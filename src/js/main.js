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
  const limitedText = document.querySelectorAll(`.js-limited-text`)
  const addBlocks = document.querySelectorAll(`.add-block`)

  addBlocks.forEach((element) => {
    element.addEventListener(`click`, (event) => createBlock(event))
  })

  function createBlock(event) {
    const curBlock = event.target.closest(`.add-block`)
    const blockName = curBlock.querySelector(`.add-block__title`).innerHTML

    const textHtml = `
      <div class="page-inner__box page-box">
            <h2 class="page-box__title">${blockName}</h2>
            <div class="page-box__container">
              <div class="field-box">
                <div class="field-box__header">
                  <p class="field-box__title">Редактор абзаца</p>
                  <div class="field-box__help">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                      <path class="cls-1" d="M32,64A32,32,0,1,1,64,32,32,32,0,0,1,32,64ZM32,5.33A26.67,26.67,0,1,0,58.67,32,26.71,26.71,0,0,0,32,5.33Z"></path><path class="cls-1" d="M32,45.33a2.67,2.67,0,0,1-2.67-2.66,14.1,14.1,0,0,1,6.9-11.88,8,8,0,0,0,3.55-8.71A8,8,0,0,0,24,24a2.67,2.67,0,1,1-5.33,0,13.29,13.29,0,0,1,5-10.43A13.43,13.43,0,0,1,35.11,11a13.34,13.34,0,0,1,4,24.3,8.78,8.78,0,0,0-4.39,7.35A2.67,2.67,0,0,1,32,45.33Z"></path><circle class="cls-1" cx="32" cy="50.67" r="2.67"></circle>
                    </svg>
                    <div class="field-box__prompt">
                      <ul>
                        <li>
                          Заголовок должен быть кратким, не более 100 символов;
                        </li>
                        <li>
                          Сообщите в заголовке только самую важную для
                          покупателя информацию о товаре.
                        </li>
                      </ul>
                      <p>Lorem ipsum dolor sit amet.</p>
                    </div>
                  </div>
                </div>
                <div class="field-box__field-wrap">
                  <textarea type="text" class="field-box__field field-box__field--subtitle js-limited-text" name="" id="" cols="30" rows="10">Украшения, которые создают богатую палитру незабываемых эмоций</textarea>
                </div>
              </div>
            </div>
          </div>
    `
    curBlock.closest(`.page-box`).insertAdjacentHTML(`beforebegin`, textHtml)
  }

  limitedText.forEach((element) => {
    element.addEventListener(`change`, (event) => checkLimitText(event))
  })

  function checkLimitText(event) {
    const field = event.target
    const lengthText = field.value.length
    if (!(lengthText > 19 && lengthText < 101)) {
      field.closest(`.field-box__field-wrap`).classList.add(`warning`)
    } else {
      field.closest(`.field-box__field-wrap`).classList.remove(`warning`)
    }
  }

  function validFileType(file) {
    for (let i = 0; i < fileTypes.length; i++) {
      if (file.type === fileTypes[i]) {
        return true
      }
    }
    return false
  }

  uploadInputs.forEach((element) => {
    element.addEventListener(`change`, (event) => updateImageDisplay(event))
  })

  function updateImageDisplay(event) {
    const preview = event.target.closest(`.upload-box`).querySelector(`.upload-box__preview`)

    while (preview.firstChild) {
      preview.removeChild(preview.firstChild)
    }
    const curFiles = event.target.files

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
          if (preview.querySelector(`img`).width < 820) {
            para.textContent = `Размер данного изображения менее 820 px по горизонтали.`
            preview.appendChild(para)
          }
        } else {
          para.textContent = `: Некорректный тип файла.`
          preview.appendChild(para)
        }
      }
    }
  }
})
