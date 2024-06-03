/* Este módulo carga variables de entorno desde un archivo .env, las valida usando joi para asegurar que
tienen el formato correcto, y las exporta en un objeto estructurado.
Primero, utiliza dotenv para cargar las variables, luego define y aplica un esquema de validación,
y finalmente, maneja posibles errores de validación y exporta las variables validadas para su uso en
la aplicación. */



import 'dotenv/config';
import * as joi  from 'joi';


interface EnvVars {
    HOST          : string;
    PORT          : number;
    USER          : string;
    PASSWORD      : string;
    DATABASE      : string;
    SUPABASE_URL  : string;
    SUPABASE_KEY  : string;
    CLOUD_NAME    : string;
    CLOUDINARY_KEY : string;
    CLOUDINARY_SECRET : string;
}


const envsSchema = joi.object({
    HOST    : joi.string().required(),
    PORT    : joi.number().required(),
    USER    : joi.string().required(),
    PASSWORD: joi.string().required(),
    DATABASE: joi.string().required(),
    SUPABASE_URL  : joi.string().required(),
    SUPABASE_KEY  : joi.string().required(),
    CLOUD_NAME: joi.string().required(),
    CLOUDINARY_KEY: joi.string().required(),
    CLOUDINARY_SECRET: joi.string().required(),
})
.unknown(true);


const { error, value } = envsSchema.validate( process.env );


if( error ){
    throw new Error(`Config validation error: ${ error.message }`);
}


const envVars: EnvVars = value;

export const envs = {
    host    : envVars.HOST,
    port    : envVars.PORT,
    user    : envVars.USER,
    password: envVars.PASSWORD,
    database: envVars.DATABASE,
    supabase_url: envVars.SUPABASE_URL,
    supabase_key: envVars.SUPABASE_KEY,
    cloud_name: envVars.CLOUD_NAME,
    cloudinary_key: envVars.CLOUDINARY_KEY,
    cloudinary_secret: envVars.CLOUDINARY_SECRET

}