import os
from supabase import create_client, Client
from dotenv import load_dotenv
from app.core.config import settings
load_dotenv()


def get_supabase_client() -> Client:
    # error handling just in case .env is not set
    if not settings.SUPABASE_URL or not settings.SUPABASE_KEY:
        raise ValueError("SUPABASE_URL and SUPABASE_KEY must be set in environment variables")
    
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)


# Global supabase client instance
supabase: Client = get_supabase_client()


def get_all_products():
    response = supabase.table('product_catalog').select('*').execute()
    return  response.data
