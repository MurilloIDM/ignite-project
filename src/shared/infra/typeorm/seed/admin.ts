import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

const create = async () => {
  const connection = await createConnection();

  const id = uuidV4();
  const password = await hash("admin", 8);

  await connection.query(`
    INSERT INTO USERS(
      id, name, email, password, "isAdmin", driver_license, created_at
    ) VALUES(
        '${id}',
        'admin',
        'admin@rentx.com.br',
        '${password}',
        true,
        '12345',
        'now()'
      )
  `);

  await connection.close();
};

create().then(() => console.log("User admin created"));
