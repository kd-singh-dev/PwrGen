import { useState } from 'react';
import { ethers } from 'ethers'; // General ethers import
import { solidityCompiler } from "@agnostico/browser-solidity-compiler";

const DeployContract = (sourceCode: string) => {
    // @ts-ignore
    const provider = new ethers.BrowserProvider(window.ethereum);

    const [contractAddress, setContractAddress] = useState<string>();
    const [errorMessage, setErrorMessage] = useState(null);

    const compileAndDeploy = async (sourceCode: string) => {
        // @ts-ignore
        const trimContent = (sourceCode.sourceCode as string).trim();
        try {
            let options = {} as any;
            options.optimizer = {
                enabled: true,
                runs: 10,
            } as any;
            
            
            // @ts-ignore
            const contractName = trimContent.match(/contract\s+(\w+)/)?.[1];
            const output = await solidityCompiler({
                version: `https://binaries.soliditylang.org/bin/soljson-v0.8.19+commit.7dd6d404.js`,
                contractBody: trimContent,
                options,
            }) as any;

            // @ts-ignore
            const abi = output.contracts.Compiled_Contracts[contractName].abi;
            // @ts-ignore
            const bytecode = output.contracts.Compiled_Contracts[contractName].evm.bytecode;
            console.log(abi)
            const signer = await provider.getSigner();
            console.log(signer)
            const factory = new ethers.ContractFactory(abi, bytecode, signer);
            console.log(factory)
            const contract = await factory.deploy();
            console.log(contract)
            const address = await contract.getAddress();
            setContractAddress(address);
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div>
            <button className='m-2 bg-[#3e3e42] text-white py-1 float-right  px-4 rounded-full' onClick={()=>compileAndDeploy(sourceCode)}>Compile & Deploy Contract</button>
            {contractAddress && <div><p>Contract deployed at: {contractAddress}</p><br/></div> }
            {errorMessage && <p>Error: {errorMessage}</p>}
        </div>
    );
};

export default DeployContract;
