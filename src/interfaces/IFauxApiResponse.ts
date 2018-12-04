export interface IFauxApiResponse {
    callid: string;
    action: string;
    message: string;
    data?: {
        updates?: any;
        backup_config_file?: string;
        backup_files?: {
            filename: string;
            timestamp: string;
            description: string;
            version: string;
            filesize: string;
        }[];
        config_file?: string;
        config?: any;
        do_backup?: boolean;
        do_reload?: true;
        previous_config_file?: string;
        return?: {
            'name': string;
            'description': string
        }[];
        gateway_status?: any;
        stats?: {
            inpkts?: number;
            inbytes?: number;
            outpkts?: number;
            outbytes?: number;
            inerrs?: number;
            outerrs?: number;
            collisions?: number;
            inmcasts?: number;
            outmcasts?: number;
            unsupproto?: number;
            mtu?: number;
            cpu?: string;
            mem?: string;
            uptime?: string;
            pfstate?: string;
            pfstatepercent?: string;
            temp?: string;
            datetime?: string;
            cpufreq?: string;
            load_average?: string[];
            mbuf?: string;
            mbufpercent?: string;
        };
        rules?: {
            number: number;
            rule: string;
            evaluations: string;
            packets: string;
            bytes: string;
            states: string;
            inserted: string;
            statecreations: string;
        }[],
    }
}
