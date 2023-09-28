import { Collection, Db, MongoClient } from 'mongodb';
import validateDbEnvVariables from './validate-db-env';

export const collections: { students?: Collection } = {};

export async function connectToDatabase() {
  validateDbEnvVariables();

  const client: MongoClient = new MongoClient(process.env.DB_CONN_STRING!, {
    // useUnifiedTopology: true,
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  });

  await client.connect();


  const db: Db = client.db(process.env.DB_NAME);

  const studentsCollection: Collection = db.collection(
    process.env.STUDENTS_COLLECTION_NAME!
  );

  collections.students = studentsCollection;

  

  console.log(
    `Successfully connected to database: ${db.databaseName} 
    and collection: ${studentsCollection.collectionName}`
  );
}
