import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserEntity1717124499468 implements MigrationInterface {
  name = 'CreateUserEntity1717124499468';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "video" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "url" character varying NOT NULL, "description" character varying, "isPrivate" boolean NOT NULL DEFAULT false, "image" character varying, "userId" integer NOT NULL, CONSTRAINT "PK_1a2f3856250765d72e7e1636c8e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "iteration_video" ("id" SERIAL NOT NULL, "like" boolean NOT NULL DEFAULT false, "disLike" boolean NOT NULL DEFAULT false, "videoId" integer NOT NULL, "userId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2b1ff56470b0c3a7dc29e77588c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "lastName" character varying NOT NULL, "firstName" character varying NOT NULL, "birthday" date NOT NULL, "phone" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "photo" character varying, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "video" ADD CONSTRAINT "FK_74e27b13f8ac66f999400df12f6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "iteration_video" ADD CONSTRAINT "FK_9ddee51d4893bb9e1af701e5e61" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "iteration_video" ADD CONSTRAINT "FK_81a8a5ec8c6434cc90f36efbfae" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(`
        INSERT INTO "user" (username, email, password, "lastName", "firstName", birthday, phone, "isActive", photo, role, "createdAt", "updatedAt")
        VALUES ('${process.env.ADMINISTRATOR_USERNAME}', '${process.env.ADMINISTRATOR_EMAIL}', '${process.env.ADMINISTRATOR_PASSWORD}', 'Admin', 'Super', '2000-01-01', '1234567890', true, null, 'admin', now(), now())
    `);

    // insertar un video de prueba
    await queryRunner.query(`
        INSERT INTO "video" (title, url, description, "isPrivate", image, "userId")
        VALUES ('Video de prueba', 'https://www.youtube.com/watch?v=7ZVwk6m1e0s', 'Video de prueba', false, 'https://www.youtube.com/watch?v=7ZVwk6m1e0s', 1)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "iteration_video" DROP CONSTRAINT "FK_81a8a5ec8c6434cc90f36efbfae"`,
    );
    await queryRunner.query(
      `ALTER TABLE "iteration_video" DROP CONSTRAINT "FK_9ddee51d4893bb9e1af701e5e61"`,
    );
    await queryRunner.query(
      `ALTER TABLE "video" DROP CONSTRAINT "FK_74e27b13f8ac66f999400df12f6"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "iteration_video"`);
    await queryRunner.query(`DROP TABLE "video"`);
  }
}
