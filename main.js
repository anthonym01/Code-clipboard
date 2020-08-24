const electron = require('electron');//includes electron dependency
const { app, BrowserWindow, Tray, Menu } = electron

const path = require('path');//path to necessary files
const url = require('url');//web dependency
const windowStateKeeper = require('electron-window-state');//preserves the window state
const { menubar } = require('menubar');

let mb = null
let tray = null;

app.on('ready', function () {
	console.log('App ready')
	//createmainWindow()
	create_tray()
	mb = menubar({
		tray,
		browserWindow: {
			transparent: true, alwaysOnTop: true,
			webPreferences: {
				nodeIntegration: true,
				enableRemoteModule: true,
			},
			minWidth: 80,
			preloadWindow:true,
		},
	})
	app.allowRendererProcessReuse = true;

})

function createmainWindow() {

	//const { screenwidth, screenheight } = electron.screen.getPrimaryDisplay().workAreaSize //gets screen size and sets it to height and width
	let mainWindowState = windowStateKeeper({
		defaultWidth: 300,
		defaultHeight: 400,
	})
	mainWindow = new BrowserWindow({
		x: mainWindowState.x,
		y: mainWindowState.y,
		width: mainWindowState.width,
		height: mainWindowState.height,
		maximizable: false,
		backgroundColor: '#0000',
		frame: false,
		center: true,
		alwaysOnTop: true,
		icon: undefined,
		transparent: false,
		title: 'Clipboard',
		minWidth: 80,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
		}
	})
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, '/BrowserWindows/Clipborad_window.html'),
		protocol: 'file:',
		slashes: true
	}))
	mainWindowState.manage(mainWindow);
	mainWindow.setSkipTaskbar(true)
}

function create_tray() {
	tray = new Tray('assets/images/icon.ico')
	tray.addListener('double-click', function () {
		
	})
	const contextMenu = Menu.buildFromTemplate([
		{
			label: 'open', click() {
				mainWindow.show();
			}
		},
		{ type: 'separator' },
		{ role: 'Quit' }
	])
	tray.setToolTip('Clipboard assist')
	tray.setContextMenu(contextMenu)
}

exports.clossapp = () => { mainWindow.hide() }

exports.minimize = () => { mainWindow.minimize() }

exports.setontop = () => { mainWindow.setAlwaysOnTop(true) }

exports.setnotontop = () => { mainWindow.setAlwaysOnTop(false) }
