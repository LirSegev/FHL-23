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
    await dBService.connect();
    const result = await dBService.query<ISong>(`
    INSERT INTO Songs (name)
    VALUES ('${name}');
    SELECT * FROM Songs;`);

    await dBService.cleanup();

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: result.recordset
    };

};

export default httpTrigger;