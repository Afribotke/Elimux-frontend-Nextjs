-- Generated automatically by ElimuX Ultra Generator
-- Kind: table
-- Instruction: ./supabase-generate.ps1 "Create a table for institutions with name, code, email, phone, type, status enum active inactive pending"

create table if not exists institutions (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    code text not null,
    email text not null,
    phone text,
    type text,
    status enum active inactive pending" boolean,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

alter table institutions add constraint institutions_code_key unique (code);
alter table institutions add constraint institutions_email_key unique (email);
alter table institutions add constraint institutions_phone_key unique (phone);
create index if not exists idx_institutions_code on institutions(code);
create index if not exists idx_institutions_email on institutions(email);
create index if not exists idx_institutions_phone on institutions(phone);

create trigger institutions_updated_at
before update on institutions
for each row
execute procedure update_updated_at_column();

