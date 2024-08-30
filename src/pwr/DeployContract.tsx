import { useState } from 'react';
import { ethers } from 'ethers'; // General ethers import
import { solidityCompiler } from "@agnostico/browser-solidity-compiler";
const DeployContract = () => {
    // @ts-ignore
    const provider = new ethers.BrowserProvider(window.ethereum);

    const [contractAddress, setContractAddress] = useState<string>();
    const [errorMessage, setErrorMessage] = useState(null);

    const compileAndDeploy = async () => {
        const sourceCode = `
        pragma solidity ^0.8.19;

        contract SimpleStorage {
            uint256 storedData;

            function set(uint256 x) public {
                storedData = x;
            }

            function get() public view returns (uint256) {
                return storedData;
            }
        }`;
        console.log(sourceCode)
        let trimContent = sourceCode.trim();
        try {
            let options = {} as any;
            options.optimizer = {
                enabled: true,
                runs: 10,
            } as any;




            //   let index = trimContent.match(/contract/)?.index;
            // if(index==undefined){
            //     window.alert("Issue while parsing contract")
            //     return;
            // } 
            // trimContent = trimContent.slice(index + 1);

            // const fromContract = trimContent.slice(index);
            // const contractSelector = trimContent.slice(
            //       trimContent.indexOf(fromContract),
            //       fromContract.indexOf('{')
            //     );
            // let contractName =contractSelector.trim().split(' ')[1];
            // console.log(contractName)
            let contractName = "SimpleStorage";


            const output = await solidityCompiler({
                version: `https://binaries.soliditylang.org/bin/soljson-v0.8.19+commit.7dd6d404.js`,
                contractBody: trimContent,
                options,
            }) as any;
            console.log(output)
            const abi = output.contracts.Compiled_Contracts[contractName].abi;

            const bytecode = output.contracts.Compiled_Contracts[contractName].evm.bytecode;

            const signer = await provider.getSigner();
            console.log("2")
            const factory = new ethers.ContractFactory(abi, bytecode, signer);
            const contract = await factory.deploy();
            const address = await contract.getAddress()
            setContractAddress(address);
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div>
            <button className='m-2 bg-[#3e3e42] text-white py-1  px-4 rounded-full' onClick={compileAndDeploy}>Compile & Deploy Contract</button>
            {contractAddress && <p>Contract deployed at: {contractAddress}</p>}
            {errorMessage && <p>Error: {errorMessage}</p>}
        </div>
    );
};

export default DeployContract;
