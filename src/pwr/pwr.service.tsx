// import { Signal, signal } from '@preact/signals-react';
// // import PwrProvider from './PwrProvider'

// class PwrProviderNotDetectedError extends Error {
// 	message = 'PWR provider not detected';
// 	code = 'PWR_PROVIDER_NOT_DETECTED';
// }

// export default class PwrService {
// 	// state
// 	private initialized = signal(false);
// 	private detected: Signal<boolean> = signal(false);
// 	private connected: Signal<boolean> = signal(false);

// 	// wallet
// 	private address: Signal<string> = signal('');
//     // @ts-ignore
// 	private provider: PwrProvider | null = null;
	
// 	// initialize the service, 
// 	async init() {
// 		// 1. detect provider
// 		// 2. get provider
		
// 		// this small delay is needed to make sure that wallet can be initialized
// 		await new Promise((_) => setTimeout(_, 500));

// 		this.detectProvider();

// 		this.initialized.value = true;
// 	}

// 	// @ts-ignore
// 	detectProvider() {
//         // @ts-ignore
// 		if (window.pwr) {
// 			this.detected.value = true;
//             // @ts-ignore
// 			this.provider = window.pwr;
// 		} else {
// 			this.detected.value = false;
// 		}
//         this.provider?.onConnect.addListener((address:string) =>{
            
//             console.log(address.at(0))
//             this.address.value = address[0]
            
//         })

//         this.provider?.onDisconnect.addListener(() => {
//             this.connected.value = false;
//             this.address.value = '';

//         });
// 	}

// 	getProvider() {
// 		if (!this.detected.value) throw new PwrProviderNotDetectedError();

// 		return this.provider;
// 	}

// 	async connect(): Promise<any> {
// 		if (!this.provider) throw new PwrProviderNotDetectedError();

// 		return this.provider.connect();
// 	}
	
// 	async trasnferPwr(from: string, to: string, amount: number){
// 		if (!this.provider) throw new PwrProviderNotDetectedError();
// 		if(!this.connected.value) throw new Error('Wallet is not connected');
		
// 		await this.provider.transferPwr({from,to, amount});
// 	}


// 	// *~~~ API ~~~* //
// 	isConnected() {
// 		return this.connected.value;
// 	}

// 	getAddress() {
// 		return this.address.value;
// 	}
	
	
// }