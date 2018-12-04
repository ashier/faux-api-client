import {createHash} from 'crypto';
import {get, post, RequestPromiseOptions} from 'request-promise-native';
import {IFauxApiHeaders} from './interfaces/IFauxApiHeaders';
import {IFauxApiResponse} from './interfaces/IFauxApiResponse';
import {IFauxApiFunctionCallBody} from './interfaces/IFauxApiFunctionCallBody';

export class FauxApiClient {
    private readonly versionPath: string = 'fauxapi/v1';
    
    private hostIp: string;
    private key: string;
    private secret: string;

    constructor(hostIp: string, key: string, secret: string) {
        this.hostIp = hostIp;
        this.key = key;
        this.secret = secret;
    }

    private generateRequestHeaders(): IFauxApiHeaders {
        const timestamp = new Date().toISOString()
            .slice(0, 19)
            .replace(/[:-]/g, '')
            .replace('T', 'Z');
    
        const nonce = createHash('md5')
            .update('' + Math.random())
            .digest('hex')
            .slice(0, 8);
    
        const preHash = `${this.secret}${timestamp}${nonce}`;

        const hash = createHash('sha256')
          .update(preHash)
          .digest('hex');

        return {
            'Content-Type': 'application/json',
            'fauxapi-auth': `${this.key}:${timestamp}:${nonce}:${hash}`
        }
    }

    private getOptions(body?: any): RequestPromiseOptions {
        let options: RequestPromiseOptions = {
            headers: this.generateRequestHeaders(),
            json: true,
            rejectUnauthorized: false
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        return options;
    }

    private getBaseUrl(methodUrlSuffix: string): string {
        return `https://${this.hostIp}/${this.versionPath}/${methodUrlSuffix}`;
    }

    public async aliasUpdateUrlTables(): Promise<IFauxApiResponse> {
        let response: IFauxApiResponse = {
            callid: '',
            action: '',
            message: ''
        };

        await get(this.getBaseUrl('?action=alias_update_urltables'), this.getOptions())
            .then((success: IFauxApiResponse) => {
                response = success;
            })
            .catch((error: Error) => {
                return Promise.reject(error);
            })

        return Promise.resolve(response);
    }

    public async getBackupConfiguration(): Promise<IFauxApiResponse> {
        let response: IFauxApiResponse = {
            callid: '',
            action: '',
            message: ''
        };

        await get(this.getBaseUrl('?action=config_backup'), this.getOptions())
            .then((success: IFauxApiResponse) => {
                response = success;
            })
            .catch((error: Error) => {
                return Promise.reject(error);
            })

        return Promise.resolve(response);
    }

    public async getBackupConfigurationList(): Promise<IFauxApiResponse> {
        let response: IFauxApiResponse = {
            callid: '',
            action: '',
            message: ''
        };

        await get(this.getBaseUrl('?action=config_backup_list'), this.getOptions())
            .then((success: IFauxApiResponse) => {
                response = success;
            })
            .catch((error: Error) => {
                return Promise.reject(error);
            })

        return Promise.resolve(response);
    }

    public async getConfiguration(): Promise<IFauxApiResponse> {
        let response: IFauxApiResponse = {
            callid: '',
            action: '',
            message: ''
        };

        await get(this.getBaseUrl('?action=config_get'), this.getOptions())
            .then((success: IFauxApiResponse) => {
                response = success;
            })
            .catch((error: Error) => {
                return Promise.reject(error);
            })

        return Promise.resolve(response);
    }

    public async patchConfiguration(configuration: any): Promise<IFauxApiResponse> {
        let response: IFauxApiResponse = {
            callid: '',
            action: '',
            message: ''
        };

        await post(this.getBaseUrl('?action=config_patch'), this.getOptions(configuration))
            .then((success: IFauxApiResponse) => {
                response = success;
            })
            .catch((error: Error) => {
                return Promise.reject(error);
            })

        return Promise.resolve(response);
    }

    public async reloadConfiguration(): Promise<IFauxApiResponse> {
        let response: IFauxApiResponse = {
            callid: '',
            action: '',
            message: ''
        };

        await get(this.getBaseUrl('?action=config_reload'), this.getOptions())
            .then((success: IFauxApiResponse) => {
                response = success;
            })
            .catch((error: Error) => {
                return Promise.reject(error);
            })

        return Promise.resolve(response);
    }

    public async restoreConfiguration(configurationFilePath: string): Promise<IFauxApiResponse> {
        let response: IFauxApiResponse = {
            callid: '',
            action: '',
            message: ''
        };

        await get(this.getBaseUrl(`?action=config_restore&config_file=${configurationFilePath}`), this.getOptions())
            .then((success: IFauxApiResponse) => {
                response = success;
            })
            .catch((error: Error) => {
                return Promise.reject(error);
            })

        return Promise.resolve(response);
    }

    public async setConfiguration(configuration: any): Promise<IFauxApiResponse> {
        let response: IFauxApiResponse = {
            callid: '',
            action: '',
            message: ''
        };

        await post(this.getBaseUrl('?action=config_set'), this.getOptions(configuration))
            .then((success: IFauxApiResponse) => {
                response = success;
            })
            .catch((error: Error) => {
                return Promise.reject(error);
            })

        return Promise.resolve(response);
    }

    public async callFunction(functionName: string, ...args: any[]): Promise<IFauxApiResponse> {
        const body: IFauxApiFunctionCallBody = {
            function: functionName
        };
    
        if (args && args.length > 0) {
          body.args = args;
        }

        let response: IFauxApiResponse = {
            callid: '',
            action: '',
            message: ''
        };

        await post(this.getBaseUrl('?action=function_call'), this.getOptions(body))
            .then((success: IFauxApiResponse) => {
                response = success;
            })
            .catch((error: Error) => {
                return Promise.reject(error);
            });

        return Promise.resolve(response);
    }

    public async gatewayStatus(): Promise<IFauxApiResponse> {
        let response: IFauxApiResponse = {
            callid: '',
            action: '',
            message: ''
        };

        await get(this.getBaseUrl('?action=gateway_status'), this.getOptions())
            .then((success: IFauxApiResponse) => {
                response = success;
            })
            .catch((error: Error) => {
                return Promise.reject(error);
            })

        return Promise.resolve(response);
    }

    public async interfaceStatistics(interfaceName: string): Promise<IFauxApiResponse> {
        let response: IFauxApiResponse = {
            callid: '',
            action: '',
            message: ''
        };

        await get(this.getBaseUrl(`?action=interface_statistics&interface=${interfaceName}`), this.getOptions())
            .then((success: IFauxApiResponse) => {
                response = success;
            })
            .catch((error: Error) => {
                return Promise.reject(error);
            })

        return Promise.resolve(response);
    }

    public async getRule(ruleNumber: number): Promise<IFauxApiResponse> {
        let response: IFauxApiResponse = {
            callid: '',
            action: '',
            message: ''
        };

        await get(this.getBaseUrl(`?action=rule_get&rule_number=${ruleNumber}`), this.getOptions())
            .then((success: IFauxApiResponse) => {
                response = success;
            })
            .catch((error: Error) => {
                return Promise.reject(error);
            })

        return Promise.resolve(response);
    }

    public async sendEvent(event: any): Promise<IFauxApiResponse> {
        let response: IFauxApiResponse = {
            callid: '',
            action: '',
            message: ''
        };

        await post(this.getBaseUrl('?action=send_event'), this.getOptions(event))
            .then((success: IFauxApiResponse) => {
                response = success;
            })
            .catch((error: Error) => {
                return Promise.reject(error);
            })

        return Promise.resolve(response);
    }

    public async rebootSystem(): Promise<IFauxApiResponse> {
        let response: IFauxApiResponse = {
            callid: '',
            action: '',
            message: ''
        };

        await get(this.getBaseUrl('?action=system_reboot'), this.getOptions())
            .then((success: IFauxApiResponse) => {
                response = success;
            })
            .catch((error: Error) => {
                return Promise.reject(error);
            })

        return Promise.resolve(response);
    }

    public async systemStatistics(): Promise<IFauxApiResponse> {
        let response: IFauxApiResponse = {
            callid: '',
            action: '',
            message: ''
        };

        await get(this.getBaseUrl('?action=system_stats'), this.getOptions())
            .then((success: IFauxApiResponse) => {
                response = success;
            })
            .catch((error: Error) => {
                return Promise.reject(error);
            })

        return Promise.resolve(response);
    }
}
