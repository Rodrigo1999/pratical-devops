import pokeappQuery from '@pokeapp/application/query';
import { Express } from 'express';
import os from 'os';

export let LIVE_APP = true;
let MEMORY_HOG: Buffer<ArrayBuffer>[] = []
let TIMEOUT_FN_MEMORY_HOG: NodeJS.Timeout | undefined = undefined

export default function resourceControl(app: Express) {

    app.put('/healthz', (req, res) => {
        LIVE_APP = !LIVE_APP

        res.status(200).send({ LIVE_APP })
    })

    app.get('/healthz', async (req, res) => {
        try {
            const services = {
                DB: await pokeappQuery.health.dbIsLive(),
                LIVE_APP
            }

            for (const service in services) {
                if (!services[service as keyof typeof services]) {
                    LIVE_APP = false
                    throw new Error(`[HealthCheck][${service}] is unhealthy`)
                }
            }

            res.status(200).send({
                status: 'Ok'
            })
        } catch (error) {
            res.status(500).send({
                name: (error as Error).name,
                message: (error as Error).message
            })
        }
    })

    app.get('/stress-cpu', (req, res) => {
        function fib(n: number): number {
            if (n < 2) return n;
            return fib(n - 1) + fib(n - 2);
        }
        // você pode passar ?iterations=45 para ajustar a intensidade
        const iterations = parseInt(req.query.iterations as string, 10) || 40;
        const start = Date.now();
        const result = fib(iterations);
        const duration = Date.now() - start;

        res.json({
            message: `Fibonacci(${iterations}) = ${result}`,
            cpuMs: duration,
            cpus: os.cpus().length
        });
    });

    app.get('/stress-memory', (req, res) => {
        // passe ?mb=200 para alocar 200 MiB; padrão 100 MiB
        const mb = parseInt(req.query.mb as string, 10) || 100;
        const timeout = parseInt(req.query.timeout as string, 10) || 30 * 1000;
        const bytes = mb * 1024 * 1024;

        // Buffer.alloc preenche a memória imediatamente
        const chunk = Buffer.alloc(bytes, 'a');
        MEMORY_HOG.push(chunk);

        if (TIMEOUT_FN_MEMORY_HOG) {
            clearTimeout(TIMEOUT_FN_MEMORY_HOG);
        }

        TIMEOUT_FN_MEMORY_HOG = setTimeout(() => {
            MEMORY_HOG = [];
            TIMEOUT_FN_MEMORY_HOG = undefined;
        }, timeout);

        res.json({
            message: `Alocado ${mb} MiB`,
            totalAllocatedMB: MEMORY_HOG.length * mb
        });
    });
}
