const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');


const multerConfigs = {
	storage: multer.memoryStorage(),
	fileFilter: (req, file, next) => {
		const allowed = ['image/jpg', 'image/jpeg', 'image/png'];
		if(allowed.includes(file.mimetype)) {
			next(null, true);
		} else {
			next({message: 'Arquivo não suportado'}, false)
		}
	} 
}

exports.upload = multer(multerConfigs).single('photo');

exports.resize = async (req, res, next) => {
	if(!req.file) {
		next();
		return;
	}

	const extension = req.file.mimetype.split('/')[1];
	let fileName = `${uuid.v4()}.${extension}`;

	req.body.photo = fileName;

	const photo = await jimp.read(req.file.buffer);
	await photo.resize(800, jimp.AUTO);
	await photo.write(`./public/media/${fileName}`)
	next();
};