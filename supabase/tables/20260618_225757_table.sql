create table if not exists public.students (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    email text not null unique,
    phone text,
    created_at timestamp with time zone default now()
);


