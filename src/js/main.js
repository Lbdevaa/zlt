import $ from '../local_modules/jquery/dist/jquery.min'
import FroalaEditor from '../libs/froala/froala_editor.pkgd.min.js'
$(document).ready(() => {
  // eslint-disable-next-line no-console

})

document.addEventListener(`DOMContentLoaded`, () => {
  let paragraphField = `.field-box__field--paragraph`

  if (document.querySelector(paragraphField)) {
    FroalaEditor(paragraphField, {
      toolbarButtons: [`help`, `bold`, `italic`, `insertLink`],
      quickInsertTags: []
    })
  }

  const uploadInputs = document.querySelectorAll(`.upload-box__input`)
  const fileTypes = [
    `image/jpeg`,
    `image/pjpeg`,
    `image/png`
  ]
  const limitedText = document.querySelectorAll(`.js-limited-text`)
  const addBlocks = document.querySelectorAll(`.add-block`)
  let delBlockBtns = document.querySelectorAll(`.del-block`)

  delBlockBtns.forEach((element) => {
    element.addEventListener(`click`, (event) => deleteBlock(event))
  })

  function deleteBlock(event) {
    const curBlock = event.target.closest(`.page-box`)
    curBlock.remove()
  }

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
          <div class="field-box field-box--paragraph">
            <div class="field-box__header">
              <p class="field-box__title">Редактор абзаца</p>
              <div class="field-box__help">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                  <path class="cls-1" d="M32,64A32,32,0,1,1,64,32,32,32,0,0,1,32,64ZM32,5.33A26.67,26.67,0,1,0,58.67,32,26.71,26.71,0,0,0,32,5.33Z"/><path class="cls-1" d="M32,45.33a2.67,2.67,0,0,1-2.67-2.66,14.1,14.1,0,0,1,6.9-11.88,8,8,0,0,0,3.55-8.71A8,8,0,0,0,24,24a2.67,2.67,0,1,1-5.33,0,13.29,13.29,0,0,1,5-10.43A13.43,13.43,0,0,1,35.11,11a13.34,13.34,0,0,1,4,24.3,8.78,8.78,0,0,0-4.39,7.35A2.67,2.67,0,0,1,32,45.33Z"/><circle class="cls-1" cx="32" cy="50.67" r="2.67"/>
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
            <div class="field-box__field-wrap field-box__field-wrap--paragraph field-box__field-wrap--border-none">
                <div class="field-box__field field-box__field--paragraph" >

                </div>
            </div>
          </div>
          <div class="page-box__control">
            <div class="move-block">
              <div class="move-block__up">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#bcbcbc" class="bi bi-chevron-up" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                </svg>
              </div>
              <div class="move-block__down">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#bcbcbc" class="bi bi-chevron-down" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                </svg>
              </div>
            </div>
            <div class="del-block">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#572c5f" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    `
    curBlock.closest(`.page-box`).insertAdjacentHTML(`beforebegin`, textHtml)
    updateBtnsArray()
  }

  function updateBtnsArray() {
    delBlockBtns = document.querySelectorAll(`.del-block`)

    delBlockBtns.forEach((element) => {
      element.addEventListener(`click`, (event) => deleteBlock(event))
    })
    paragraphField = `.field-box__field--paragraph`

    if (document.querySelector(paragraphField)) {
      FroalaEditor(paragraphField, {
        toolbarButtons: [`help`, `bold`, `italic`, `insertLink`],
        quickInsertTags: []
      },
      )
    }
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
