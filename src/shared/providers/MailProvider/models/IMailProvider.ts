import ISendMailDTO from '../dtos/ISendMailDTO';

export default interface IProvedorEmail {
	send(config: ISendMailDTO): Promise<void>;
}
