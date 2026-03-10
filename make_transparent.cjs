const sharp = require('sharp')
const path = require('path')

async function processTransparent(input, output) {
  try {
    const { data, info } = await sharp(input)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })

    // Przyjmujemy pierwszy piksel (lewy górny róg) jako kolor tła, które chcemy usunąć
    const bgR = data[0]
    const bgG = data[1]
    const bgB = data[2]

    for (let i = 0; i < data.length; i += info.channels) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]

      // Zwiększona tolerancja (np. 20) by złapać też szumy kompresji i smugi widoczne jako koła
      const dist = Math.sqrt(Math.pow(r - bgR, 2) + Math.pow(g - bgG, 2) + Math.pow(b - bgB, 2))
      if (dist < 45) {
        // Tolerancja dla kremowych odcieni w logo
        data[i + 3] = 0 // Przezroczystość (Alpha)
      }
    }

    await sharp(data, {
      raw: { width: info.width, height: info.height, channels: info.channels },
    })
      .png()
      .toFile(output)
    console.log(`Zapisano ${output}`)
  } catch (e) {
    console.log(`Błąd w ${output}:`, e.message)
  }
}

async function main() {
  const dir = 'c:\\Users\\Wiola_Siem\\Desktop\\Dawid\\dev\\BeeBlossomApp\\public'
  await processTransparent(path.join(dir, 'logo.png'), path.join(dir, 'logo_transparent.png'))
  await processTransparent(
    path.join(dir, 'logo_text.png'),
    path.join(dir, 'logo_text_transparent.png')
  )
  // Skrypt inwertujący samo logo footer by stało się białe

  // Oprócz bycia przezroczystym, footer_logo musi być BIAŁE (bo brązowy napis na brązowym tle zniknie)
  // Przejdziemy też przez pixels i zamienimy ciemny brąz na biały!
  try {
    const { data, info } = await sharp(path.join(dir, 'logo_transparent.png'))
      .raw()
      .toBuffer({ resolveWithObject: true })

    for (let i = 0; i < data.length; i += info.channels) {
      if (data[i + 3] > 0) {
        // jeśli nie jest przezroczyste
        // to pokoloruj na biało
        data[i] = 255
        data[i + 1] = 255
        data[i + 2] = 255
      }
    }
    await sharp(data, {
      raw: { width: info.width, height: info.height, channels: info.channels },
    })
      .png()
      .toFile(path.join(dir, 'logo_footer_white.png'))
    console.log('Zapisano białe logo dla stopki.')
  } catch (e) {
    console.log('Błąd białego:', e.message)
  }
}
main()
