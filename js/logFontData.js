async function logFontData() {
	try {
		let res = [];
		const availableFonts = await window.queryLocalFonts();
		for (const fontData of availableFonts) {
			res.push(
				{
					postscriptName : fontData.postscriptName,
					fullName       : fontData.fullName,
					family         : fontData.family,
					script         : fontData.script
				}
			);
		}

		return res;
	} catch (err) {
		console.error(err.name, err.message);
	}
}
