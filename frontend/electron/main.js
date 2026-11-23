import { app, BrowserWindow, dialog, net, protocol } from 'electron'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const scheme = 'acs'
const host = 'shop'
const appUrl = `${scheme}://${host}/`
const apiOrigin = 'http://127.0.0.1:8080'
const contentSecurityPolicy = "default-src 'self'; base-uri 'none'; object-src 'none'; frame-ancestors 'none'"

// Стандартная схема сохраняет адреса /products и /api, которые использует веб-версия.
protocol.registerSchemesAsPrivileged([
  { scheme, privileges: { standard: true, secure: true, supportFetchAPI: true } },
])

async function fetchApi(url, request) {
  try {
    return await net.fetch(`${apiOrigin}${url.pathname}${url.search}`, {
      method: request.method,
      cache: 'no-store',
      redirect: 'error',
      signal: AbortSignal.any([request.signal, AbortSignal.timeout(10_000)]),
    })
  } catch {
    return new Response(null, { status: 502 })
  }
}

async function serveAsset(url, request) {
  try {
    const assetPath = decodeURIComponent(url.pathname).slice(1) || 'index.html'
    const segments = assetPath.split('/')
    if (segments.some((segment) => !segment || /[\\:]|[. ]$/.test(segment))) {
      return new Response(null, { status: 404 })
    }

    const fileUrl = pathToFileURL(join(app.getAppPath(), 'dist', ...segments))
    const response = await net.fetch(fileUrl.href, { method: request.method })
    const headers = new Headers(response.headers)
    headers.set('Content-Security-Policy', contentSecurityPolicy)
    return new Response(response.body, { status: response.status, headers })
  } catch {
    return new Response(null, { status: 404 })
  }
}

function handleAppRequest(request) {
  const url = new URL(request.url)
  if (url.host !== host || url.username || url.password) {
    return new Response(null, { status: 404 })
  }
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response(null, { status: 405, headers: { Allow: 'GET, HEAD' } })
  }

  return url.pathname.startsWith('/api/') ? fetchApi(url, request) : serveAsset(url, request)
}

async function openWindow() {
  const window = new BrowserWindow({
    title: 'ACS',
    width: 1280,
    height: 850,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: '#f7f8fa',
    icon: join(app.getAppPath(), 'electron', 'icon.ico'),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  })

  window.on('page-title-updated', (event) => event.preventDefault())
  window.webContents.on('will-navigate', (event) => event.preventDefault())
  window.webContents.setWindowOpenHandler(() => ({ action: 'deny' }))

  await window.loadURL(appUrl)
  window.show()
}

app.whenReady()
  .then(() => {
    protocol.handle(scheme, handleAppRequest)
    return openWindow()
  })
  .catch((error) => {
    dialog.showErrorBox('ACS', `Не удалось открыть приложение.\n${error.message}`)
    app.quit()
  })

app.on('window-all-closed', () => app.quit())
