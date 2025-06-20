export const replaceEmptyStringFromObjectWithNull = (data: any) => {
	const newData = { ...data }
	Object.keys(newData).forEach(key => {
		if (newData[key] === '') {
			newData[key] = null
		}
	})
	return newData
}
