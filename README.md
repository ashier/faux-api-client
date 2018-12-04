# faux-api-client
NodeJS/Typescript Client for PFSense Faux-API

# Pre-requisite
- An host with PF Sense installed
- FauxApi installed (see https://github.com/ndejong/pfsense_fauxapi/blob/master/README.md)
- FauxApi credentials (in /etc/fauxapi/credentials.ini... see https://github.com/ndejong/pfsense_fauxapi/blob/master/README.md)
- Allowed methods (in /etc/fauxapi/pfsense_function_calls.txt... see https://github.com/ndejong/pfsense_fauxapi/blob/master/README.md)

# How to use
First `npm install --save faux-api-client`

Then, in your project:
```javascript
import {FauxApiClient} from 'faux-api-client';

const fauxApiClient = new FauxApiClient(
    '<PFSense Server IP Address>',
    '<PF Sense Key>',
    '<PF Sense Secret>'
);

fauxApiClient.getConfiguration()
    .then((success: any) => {
        console.log('#################################################');
        console.log('#                SUCCESS                        #');
        console.log('#################################################');
        console.log(JSON.stringify(success));
    })
    .catch((error: Error) => {
        console.log('#################################################');
        console.log('#                 ERROR                         #');
        console.log('#################################################');
        console.log(JSON.stringify(error));
    });
```

# Available commands
```javascript
public async aliasUpdateUrlTables(): Promise<IFauxApiResponse>;
public async getBackupConfiguration(): Promise<IFauxApiResponse>;
public async getBackupConfigurationList(): Promise<IFauxApiResponse>;
public async getConfiguration(): Promise<IFauxApiResponse>;
public async patchConfiguration(configuration: any): Promise<IFauxApiResponse>;
public async reloadConfiguration(): Promise<IFauxApiResponse>;
public async restoreConfiguration(configurationFilePath: string): Promise<IFauxApiResponse>;
public async setConfiguration(configuration: any): Promise<IFauxApiResponse>;
public async callFunction(functionName: string, ...args: any[]): Promise<IFauxApiResponse>;
public async gatewayStatus(): Promise<IFauxApiResponse>;
public async interfaceStatistics(interfaceName: string): Promise<IFauxApiResponse>;
public async getRule(ruleNumber: number): Promise<IFauxApiResponse>;
public async sendEvent(event: any): Promise<IFauxApiResponse>;
public async rebootSystem(): Promise<IFauxApiResponse>;
public async systemStatistics(): Promise<IFauxApiResponse>;
```
