-- Create enum for pet types
CREATE TYPE public.pet_type AS ENUM ('dog', 'cat', 'fish', 'bird', 'hamster', 'rabbit', 'guinea_pig', 'turtle', 'other');

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  is_child BOOLEAN DEFAULT false,
  parent_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create pets table
CREATE TABLE public.pets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  pet_type public.pet_type NOT NULL,
  breed TEXT,
  birthday DATE,
  photo_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create health records table
CREATE TABLE public.health_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID REFERENCES public.pets(id) ON DELETE CASCADE NOT NULL,
  record_type TEXT NOT NULL, -- 'vaccination', 'vet_visit', 'weight', 'medication', 'symptom'
  title TEXT NOT NULL,
  description TEXT,
  record_date DATE NOT NULL DEFAULT CURRENT_DATE,
  next_due_date DATE,
  weight_kg DECIMAL(5,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create chores/tasks table
CREATE TABLE public.pet_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID REFERENCES public.pets(id) ON DELETE CASCADE NOT NULL,
  assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  frequency TEXT DEFAULT 'daily', -- 'daily', 'weekly', 'monthly', 'once'
  due_date DATE,
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  completed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  points INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create rewards/badges table for gamification
CREATE TABLE public.badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  badge_type TEXT NOT NULL,
  badge_name TEXT NOT NULL,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pet_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view family members profiles" ON public.profiles
  FOR SELECT USING (
    parent_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
    OR id IN (SELECT parent_id FROM public.profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Pets policies (owner and family can access)
CREATE POLICY "Users can view own pets" ON public.pets
  FOR SELECT USING (
    owner_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can insert own pets" ON public.pets
  FOR INSERT WITH CHECK (
    owner_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can update own pets" ON public.pets
  FOR UPDATE USING (
    owner_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can delete own pets" ON public.pets
  FOR DELETE USING (
    owner_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
  );

-- Health records policies
CREATE POLICY "Users can view pet health records" ON public.health_records
  FOR SELECT USING (
    pet_id IN (
      SELECT id FROM public.pets WHERE owner_id IN (
        SELECT id FROM public.profiles WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can insert pet health records" ON public.health_records
  FOR INSERT WITH CHECK (
    pet_id IN (
      SELECT id FROM public.pets WHERE owner_id IN (
        SELECT id FROM public.profiles WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can update pet health records" ON public.health_records
  FOR UPDATE USING (
    pet_id IN (
      SELECT id FROM public.pets WHERE owner_id IN (
        SELECT id FROM public.profiles WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can delete pet health records" ON public.health_records
  FOR DELETE USING (
    pet_id IN (
      SELECT id FROM public.pets WHERE owner_id IN (
        SELECT id FROM public.profiles WHERE user_id = auth.uid()
      )
    )
  );

-- Pet tasks policies
CREATE POLICY "Users can view pet tasks" ON public.pet_tasks
  FOR SELECT USING (
    pet_id IN (
      SELECT id FROM public.pets WHERE owner_id IN (
        SELECT id FROM public.profiles WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can insert pet tasks" ON public.pet_tasks
  FOR INSERT WITH CHECK (
    pet_id IN (
      SELECT id FROM public.pets WHERE owner_id IN (
        SELECT id FROM public.profiles WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can update pet tasks" ON public.pet_tasks
  FOR UPDATE USING (
    pet_id IN (
      SELECT id FROM public.pets WHERE owner_id IN (
        SELECT id FROM public.profiles WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can delete pet tasks" ON public.pet_tasks
  FOR DELETE USING (
    pet_id IN (
      SELECT id FROM public.pets WHERE owner_id IN (
        SELECT id FROM public.profiles WHERE user_id = auth.uid()
      )
    )
  );

-- Badges policies
CREATE POLICY "Users can view own badges" ON public.badges
  FOR SELECT USING (
    profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can insert own badges" ON public.badges
  FOR INSERT WITH CHECK (
    profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
  );

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pets_updated_at
  BEFORE UPDATE ON public.pets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for auto profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create storage bucket for pet photos
INSERT INTO storage.buckets (id, name, public) VALUES ('pet-photos', 'pet-photos', true);

-- Storage policies for pet photos
CREATE POLICY "Anyone can view pet photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'pet-photos');

CREATE POLICY "Authenticated users can upload pet photos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'pet-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update own pet photos" ON storage.objects
  FOR UPDATE USING (bucket_id = 'pet-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Users can delete own pet photos" ON storage.objects
  FOR DELETE USING (bucket_id = 'pet-photos' AND auth.role() = 'authenticated');