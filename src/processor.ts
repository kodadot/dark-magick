import { lookupArchive } from '@subsquid/archive-registry'
import {
    SubstrateBatchProcessor as SubstrateProcessor
  } from '@subsquid/substrate-processor'
  import { TypeormDatabase as Database } from '@subsquid/typeorm-store'
import * as mappings from './mappings'

export const fieldSelection = {
    block: {
      timestamp: true
    },
    extrinsic: {
      signature: true,
    },
    call: {
        name: true,
        args: true,
        origin: true
    },
    event: {
        name: true,
        args: true,
    }
  } as const
  
  export type SelectedFields = typeof fieldSelection

const database = new Database({ supportHotBlocks: false })
const processor = new SubstrateProcessor<SelectedFields>()

// const processor = new SubstrateProcessor(new Database())

processor.setTypesBundle('kusama');
processor.setBlockRange({from:5756453});
processor.setGateway('https://v2.archive.subsquid.io/network/kusama')
processor.setRpcEndpoint({
    url: 'wss://kusama-rpc.polkadot.io',
    rateLimit: 10
  })



// processor.addCallHandler('System.remark', mappings.handleRemark);
processor.addCall({ name: ['System.remark'], extrinsic: true })

// processor.run();
// processor.run(database, mainFrame)