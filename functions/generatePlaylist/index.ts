import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { DBService } from "./db";

interface ISong {
    id: number;
    name: string;
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const isPost = req.method === 'POST';
    const name: string | undefined = (req.query.name || req.body?.name);
    if (isPost && !name) {
        context.res = {
            status: 400,
            body: 'Please pass a name on the query string or in the request body'
        };
        return;
    }

    const dBService = new DBService();
    try {
        await dBService.connect();
        if (isPost)
            await dBService.query(`INSERT INTO Songs (name) VALUES ('${name}');`);

        const result = await dBService.query<ISong>(`SELECT * FROM Songs;`); 
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: result.recordset
        };
    } catch(err) {
        context.res = {
            status: 500,
            body: err
        };
    }
    await dBService.cleanup();
};

export default httpTrigger;