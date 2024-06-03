import { Global, Module } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { envs } from 'src/config';

@Global()
@Module({
    providers: [
        {
            provide: 'SUPABASE_CLIENT',
            useFactory: (): SupabaseClient => {
                const supabaseUrl = envs.supabase_url;
                const supabaseKey = envs.supabase_key;
                return createClient(supabaseUrl, supabaseKey);
            }
        }
    ],
    exports: ['SUPABASE_CLIENT']
})
export class SupabaseModule {}
