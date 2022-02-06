
class Colors {
	constructor() {
		this.arrondis = 1000 // (pixel )
		this.nbcolors = 3
		this.maxHue = 360
		this.limited = true
		this.portionsize = this.maxHue / this.nbcolors
		// starter background colors
		this.bgR = 255 // max 255
		this.bgG = 0 // max 255
		this.bgB = 0 // max 255
		this.bgA = 1 // transp
		// starter color
		this.startH = 0
		this.startS = 100
		this.startL = 50
		this.startA = 1
		// tools menu
		this.toolsactive = true
		// append or prepend color in palette or spirale
		this.reverseOrder = true
		//--
		this.colorSizeW = 50
		this.colorSizeH = 50
		// --
		this.screen_size;
		this.refresh_screen_size()
		//--
		this.start =
			window.onload = () => {
				this.setColorRangeSize()
				this.refreshPaletteAndSpirale()
				this.addFormEvent()
				this.checkToolsOpen()
			}
	}

	checkToolsOpen() {
		if (this.toolsactive) {
			document.getElementById('form').classList.add("active")
			let paletteWidth = parseInt((window.innerWidth - document.getElementById('form').offsetWidth) / this.colorSizeW) * this.colorSizeW
			document.getElementById('palette').style.maxWidth = paletteWidth + 'px'
		} else {
			document.getElementById('form').classList.remove("active")
			document.getElementById('palette').style.maxWidth = ''
		}
	}
	setColorRangeSize() {
		this.portionsize = ((this.maxHue) / this.nbcolors)
	}
	addColorToPalette(datas, target) {
		let div = document.createElement('div')
		let string = 'hsla(' + datas.h + ', ' + datas.s + '%, ' + datas.l + '%, ' + datas.a + ')'
		div.style.backgroundColor = string
		div.textContent = datas.index// + '-' + string
		div.style.width = datas.width + 'px'
		div.style.height = datas.height + 'px'
		this.reverseOrder
			? target.prepend(div)
			: target.appendChild(div)
	}
	radToDeg(rad) {
		return rad * (180 / Math.PI);
	}
	degToRad(deg) {
		return (deg / 180) * Math.PI;
	}
	addColorToSpirale(datas, target) {
		let div = document.createElement('div')
		let string = 'hsla(' + datas.h + ', ' + datas.s + '%, ' + datas.l + '%, ' + datas.a + ')'
		div.style.backgroundColor = string
		div.style.width = datas.width + 'px'
		div.style.height = datas.height + 'px'
		div.style.top = datas.top
		div.style.left = datas.left
		div.className = datas.classname
		if (datas.id) { div.id = datas.id }
		if (datas.h >= 0) { div.textContent = parseInt(datas.h) + '°' }
		// if (datas.index >= 0) { div.textContent = datas.index }
		this.reverseOrder
			? target.prepend(div)
			: target.appendChild(div)
	}
	getNextPos(x = 0, y = 0, dist = 100, hue = 0) {
		let rad = this.degToRad(hue)
		console.log('rad:', rad)
		return {
			x: (dist * Math.cos(rad)) + (dist * Math.sin(rad)),
			y: (dist * Math.sin(rad)) - (dist * Math.cos(rad))
		}

	}
	setAllColorDiv() {
		console.log('-setAllColorDiv-')
		let x = 0
		let y = 0
		let hue = 0
		let dist = this.colorSizeW
		for (let index = 0; index < this.nbcolors; index++) {
			hue = this.getNewHue(index)
			dist = 50
			let nextPos = this.getNextPos(x, y, dist, hue)
			let dataColor =
			{
				index: index,
				width: this.colorSizeW,
				height: this.colorSizeH,
				top: nextPos.y + 'px',
				left: nextPos.x + 'px',
				classname: 'spirale-item',
				h: hue,
				s: this.startS,
				l: this.startL,
				a: this.startA,
			}
			this.addColorToSpirale(dataColor, document.getElementById('spirale'))
			this.addColorToPalette(dataColor, document.getElementById('palette'))
		}
	}
	getNewHue(index) {
		let h = (((this.startH + (index * this.portionsize)) * this.arrondis) / this.arrondis)
		console.log('h', h)
		// if (h > 360) { h = h - 360 }
		return h
	}
	refreshPaletteAndSpirale() {
		let palette = document.getElementById('palette')
		let spirale = document.getElementById('spirale')
		this.setColorRangeSize()
		if (!palette || !spirale) {
			this.addPaletteAndSpirale()
		} else {
			palette.remove()
			spirale.remove()
			this.addPaletteAndSpirale()
			this.checkToolsOpen()
		}
		this.setAllColorDiv()
	}
	addPaletteAndSpirale() {
		let palette = document.createElement('div')
		palette.id = 'palette'
		palette.style.backgroundColor = 'rgba(' + this.bgR + ',' + this.bgG + ',' + this.bgB + ',' + this.bgA + ')'
		// this.reverseOrder ? document.body.prepend(palette)
		// 	: 
		document.body.prepend(palette)


		let spirale = document.createElement('div')
		spirale.id = 'spirale'
		spirale.style.backgroundColor = 'rgba(' + this.bgR + ',' + this.bgG + ',' + this.bgB + ',' + this.bgA + ')'
		spirale.style.top = 'calc( 50% - ' + this.colorSizeW / 2 + 'px)'
		spirale.style.left = 'calc( 50% - ' + this.colorSizeH / 2 + 'px)'
		spirale.style.width = this.colorSizeW + 'px'
		spirale.style.height = this.colorSizeH + 'px'

		document.body.prepend(spirale)



	}
	refresh_screen_size() {
		return {
			w: window.innerWidth,
			h: window.innerHeight,
			centerW: window.innerWidth / 2,
			centerH: window.innerHeight / 2,
		}
	}
	addFormEvent() {
		document.getElementById('nbcolors').value = this.nbcolors
		document.getElementById('bgr').value = this.bgR
		document.getElementById('bgg').value = this.bgG
		document.getElementById('bgb').value = this.bgB
		document.getElementById('bga').value = this.bgA
		document.getElementById('h').value = this.startH
		document.getElementById('s').value = this.startS
		document.getElementById('l').value = this.startL
		document.getElementById('a').value = this.startA

		document.getElementById('nbcolors').addEventListener('change', (e) => {
			this.nbcolors = e.target.value
			this.refreshPaletteAndSpirale()
		}, false)
		document.getElementById('bgr').onchange = (e) => {
			this.bgR = e.target.value > 255 ? 255 : e.target.value < 0 ? 0 : e.target.value
			document.getElementById('vbgr').textContent = '(' + e.target.value + ')'
			this.refreshPaletteAndSpirale()
		}
		document.getElementById('bgg').onchange = (e) => {
			this.bgG = e.target.value > 255 ? 255 : e.target.value < 0 ? 0 : e.target.value
			document.getElementById('vbgg').textContent = '(' + e.target.value + ')'
			this.refreshPaletteAndSpirale()
		}
		document.getElementById('bgb').onchange = (e) => {
			this.bgB = e.target.value > 255 ? 255 : e.target.value < 0 ? 0 : e.target.value
			document.getElementById('vbgb').textContent = '(' + e.target.value + ')'
			this.refreshPaletteAndSpirale()
		}
		document.getElementById('bga').onchange = (e) => {
			this.bgA = e.target.value > 100 ? 1 : e.target.value < 0 ? 0 : e.target.value / 100
			document.getElementById('vbga').textContent = '(' + e.target.value + ')'
			this.refreshPaletteAndSpirale()
		}
		document.getElementById('h').onchange = (e) => {
			this.startH = e.target.value > 360 ? 360 : e.target.value < 0 ? 0 : e.target.value
			document.getElementById('vh').textContent = e.target.value + '°'
			this.refreshPaletteAndSpirale()
		}
		document.getElementById('s').onchange = (e) => {
			this.startS = e.target.value > 100 ? 100 : e.target.value < 0 ? 0 : e.target.value
			document.getElementById('vs').textContent = e.target.value + '%'
			this.refreshPaletteAndSpirale()
		}
		document.getElementById('l').onchange = (e) => {
			this.startL = e.target.value > 100 ? 100 : e.target.value < 0 ? 0 : e.target.value
			document.getElementById('vl').textContent = e.target.value + '%'
			this.refreshPaletteAndSpirale()
		}
		document.getElementById('a').onchange = (e) => {
			this.startA = e.target.value > 100 ? 1 : e.target.value < 0 ? 0 : e.target.value / 100
			document.getElementById('va').textContent = e.target.value + '%'
			this.refreshPaletteAndSpirale()
		}
		// tools
		document.getElementById('tools').onclick = (e) => {
			this.toolsactive = !this.toolsactive
			this.checkToolsOpen()
		}
		window.onresize = () => {
			this.checkToolsOpen()
			this.refresh_screen_size()
		}

	}
}
new Colors()
