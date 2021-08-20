const authConfig = {
	secretOrPrivateKey: process.env.SEGREDO || 'fallback-secret',
	expiresIn: '30d',
};

export default authConfig;
