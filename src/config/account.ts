import path from 'path';
import 'dotenv/config';

export default {
	tokenExpiryTime: 24,
	emailTemplateFile: path.resolve(
		__dirname,
		'..',
		'modules',
		'users',
		'templates',
		'mail_activate_user.hbs',
	),
	link: `http://${process.env.APP_WEB_URL}/account/activate`,
};
