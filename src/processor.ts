import { lookupArchive } from '@subsquid/archive-registry'
import { SubstrateProcessor } from '@subsquid/substrate-processor'
import { FullTypeormDatabase as Database } from '@subsquid/typeorm-store'
import * as mappings from './mappings'

const processor = new SubstrateProcessor(new Database())

processor.setTypesBundle('kusama');
processor.setBatchSize(30);
processor.setBlockRange({from:5756453});
processor.setDataSource({
    archive: lookupArchive("kusama", { release: "FireSquid" }),
    chain: 'wss://kusama-rpc.polkadot.io'
});

processor.addCallHandler('System.remark', mappings.handleRemark);

processor.run();