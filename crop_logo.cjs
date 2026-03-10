const sharp = require('sharp')
const inputPath =
  'C:\\Users\\Wiola_Siem\\.gemini\\antigravity\\brain\\eb3f1e3e-fb8d-4ce7-8794-0d5fa7a65d53\\media__1773177743280.png'

async function process() {
  const meta = await sharp(inputPath).metadata()
  console.log('Meta:', meta.width, meta.height)

  // Ręczne, twarde wycięcie bez funkcji trim (która wywoływała błąd z pustym obszarem)
  const left = Math.floor(meta.width * 0.1)
  const top = Math.floor(meta.height * 0.6) // Zakładam, że napis jest niżej
  const width = Math.floor(meta.width * 0.8)
  const height = meta.height - top

  try {
    await sharp(inputPath)
      .extract({ left, top, width, height })
      // Usunięto wadliwy .trim()
      .toFile('c:\\Users\\Wiola_Siem\\Desktop\\Dawid\\dev\\BeeBlossomApp\\public\\logo_text.png')
    console.log('Sukces przycinania tekstu!')
  } catch (e) {
    console.log('Błąd:', e.message)
  }
}
process()
