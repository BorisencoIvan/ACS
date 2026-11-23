import { fileURLToPath } from 'node:url'

export default {
  packagerConfig: {
    asar: true,
    icon: fileURLToPath(new URL('./electron/icon.ico', import.meta.url)),
    // Vite уже включил зависимости интерфейса в dist.
    ignore: [/^\/(?!dist(?:\/|$)|electron(?:\/|$)|package\.json$).+/],
  },
}
