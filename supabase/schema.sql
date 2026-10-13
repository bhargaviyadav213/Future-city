-- ========================================================================
-- FUTURE CITY CONCEPT GENERATOR - SUPABASE DATABASE SCHEMA
-- ========================================================================
-- This schema provisions tables for user profiles, projects,
-- AI-generated futuristic city concepts, and audit activity logs.
-- Includes Row Level Security (RLS) policies and triggers.
-- ========================================================================

-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- 1. PROFILES TABLE
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  role text default 'Urban Planner' check (role in ('Urban Planner', 'Architect', 'Student', 'Designer', 'Municipal Lead', 'Researcher')),
  organization text,
  avatar_url text,
  preferences jsonb default '{"theme": "dark", "units": "metric", "autoSave": true}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. PROJECTS TABLE
create table if not exists public.projects (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  tags text[] default array[]::text[],
  status text default 'Active' check (status in ('Active', 'Archived', 'Draft')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. CITY CONCEPTS TABLE
create table if not exists public.city_concepts (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  tagline text,
  location text not null,
  terrain text not null,
  population bigint not null default 500000,
  land_area_sqkm numeric not null default 120,
  target_year integer not null default 2075,
  status text not null default 'Completed' check (status in ('Draft', 'Generating', 'Completed', 'Archived')),
  themes text[] not null default array['Smart City', 'Green City']::text[],
  development_goals text[] not null default array[]::text[],
  
  -- Structured Deep-Dive Modules (JSONB)
  overview jsonb not null default '{}'::jsonb,
  infrastructure jsonb not null default '{}'::jsonb,
  energy jsonb not null default '{}'::jsonb,
  transportation jsonb not null default '{}'::jsonb,
  water_waste jsonb not null default '{}'::jsonb,
  healthcare jsonb not null default '{}'::jsonb,
  education jsonb not null default '{}'::jsonb,
  safety jsonb not null default '{}'::jsonb,
  budget_approximation jsonb not null default '{}'::jsonb,
  sustainability_strategy jsonb not null default '{}'::jsonb,
  phased_roadmap jsonb not null default '[]'::jsonb,
  spatial_layout jsonb not null default '{}'::jsonb,
  
  -- Metric Ratings
  eco_score integer default 85 check (eco_score between 0 and 100),
  innovation_index integer default 90 check (innovation_index between 0 and 100),
  livability_rating integer default 88 check (livability_rating between 0 and 100),
  resilience_score integer default 92 check (resilience_score between 0 and 100),
  
  -- AI Metadata and Disclaimers
  generation_model text default 'gemini-3.8-flash',
  prompt_input jsonb default '{}'::jsonb,
  disclaimer text default 'AI estimates clearly marked as unverified approximations for conceptual planning.',
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. ACTIVITY LOGS TABLE
create table if not exists public.activity_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  concept_id uuid references public.city_concepts(id) on delete set null,
  action_type text not null check (action_type in ('create', 'update', 'delete', 'generate', 'export', 'compare', 'archive')),
  title text not null,
  details text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- INDEXES FOR PERFORMANCE
create index if not exists idx_projects_user on public.projects(user_id);
create index if not exists idx_concepts_project on public.city_concepts(project_id);
create index if not exists idx_concepts_user on public.city_concepts(user_id);
create index if not exists idx_activity_user on public.activity_logs(user_id);
create index if not exists idx_concepts_status on public.city_concepts(status);

-- AUTOMATIC UPDATED_AT TIMESTAMP FUNCTION
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger set_projects_updated_at
  before update on public.projects
  for each row execute function public.handle_updated_at();

create trigger set_concepts_updated_at
  before update on public.city_concepts
  for each row execute function public.handle_updated_at();

-- ========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================================
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.city_concepts enable row level security;
alter table public.activity_logs enable row level security;

-- Profiles: Users can view and update their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Projects: Users can manage only their own projects
create policy "Users can view own projects"
  on public.projects for select
  using (auth.uid() = user_id);

create policy "Users can insert own projects"
  on public.projects for insert
  with check (auth.uid() = user_id);

create policy "Users can update own projects"
  on public.projects for update
  using (auth.uid() = user_id);

create policy "Users can delete own projects"
  on public.projects for delete
  using (auth.uid() = user_id);

-- City Concepts: Users can manage only their own concepts
create policy "Users can view own concepts"
  on public.city_concepts for select
  using (auth.uid() = user_id);

create policy "Users can insert own concepts"
  on public.city_concepts for insert
  with check (auth.uid() = user_id);

create policy "Users can update own concepts"
  on public.city_concepts for update
  using (auth.uid() = user_id);

create policy "Users can delete own concepts"
  on public.city_concepts for delete
  using (auth.uid() = user_id);

-- Activity Logs: Users can view and insert their own logs
create policy "Users can view own activity"
  on public.activity_logs for select
  using (auth.uid() = user_id);

create policy "Users can insert own activity"
  on public.activity_logs for insert
  with check (auth.uid() = user_id);
