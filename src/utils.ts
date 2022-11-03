import {
    Finding,
    FindingSeverity,
    FindingType,
    getEthersProvider,
  } from "forta-agent";

const provider = getEthersProvider();
import { Interface } from "@ethersproject/abi";

const EVENT_ABI: string[] = ["event Deposited(uint256 amount)"];
const EVENTS_IFACE: Interface = new Interface(EVENT_ABI);

interface FindingParams {
    // deposit, minimum deposit and blacklisted address
    alertId: "001" | "002" | "003"; 
    account: string;
    depositedAmount: string;
    description: string;
    severity: FindingSeverity;
    type: FindingType;
  }

  const createFinding = ({
    alertId,
    account,
    depositedAmount,
    description,
    severity,
    type,
  }: FindingParams): Finding => {
    return Finding.fromObject({
      name: "Detects all deposit transactions",
      description,
      alertId: `deposit-${alertId}`,
      severity,
      type,
      protocol: "Depositor",
      metadata: {
        account,
        depositedAmount,
      },
    });
};
  
  
    export default {
        provider,
        EVENT_ABI,
        EVENTS_IFACE,
        createFinding, 
    };
