import 'module-alias/register';
import { addAlias } from 'module-alias';
import tscJson from '../../tsconfig.json'
import ENV from './env.config';

if (ENV.isProd) {
    const paths = tscJson.compilerOptions.paths
    for (const path in paths) {
        const pathName = path.replace('/*', '')
        let pathValue = paths[path as keyof typeof paths][0]
        pathValue = pathValue.replace('.', '').replace('/*', '')
        pathValue = pathValue.replace('src', tscJson.compilerOptions.outDir.replace('./', ''))

        addAlias(pathName, process.cwd() + pathValue)
    }
}