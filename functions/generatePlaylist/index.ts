import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { DBService } from "./db";

interface ISong {
    id: number;
    name: string;
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || req.body?.name);

    const dBService = new DBService();
    try {
        await dBService.connect();
        const result = await dBService.query<ISong>(`
        INSERT INTO Songs (name)
        VALUES ('${name}');
        SELECT * FROM Songs;`);
        
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